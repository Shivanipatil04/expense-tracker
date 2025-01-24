import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpenses";
import UpdateExpense from "./pages/UpdateExpenses";
import DeleteExpense from "./pages/DeleteExpenses";
import viewExpenses from "./pages/viewExpenses";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/update-expense" element={<UpdateExpense />} />
        <Route path="/delete-expense" element={<DeleteExpense />} />
      </Routes>
    </Router>
  );
}

export default App;
