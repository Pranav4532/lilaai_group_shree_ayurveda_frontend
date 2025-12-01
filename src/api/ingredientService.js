// src/api/ingredientService.js
import api from "./axios";

// 🧄 Get all ingredients
export const getAllIngredients = async () => {
  const res = await api.get("/ingredients");

  // Ensure we always return an array
  if (Array.isArray(res.data)) return res.data;
  if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;

  console.warn("Unexpected ingredient API response:", res.data);
  return [];
};

// 🧄 Get single ingredient by ID
export const getIngredientById = async (id) => {
  const res = await api.get(`/ingredients/${id}`);
  return res.data?.data || res.data;
};

// 🧄 Create ingredient (Admin)
export const createIngredient = async (data) => {
  const res = await api.post("/ingredients", data);
  return res.data;
};

// 🧄 Update ingredient (Admin)
export const updateIngredient = async (id, data) => {
  const res = await api.put(`/ingredients/${id}`, data);
  return res.data;
};

// 🧄 Delete ingredient (Admin)
export const deleteIngredient = async (id) => {
  const res = await api.delete(`/ingredients/${id}`);
  return res.data;
};
