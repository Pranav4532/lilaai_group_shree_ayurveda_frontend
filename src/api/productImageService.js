import api from "./axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")?.replace(/"/g, "");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// 📌 Upload Single Product Image
export const uploadProductImage = async (formData) => {
  const res = await api.post("/product-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders(),
    },
  });
  return res.data;
};

// 📌 Upload Multiple Product Images
export const uploadMultipleProductImages = async (formData) => {
  const res = await api.post("/product-images/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeaders(),
    },
  });
  return res.data;
};

// 📌 Get Images By Product ID
export const getProductImages = async (productId) => {
  const res = await api.get(`/product-images/${productId}`, {
    headers: getAuthHeaders(),
  });
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// 📌 Update Product Image (alt text, sort order)
export const updateProductImage = async (id, updateData) => {
  const res = await api.put(`/product-images/${id}`, updateData, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return res.data;
};

// 📌 Delete Product Image
export const deleteProductImage = async (id) => {
  const res = await api.delete(`/product-images/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// 📌 Set image as primary
export const setPrimaryImage = async (productId, imageId) => {
  const res = await api.put(
    `/product-images/${productId}/${imageId}/primary`,
    {},
    { headers: getAuthHeaders() }
  );
  return res.data;
};

