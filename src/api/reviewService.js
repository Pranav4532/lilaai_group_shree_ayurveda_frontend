import api from "./axios";

// ⭐ Get all reviews for a product
export const getReviewsByProduct = async (productId) => {
  const res = await api.get(`/reviews/product/${productId}`);
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// ⭐ Create a new review
export const addReview = async (reviewData) => {
  const res = await api.post("/reviews", reviewData);
  return res.data;
};

// ⭐ Delete a review (Admin or user)
export const deleteReview = async (id) => {
  const res = await api.delete(`/reviews/${id}`);
  return res.data;
};
