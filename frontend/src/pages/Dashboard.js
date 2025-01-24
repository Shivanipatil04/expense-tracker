import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Expense Tracker Dashboard</h1>
      <div style={styles.optionsContainer}>
        <button style={styles.button} onClick={() => navigate("/add-expense")}>
          Add Expense
        </button>
        <button style={styles.button} onClick={() => navigate("/update-expense")}>
          Update Expense
        </button>
        <button style={styles.button} onClick={() => navigate("/delete-expense")}>
          Delete Expense
        </button>
      </div>
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
    color: "#333",
  },
  optionsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  button: {
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;
