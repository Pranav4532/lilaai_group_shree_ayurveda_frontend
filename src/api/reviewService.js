import api from "./axios";

// ⭐ Get all reviews for a product
export const getReviewsByProduct = async (productId) => {
  try {
    const res = await api.get(`/reviews/product/${productId}`);
    return Array.isArray(res.data) ? res.data : res.data.data || [];
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return [];
  }
};

// ⭐ Create a new review
export const addReview = async (reviewData) => {
  try {
    const res = await api.post("/reviews", reviewData);
    return res.data;
  } catch (err) {
    console.error("Error adding review:", err);
    throw err;
  }
};

// ⭐ Delete a review (Admin or user)
export const deleteReview = async (id) => {
  try {
    const res = await api.delete(`/reviews/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting review:", err);
    throw err;
  }
};
