// src/api/cartService.js
import api from "./axios"; // your axios instance with baseURL and auth header if set

// Get cart for userId
export const getCart = async (userId) => {
  const res = await api.get(`/cart/${userId}`);
  // backend returns { userId, items } in your controller
  return res.data.items ?? res.data;
};

export const addToCart = async (payload) => {
  // payload: { userId, productId, quantity, price }
  const res = await api.post("/cart-items", payload);
  return res.data;
};

export const updateCartItem = async (id, data) => {
  const res = await api.put(`/cart-items/${id}`, data);
  return res.data;
};

export const removeCartItem = async (id) => {
  const res = await api.delete(`/cart-items/${id}`);
  return res.data;
};

export const clearCart = async (userId) => {
  const res = await api.delete(`/cart/clear/${userId}`);
  return res.data;
};
