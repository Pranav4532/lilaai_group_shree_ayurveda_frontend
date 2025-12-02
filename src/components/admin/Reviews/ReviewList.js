import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/productService";
import { getReviewsByProduct, deleteReview } from "../../../api/reviewService";
import { Trash } from "lucide-react";

export default function ReviewList({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const loadReviews = async () => {
    if (!selectedProduct) {
      setReviews([]);
      return;
    }
    const data = await getReviewsByProduct(selectedProduct);
    setReviews(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    await deleteReview(id);
    loadReviews();
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Product Reviews</h3>

      {/* Product Selection */}
      <div className="mb-3">
        <label className="form-label fw-bold">Select Product</label>
        <select
          className="form-control"
          value={selectedProduct}
          onChange={(e) => {
            setSelectedProduct(e.target.value);
            setTimeout(loadReviews, 100);
          }}
        >
          <option value="">-- Select a Product --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {reviews.length === 0 ? (
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
                <td>{review.user_name || "User"}</td>
                <td className="fw-bold text-warning">{review.rating} ★</td>
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
