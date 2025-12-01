// src/api/addressService.js
import api from "./axios";

// 🏠 Get all addresses of logged-in user
export const getUserAddresses = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/addresses", {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Handle responses like { success: true, data: [...] }
  if (Array.isArray(res.data)) return res.data;
  if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;

  console.warn("Unexpected address API response:", res.data);
  return [];
};

// ➕ Create new address
export const createAddress = async (addressData) => {
  const token = localStorage.getItem("token");
  const res = await api.post("/addresses", addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✏️ Update address
export const updateAddress = async (id, addressData) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/addresses/${id}`, addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ❌ Delete address
export const deleteAddress = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/addresses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
