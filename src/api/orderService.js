import api from "./axios";

// 🧾 Get all orders (Admin)
export const getAllOrders = async () => {
  const res = await api.get("/orders");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// 📦 Get user orders
export const getOrdersByUser = async (userId) => {
  const res = await api.get(`/orders/user/${userId}`);
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// 🧾 Create order
export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

// ✏️ Update order (Admin)
export const updateOrder = async (id, orderData) => {
  const res = await api.put(`/orders/${id}`, orderData);
  return res.data;
};

// ❌ Cancel or Delete order
export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

// 📦 Get order details by ID
export const getOrderDetails = async (id) => {
  const res = await api.get(`/orders/details/${id}`);
  return Array.isArray(res.data) ? res.data : res.data.data || res.data;
};

