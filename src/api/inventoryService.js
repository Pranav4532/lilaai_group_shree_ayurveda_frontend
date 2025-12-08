// 📁 src/api/inventoryService.js
import api from "./axios";

// 🔄 Map backend fields → frontend fields
const mapInventory = (data) => {
  if (!data) return null;
  return {
    product_id: data.product_id,
    stock: data.quantity ?? 0,
    low_stock_threshold: data.safety_stock ?? 0,
    reserved: data.reserved ?? 0,
  };
};

// 🔍 Get inventory by product
export const getInventoryByProduct = async (productId) => {
  try {
    const res = await api.get(`/inventory/${productId}`);
    const data = res.data?.data || res.data;
    return mapInventory(data);
  } catch (error) {
    console.error(`Error fetching inventory for product ${productId}:`, error);
    return null;
  }
};

// ➕ Create inventory (POST /inventory)
export const createInventory = async (inventoryData) => {
  const payload = {
    product_id: inventoryData.product_id,
    quantity: inventoryData.stock,
    safety_stock: inventoryData.low_stock_threshold,
    reserved: inventoryData.reserved ?? 0,
  };

  const res = await api.post("/inventory", payload);
  return res.data;
};

// ✏️ Update inventory (PUT /inventory/:product_id)
export const updateInventory = async (productId, inventoryData) => {
  const payload = {
    quantity: inventoryData.stock,
    safety_stock: inventoryData.low_stock_threshold,
    reserved: inventoryData.reserved ?? 0,
  };

  const res = await api.put(`/inventory/${productId}`, payload);
  return res.data;
};

// ❌ Delete inventory
export const deleteInventory = async (productId) => {
  const res = await api.delete(`/inventory/${productId}`);
  return res.data;
};
