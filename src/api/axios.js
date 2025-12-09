import axios from "axios";

const api = axios.create({
  baseURL: "https://lilaai-group-shree-ayurveda.onrender.com/api",
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
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("currentPage");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);


export default api;
