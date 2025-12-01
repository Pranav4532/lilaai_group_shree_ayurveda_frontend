import api from "./axios";

// 🖼️ Upload image
export const uploadProductImage = async (formData) => {
  const res = await api.post("/product-images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 🖼️ Get images of a product
export const getProductImages = async (productId) => {
  const res = await api.get(`/product-images/${productId}`);
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// 🖼️ Delete image
export const deleteProductImage = async (id) => {
  const res = await api.delete(`/product-images/${id}`);
  return res.data;
};
