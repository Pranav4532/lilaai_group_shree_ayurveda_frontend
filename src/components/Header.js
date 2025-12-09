// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import MobileNavigation from "./MobileNavigation";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Phone,
  Shield,
  ChevronDown,
  Package,
  CheckCircle,
} from "lucide-react";

export default function Header({
  searchQuery,
  onSearchChange,
  currentPage,
  onNavigate,
  onCartOpen,
  onLoginOpen,
  user,
  onLogout,
  cartCount,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toast, setToast] = useState(""); // <-- logout toast
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Show logout toast
  const handleLogout = () => {
    onLogout(); // normal logout
    setToast("You have been logged out successfully");
    setTimeout(() => setToast(""), 2500); // auto hide
  };

  return (
    <header className="bg-light shadow-sm sticky-top">
      {/* 🌿 Smooth Logout Toast */}
      {toast && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 rounded-pill shadow-lg"
          style={{
            zIndex: 2000,
            backgroundColor: "#198754",
            color: "white",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            animation: "fadeDown 0.35s ease-out",
          }}
        >
          <CheckCircle size={18} />
          {toast}
        </div>
      )}

      {/* Trust Bar */}
      <div className="bg-success text-white py-1 small text-center">
        <div className="container d-flex flex-wrap justify-content-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <Shield size={14} /> <span>100% Authentic Ayurvedic Products</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Phone size={14} /> <span>24/7 Expert Consultation</span>
          </div>
        </div>
      </div>

      <div className="d-lg-none">
        <MobileNavigation
          currentPage={currentPage}
          onNavigate={onNavigate}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          cartCount={cartCount}
          onCartOpen={onCartOpen}
          user={user}
          onLoginOpen={onLoginOpen}
          onLogout={onLogout}
        />
      </div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container py-2">
          {/* Logo */}
          <button
            className="navbar-brand d-flex align-items-center btn btn-link p-0 text-decoration-none"
            onClick={() => onNavigate("home")}
          >
            <img
              src="/logo.png"
              alt="Lilaai Group Ayurveda Logo"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              className="me-2"
            />
            <div>
              <div className="fw-bold text-success fs-5">
                Lilaai Group – Shree Ayurveda
              </div>
              <small className="text-muted">
                Since 2019 • Authentic Ayurveda
              </small>
            </div>
          </button>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Menu */}
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto">
              {[
                { key: "home", label: "Home" },
                { key: "products", label: "Products" },
                { key: "about", label: "About" },
                { key: "contact", label: "Contact" },
              ].map((item) => (
                <li className="nav-item" key={item.key}>
                  <button
                    className={`btn btn-link nav-link ${
                      currentPage === item.key
                        ? "text-success fw-semibold"
                        : "text-dark"
                    }`}
                    onClick={() => onNavigate(item.key)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Search */}
            <form className="d-none d-lg-flex me-3">
              <div className="position-relative">
                <Search
                  className="position-absolute ms-2 top-50 translate-middle-y text-muted"
                  size={16}
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search herbal products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </form>

            {/* Right Section */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              {/* User Dropdown */}
              {user ? (
                <div ref={dropdownRef} className="position-relative">
                  <button
                    className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <User size={18} />
                    <ChevronDown size={14} />
                  </button>

                  {dropdownOpen && (
                    <div
                      className="position-absolute end-0 mt-2 bg-white shadow rounded p-2"
                      style={{ minWidth: 170, zIndex: 999 }}
                    >
                      <p className="small text-muted px-2 mb-1">
                        Signed in as
                        <br />
                        <strong>{user.full_name}</strong>
                      </p>
                      <hr className="my-2" />

                      <button
                        className="dropdown-item"
                        onClick={() => onNavigate("profile")}
                      >
                        <User size={14} /> My Profile
                      </button>

                      <button
                        className="dropdown-item"
                        onClick={() => onNavigate("orders")}
                      >
                        <Package size={14} /> My Orders
                      </button>

                      <hr className="my-2" />

                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={onLoginOpen}
                >
                  <User size={18} />
                </button>
              )}

              {/* Cart */}
              <button
                className="btn btn-outline-success position-relative btn-sm"
                onClick={onCartOpen}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
