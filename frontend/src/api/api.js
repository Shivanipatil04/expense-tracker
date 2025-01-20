import axios from "axios";

// Base URL of the backend API
export const BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Create an axios instance for API calls
const api = axios.create({
  baseURL: BASE_URL,
});

// Intercept requests to add the Authorization token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the JWT token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper functions for API calls

// Auth APIs
export const loginUser = async (data) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// Expense APIs
export const fetchExpenses = async () => {
  const response = await api.get("/api/expenses");
  return response.data;
};

export const addExpense = async (data) => {
  const response = await api.post("/api/expenses", data);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/api/expenses/${id}`);
  return response.data;
};

export const updateExpense = async (id, data) => {
  const response = await api.put(`/api/expenses/${id}`, data);
  return response.data;
};

// Logout helper
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export default api;
