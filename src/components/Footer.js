import React from "react";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  MessageCircle,
} from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-success text-white pt-5">

      {/* Main Footer Section */}
      <div className="container py-5">
        <div className="row gy-5">

          {/* Company Info */}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-3">
              <div
                className="bg-light text-success fw-bold rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: "48px", height: "48px" }}
              >
                L
              </div>
              <div>
                <h4 className="fw-bold mb-0">Lilaai Group – Shree Ayurveda</h4>
                <small>Since 2019 • Pure Ayurveda</small>
              </div>
            </div>

            <p className="small text-light">
              Bringing nature’s healing power to every home with pure and
              effective Ayurvedic wellness solutions.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3">
              <a
                href="https://www.facebook.com/share/1BNHvYeX4o/"
                target="_blank"
                className="btn btn-link text-white fs-5 p-0"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/ayurv.eda?igsh=ZmR5MzkyN3FqM3Bw"
                target="_blank"
                className="btn btn-link text-white fs-5 p-0"
              >
                <Instagram />
              </a>
              <a
                href="https://wa.me/917666642167"
                target="_blank"
                className="btn btn-link text-white fs-5 p-0"
              >
                <MessageCircle />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="btn btn-link text-white text-decoration-none d-block p-0 mb-1"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("products")}
                  className="btn btn-link text-white text-decoration-none d-block p-0 mb-1"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("product-detail")}
                  className="btn btn-link text-white text-decoration-none d-block p-0 mb-1"
                >
                  Product Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* ⭐ New Column - Our Promise */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Our Promise</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                🌿 100% Natural Ayurvedic Ingredients
              </li>
              <li className="mb-2">
                🧪 Root-Cause Based Formulations
              </li>
              <li className="mb-2">
                💚 Safe & Effective for Daily Use
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Get in Touch</h6>
            <ul className="list-unstyled small">
              <li className="d-flex align-items-center mb-2">
                <Phone size={16} className="me-2" />
                <a
                  href="tel:+917666642167"
                  className="text-white text-decoration-none"
                >
                  +91 76666 42167
                </a>
              </li>
              <li className="d-flex align-items-center mb-2">
                <Mail size={16} className="me-2" />
                <a
                  href="mailto:lilaaigroupshreeayurveda@gmail.com"
                  className="text-white text-decoration-none"
                >
                  lilaaigroupshreeayurveda@gmail.com
                </a>
              </li>
              <li className="d-flex align-items-start">
                <MapPin size={16} className="me-2 mt-1" />
                Shree Samarth Krupa Clinic, Shop No. 2,<br />
                Bhal Bus Stop, Shree Malangad Road,<br />
                Kalyan East, Maharashtra, India
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-light my-4" />

        {/* Bottom Bar */}
        <div className="text-center small">
          © 2025 Lilaai Group – Shree Ayurveda. All rights reserved. 🌿
        </div>
      </div>
    </footer>
  );
}
