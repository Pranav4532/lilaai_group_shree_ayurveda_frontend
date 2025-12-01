import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Catch API errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("❌ API ERROR:", err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);

export default api;
