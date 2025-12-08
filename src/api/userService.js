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

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
};

// 🚪 Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// 👤 Get logged-in user (from localStorage)
export const getCurrentUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

// 🧠 Admin — Get all users
export const getAllUsers = async () => {
  const res = await api.get("/users");
  return Array.isArray(res.data) ? res.data : [];
};

// 🧠 Admin — Get user by ID
export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data; // backend returns a single object
};

// ✏️ Admin / Superadmin — Update user
export const updateUserProfile = async (id, updatedData) => {
  const res = await api.put(`/users/${id}`, updatedData);
  return res.data;
};
