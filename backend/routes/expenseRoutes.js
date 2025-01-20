const express = require("express");
const Expense = require("../models/Expense");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied, token missing or invalid." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

// Add Expense
router.post("/", authenticate, async (req, res) => {
  const { amount, category, description, date } = req.body;

  try {
    const newExpense = new Expense({
      userId: req.user.id,
      amount,
      category,
      description,
      date,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error("Error adding expense:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get All Expenses
router.get("/", authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Update Expense
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, description, date },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found." });
    }
    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error("Error updating expense:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Delete Expense
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found." });
    }
    res.status(200).json({ message: "Expense deleted successfully!" });
  } catch (err) {
    console.error("Error deleting expense:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
