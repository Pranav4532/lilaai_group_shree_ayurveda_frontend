// src/api/categoryService.js
import api from "./axios";

// 🟢 Get all categories
export const getAllCategories = async () => {
  const res = await api.get("/categories");

  // Handle backend returning { success: true, data: [...] } or just [...]
  if (Array.isArray(res.data)) return res.data;
  if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;

  console.warn("Unexpected category API response:", res.data);
  return [];
};

// 🟢 Get single category by ID
export const getCategoryById = async (id) => {
  const res = await api.get(`/categories/${id}`);
  return res.data?.data || res.data;
};

// 🟢 Create category (Admin)
export const createCategory = async (data) => {
  const res = await api.post("/categories", data);
  return res.data;
};

// 🟢 Update category (Admin)
export const updateCategory = async (id, data) => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

// 🟢 Delete category (Admin)
export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};
