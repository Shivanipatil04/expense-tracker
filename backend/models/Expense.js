const mongoose = require("mongoose");

// Define the expense schema
const expenseSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "User ID is required"], // Ensures the expense is tied to a user
  },
  amount: { 
    type: Number, 
    required: [true, "Amount is required"], 
    min: [0, "Amount must be a positive number"], // Ensures non-negative values
  },
  category: { 
    type: String, 
    required: [true, "Category is required"], 
    // enum: ["Food", "Transport", "Shopping", "Bills", "Other"],
  },
  description: { 
    type: String, 
    trim: true, // Removes extra spaces from the description
    maxlength: [500, "Description cannot exceed 500 characters"], // Limits length for better readability
  },
  date: { 
    type: Date, 
    default: Date.now, // Default to the current date
  },
}, { 
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create and export the Expense model
module.exports = mongoose.model("Expense", expenseSchema);
