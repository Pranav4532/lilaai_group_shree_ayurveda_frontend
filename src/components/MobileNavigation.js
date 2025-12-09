// src/components/MobileNavigation.js
import React from "react";
import {
  Search,
  ShoppingCart,
  Home,
  Info,
  Package,
  Phone,
  User,
  LogOut,
} from "lucide-react";

export default function MobileNavigation({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange,
  cartCount,
  onCartOpen,
  user,
  onLoginOpen,
  onLogout,
}) {
  const menuItems = [
    { key: "home", label: "Home", icon: Home },
    { key: "products", label: "Products", icon: Package },
    { key: "about", label: "About", icon: Info },
    { key: "contact", label: "Contact", icon: Phone },
  ];

  const closeMenu = () => {
    const closeBtn = document.querySelector("#mobileMenu .btn-close");
    if (closeBtn) closeBtn.click();
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className="navbar-toggler d-lg-none ms-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Offcanvas Sidebar */}
      <div className="offcanvas offcanvas-end" id="mobileMenu">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold text-success">
            Lilaai Ayurveda
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          />
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {/* Search */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Menu Navigation */}
          <ul className="list-group mb-4">
            {menuItems.map(({ key, label, icon: Icon }) => (
              <li
                key={key}
                className={`list-group-item py-3 ${
                  currentPage === key ? "active bg-success text-white" : ""
                }`}
                onClick={() => {
                  onNavigate(key);
                  closeMenu();
                }}
                role="button"
              >
                <Icon size={18} className="me-2" />
                {label}
              </li>
            ))}
          </ul>

          {/* Login/Logout */}
          <div className="mt-auto border-top pt-3">
            {user ? (
              <button
                className="btn btn-outline-danger w-100 mb-2"
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
              >
                <LogOut size={18} className="me-2" /> Logout
              </button>
            ) : (
              <button
                className="btn btn-outline-success w-100 mb-2"
                onClick={() => {
                  onLoginOpen();
                  closeMenu();
                }}
              >
                <User size={18} className="me-2" /> Login
              </button>
            )}

            {/* Cart Button */}
            <button
              className="btn btn-success w-100 position-relative"
              onClick={() => {
                onCartOpen();
                closeMenu();
              }}
            >
              <ShoppingCart size={18} className="me-2" />
              View Cart
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
