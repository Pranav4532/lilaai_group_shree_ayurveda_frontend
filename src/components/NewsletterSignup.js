import React, { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-light rounded-4 p-5 shadow-sm text-center">
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mb-3"
          style={{ width: "60px", height: "60px" }}
        >
          <Mail size={28} />
        </div>
        <h3 className="fw-bold mb-2">Stay Updated with Kaveri Herbals</h3>
        <p className="text-muted mb-0">
          Join our newsletter for Ayurvedic wellness tips, product launches, and exclusive discounts.
        </p>
      </div>

      {!submitted ? (
        <form className="row justify-content-center mt-4" onSubmit={handleSubmit}>
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group input-group-lg">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn btn-success d-flex align-items-center" type="submit">
                <Send size={18} className="me-2" /> Subscribe
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="alert alert-success d-inline-flex align-items-center justify-content-center mt-4 mb-0" role="alert">
          <Send size={18} className="me-2" />
          Thanks for subscribing! You’re on our wellness list 🌿
        </div>
      )}
    </div>
  );
}
