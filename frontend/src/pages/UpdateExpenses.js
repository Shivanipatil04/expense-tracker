import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api";

const UpdateExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setExpenses(response.data.expenses || []);
      } catch (error) {
        console.error("Error fetching expenses:", error.response?.data?.message || error.message);
        setError(error.response?.data?.message || "An error occurred while fetching expenses");
      }
    };

    fetchExpenses();
  }, []);

  const handleUpdate = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const updatedExpense = { ...selectedExpense }; // Assuming user edits the expense details
      await axios.put(`${BASE_URL}/api/expenses/${expenseId}`, updatedExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Expense updated successfully.");
    } catch (error) {
      console.error("Error updating expense:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "An error occurred while updating the expense");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Update Expense</h1>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.list}>
        {expenses.map((expense) => (
          <li key={expense._id} style={styles.item}>
            <strong>{expense.description}</strong> - ${expense.amount} ({expense.category}) on {new Date(expense.date).toLocaleDateString()}
            <button onClick={() => setSelectedExpense(expense)} style={styles.button}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedExpense && (
        <div style={styles.formContainer}>
          <h2>Edit Expense</h2>
          <form onSubmit={() => handleUpdate(selectedExpense._id)}>
            <input
              type="text"
              value={selectedExpense.description}
              onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })}
              style={styles.input}
            />
            <input
              type="number"
              value={selectedExpense.amount}
              onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: e.target.value })}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1.5rem",
  },
  error: {
    color: "red",
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
  button: {
    marginLeft: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  formContainer: {
    marginTop: "2rem",
  },
  input: {
    margin: "0.5rem",
    padding: "0.5rem",
    width: "80%",
    maxWidth: "400px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};

export default UpdateExpense;