import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BASE_URL}/api/expenses`, expense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Expense added successfully!");
      setExpense({ description: "", amount: "", category: "", date: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add expense.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add Expense</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="description"
          value={expense.description}
          onChange={handleChange}
          placeholder="Description"
          style={styles.input}
        />
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="Amount"
          style={styles.input}
        />
        <input
          type="text"
          name="category"
          value={expense.category}
          onChange={handleChange}
          placeholder="Category"
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Expense
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
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
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "400px",
    margin: "0 auto",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
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

export default AddExpense;
