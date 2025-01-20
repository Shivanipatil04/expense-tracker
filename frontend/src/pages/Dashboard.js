import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setExpenses(response.data.expenses || []);
        setFilteredExpenses(response.data.expenses || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expenses:", error.response?.data?.message || error.message);
        setError(error.response?.data?.message || "An error occurred while fetching expenses");
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const response = await axios.post(`${BASE_URL}/api/expenses`, newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses((prev) => [...prev, response.data]);
      setFilteredExpenses((prev) => [...prev, response.data]);
      setNewExpense({ description: "", amount: "", category: "", date: "" }); // Clear the form
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "An error occurred while adding the expense");
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    if (value === "") {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter((expense) =>
        expense.description.toLowerCase().includes(value) || expense.category.toLowerCase().includes(value)
      );
      setFilteredExpenses(filtered);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Expense Tracker Dashboard</h1>
      {loading && <p>Loading your expenses...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by description or category"
          value={filter}
          onChange={handleFilterChange}
          style={styles.searchInput}
        />
      </div>

      {/* Expenses List */}
      <div style={styles.expensesContainer}>
        <h2 style={styles.subHeading}>Your Expenses</h2>
        <ul style={styles.list}>
          {filteredExpenses.map((expense) => (
            <li key={expense._id || expense.id} style={styles.item}>
              <strong>{expense.description}</strong> - ${expense.amount} (
              {expense.category}) on {new Date(expense.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
        {filteredExpenses.length === 0 && !loading && <p>No expenses found.</p>}
      </div>

      {/* Add Expense Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.subHeading}>Add New Expense</h2>
        <form onSubmit={handleAddExpense} style={styles.form}>
          <input
            type="text"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            style={styles.input}
          />
          <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            required
            style={styles.input}
          />
          <input
            type="text"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
            style={styles.input}
          />
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  subHeading: {
    fontSize: "1.8rem",
    margin: "1rem 0",
    color: "#555",
  },
  searchContainer: {
    marginBottom: "1.5rem",
  },
  searchInput: {
    padding: "0.5rem",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  expensesContainer: {
    marginBottom: "2rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    padding: "0.8rem",
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#f9f9f9",
  },
  formContainer: {
    marginTop: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: "0.5rem",
    padding: "0.5rem",
    width: "80%",
    maxWidth: "400px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    marginTop: "1rem",
    padding: "0.7rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};

export default Dashboard;
