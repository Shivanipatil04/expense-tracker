import React from "react";
import { useNavigate } from "react-router-dom";  // Import useHistory for navigation

const Home = () => {
  const navigate = useNavigate();  // Initialize useHistory hook

  const handleGetStarted = () => {
    navigate("/login");  // Navigate to login page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Expense Tracker</h1>
      <p style={styles.description}>
        Manage your expenses efficiently and stay on top of your finances.
      </p>
      
      <button style={styles.button} onClick={handleGetStarted}>Get Started</button>
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
    color: "#007BFF",
  },
  description: {
    fontSize: "1.2rem",
    margin: "1rem 0",
  },
  
  button: {
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1.5rem",
  },
};

export default Home;
