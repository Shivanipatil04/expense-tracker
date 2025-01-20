const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Email validation
  },
  password: { 
    type: String, 
    required: [true, "Password is required"], 
    minlength: [6, "Password must be at least 6 characters long"], // Minimum length validation
  },
}, { 
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
