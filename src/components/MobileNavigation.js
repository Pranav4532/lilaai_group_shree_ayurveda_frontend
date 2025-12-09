import React from "react";
import {
  Search,
  ShoppingCart,
  Home,
  Info,
  Package,
  Phone,
} from "lucide-react";

export default function MobileNavigation({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange,
  cartCount,
  onCartOpen,
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
        className="btn btn-outline-success d-lg-none ms-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileMenu"
        aria-controls="mobileMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold text-success" id="mobileMenuLabel">
            Lilaai Group – Shree Ayurveda
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body d-flex flex-column justify-content-between">

          {/* Search Bar */}
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className="list-group mb-4">
            {menuItems.map(({ key, label, icon: Icon }) => (
              <li
                key={key}
                className={`list-group-item list-group-item-action border-0 py-3 ${
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

          {/* Cart Button */}
          <div className="mt-auto pt-3 border-top">
            <button
              onClick={() => {
                onCartOpen();
                closeMenu();
              }}
              className="btn btn-success w-100 position-relative"
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
