// src/components/ProductReviews.js
import React, { useState, useEffect } from "react";
import { getReviewsByProduct, addReview } from "../api/reviewService";
import { getCurrentUser } from "../api/userService";
import { toast } from "sonner";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const user = getCurrentUser(); // <-- FIXED

  // 🔄 Load Reviews Function
  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await getReviewsByProduct(productId);

      let rows = [];
      if (Array.isArray(res)) rows = res;
      else if (Array.isArray(res?.data)) rows = res.data;
      else if (Array.isArray(res?.items)) rows = res.items;
      else if (Array.isArray(res?.rows)) rows = res.rows;

      setReviews(rows || []);
    } catch (err) {
      console.error("Failed loading reviews:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Load when product changes
  useEffect(() => {
    if (productId) loadReviews();
  }, [productId]);

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("Please log in first.");
      return;
    }

    if (!text.trim()) {
      toast.warning("Please write a review.");
      return;
    }

    setSubmitting(true);

    try {
      await addReview({
        product_id: productId,
        user_id: user.id,
        rating,
        body: text,
        title: "Review",
      });

      toast.success("Review submitted! ⭐");

      setText("");
      setRating(5);
      loadReviews(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm my-4">
      <div className="card-header fw-bold d-flex justify-content-between">
        <span>Customer Reviews</span>
        <span className="text-muted small">{reviews.length} Reviews</span>
      </div>

      <div className="card-body">
        {/* Loading */}
        {loading ? (
          <div className="text-center py-3">
            <div className="spinner-border text-success" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-muted py-3">
            No reviews yet — be the first!
          </div>
        ) : (
          reviews.map((r) => {
            const name =
              r.user_name || r.username || r.full_name || r.name || "Customer";
            const date = r.created_at
              ? new Date(r.created_at).toLocaleDateString()
              : "";
            const textContent =
              r.body || r.review_body || r.text || r.comment || "";

            return (
              <div key={r.id} className="mb-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <b>{name}</b> {date && `• ${date}`}
                  </div>
                  <div style={{ color: "#f6b01e" }}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>
                </div>
                <div className="mt-1">{textContent}</div>
                <hr />
              </div>
            );
          })
        )}

        {/* ✍ Review Form */}
        <h6 className="mt-3">Write a review</h6>
        <div className="d-flex align-items-center gap-2 mb-2">
          <span>Your rating:</span>
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            return (
              <span
                key={value}
                style={{
                  cursor: "pointer",
                  color: value <= rating ? "#f6b01e" : "#ccc",
                  fontSize: 20,
                }}
                onClick={() => setRating(value)}
              >
                ★
              </span>
            );
          })}
        </div>

        <textarea
          className="form-control mb-2"
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
        />

        <div className="text-end">
          <button
            className="btn btn-success"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
