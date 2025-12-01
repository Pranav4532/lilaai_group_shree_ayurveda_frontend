// 📁 src/api/inventoryService.js
import api from "./axios";

// ✅ Get inventory by product_id
export const getInventoryByProduct = async (productId) => {
  try {
    const res = await api.get(`/inventory/${productId}`);
    if (res.data?.success) return res.data.data;
    return null;
  } catch (error) {
    console.error(`Error fetching inventory for product ${productId}:`, error);
    return null;
  }
};

// ✅ Create new inventory entry
export const createInventory = async (inventoryData) => {
  const res = await api.post("/inventory", inventoryData);
  return res.data;
};

// ✅ Update inventory stock
export const updateInventory = async (productId, updateData) => {
  const res = await api.put(`/inventory/${productId}`, updateData);
  return res.data;
};

// ✅ Delete inventory entry
export const deleteInventory = async (productId) => {
  const res = await api.delete(`/inventory/${productId}`);
  return res.data;
};
