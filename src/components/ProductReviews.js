// src/components/ProductReviews.js
import React, { useState, useEffect } from "react";
import { getReviewsByProduct, addReview } from "../api/reviewService";
import { getCurrentUser } from "../api/userService";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Load reviews
  useEffect(() => {
    async function load() {
      if (!productId) return;

      try {
        setLoading(true);
        const res = await getReviewsByProduct(productId);

        let rows = [];
        if (Array.isArray(res)) rows = res;
        else if (Array.isArray(res?.data)) rows = res.data;
        else if (Array.isArray(res?.items)) rows = res.items;
        else if (Array.isArray(res?.rows)) rows = res.rows;

        console.log("Reviews Loaded:", rows); // Debug

        setReviews(rows || []);
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [productId]);

  const handleSubmit = async () => {
    const user = getCurrentUser();
    if (!user?.id) {
      alert("Please log in first.");
      return;
    }
    if (!text.trim()) {
      alert("Write something.");
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

      // Reload reviews
      const res = await getReviewsByProduct(productId);
      const rows = Array.isArray(res) ? res : res?.data || [];
      setReviews(rows);

      setText("");
      setRating(5);
      alert("Review submitted!");
    } catch (err) {
      alert("Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm my-4">

      {/* Header */}
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
            console.log("Review row:", r); // Debug each review

            // SAFELY EXTRACT FIELDS
            const name =
              r.user_name ||
              r.username ||
              r.full_name ||
              r.name ||
              "Customer";

            const dateRaw =
              r.created_at ||
              r.createdAt ||
              r.review_date ||
              r.date ||
              null;

            const formattedDate = dateRaw
              ? new Date(dateRaw).toLocaleDateString()
              : "";

            const body =
              r.body ||
              r.review_body ||
              r.comment ||
              r.text ||
              "";

            return (
              <div key={r.id} className="mb-3">

                {/* NAME + DATE + STARS */}
                <div className="d-flex justify-content-between">
                  <div>
                    <b>{name}</b>
                    {formattedDate && ` • ${formattedDate}`}
                  </div>

                  <div style={{ color: "#f6b01e" }}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>
                </div>

                {/* BODY */}
                <div className="mt-1">{body}</div>

                <hr />
              </div>
            );
          })
        )}

        {/* Write New Review */}
        <h6 className="mt-3">Write a review</h6>

        {/* Rating */}
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

        {/* Textbox */}
        <textarea
          className="form-control mb-2"
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
        />

        {/* Submit Button */}
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
