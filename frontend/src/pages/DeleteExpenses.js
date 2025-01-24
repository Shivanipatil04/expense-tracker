import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api";

const DeleteExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data.expenses || []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const handleDelete = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Expense deleted successfully!");
      setExpenses((prev) => prev.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete expense.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Delete Expense</h1>
      {expenses.map((expense) => (
        <div key={expense._id} style={styles.listItem}>
          <p>
            {expense.description} - ${expense.amount}
          </p>
          <button onClick={() => handleDelete(expense._id)} style={styles.button}>
            Delete
          </button>
        </div>
      ))}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
  },
  listItem: {
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "1rem",
    color: "green",
  },
};

export default DeleteExpense;
