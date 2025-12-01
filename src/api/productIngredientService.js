import api from "./axios";

// ⚗️ Link ingredient to product
export const addProductIngredient = async (data) => {
  const res = await api.post("/product-ingredients", data);
  return res.data;
};

// ⚗️ Get ingredients of a product
export const getIngredientsByProduct = async (productId) => {
  const res = await api.get(`/product-ingredients/${productId}`);
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// ⚗️ Remove a product-ingredient link
export const deleteProductIngredient = async (id) => {
  const res = await api.delete(`/product-ingredients/${id}`);
  return res.data;
};
