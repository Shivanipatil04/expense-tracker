import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api";

const ViewExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expenses:", error.response?.data?.message || error.message);
        setError(error.response?.data?.message || "An error occurred while fetching expenses");
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>View All Expenses</h1>
      {loading && <p>Loading expenses...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && expenses.length === 0 && <p>No expenses found.</p>}
      <ul style={styles.list}>
        {expenses.map((expense) => (
          <li key={expense._id} style={styles.item}>
            <strong>{expense.description}</strong> - ${expense.amount} ({expense.category}) on {new Date(expense.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
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
};

export default ViewExpense;