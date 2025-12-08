import api from "./axios";

// 📌 Get all products
export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data; // no .data.data
};

// 📌 Get single product by ID
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data; // directly return product
};

// 📌 Create product (Admin only)
export const createProduct = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};

// 📌 Update product
export const updateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

// 📌 Delete product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
