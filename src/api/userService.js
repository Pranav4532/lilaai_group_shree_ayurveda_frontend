// src/api/userService.js
import api from "./axios";

// 👤 Register new user
export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// 🔐 Login user
export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  const { token, user } = res.data;

  // Save JWT token & user info
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
};

// 🚪 Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// 👤 Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// 🧠 Get all users (Admin only)
export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};


// 🧠 Get user by ID
export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// ✏️ Update user profile
export const updateUserProfile = async (id, updatedData) => {
  const res = await api.put(`/users/${id}`, updatedData);
  return res.data;
};