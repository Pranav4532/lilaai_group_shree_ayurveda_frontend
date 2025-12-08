import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/productService";
import { getReviewsByProduct, deleteReview } from "../../../api/reviewService";
import { Trash, Star } from "lucide-react";
import { toast } from "react-toastify";

export default function ReviewList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) loadReviews();
    else setReviews([]);
  }, [selectedProduct]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const loadReviews = async () => {
    setLoading(true);
    const data = await getReviewsByProduct(selectedProduct);
    setReviews(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      toast.success("Review deleted successfully!");
      loadReviews();
    } catch (error) {
      toast.error("Failed to delete review");
      console.error(error);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Product Reviews</h3>

      {/* Product Dropdown */}
      <div className="mb-3">
        <label className="form-label fw-bold">Select Product</label>
        <select
          className="form-control"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">-- Select a Product --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-muted">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-muted text-center">No reviews found.</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Rating</th>
              <th>Review</th>
              <th width="80px">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.user_name ?? "Unknown"}</td>

                <td className="fw-bold text-warning">
                  <Star size={16} className="me-1" />
                  {review.rating}
                </td>

                <td>{review.comment}</td>

                <td className="text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(review.id)}
                  >
                    <Trash size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
