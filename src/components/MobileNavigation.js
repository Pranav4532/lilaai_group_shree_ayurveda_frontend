import React from "react";
import {
  Search,
  ShoppingCart,
  X,
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
  return (
    <>
      {/* Button visible only on small screens */}
      <button
        className="btn btn-outline-success d-lg-none"
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
          <h5
            className="offcanvas-title fw-bold text-success"
            id="mobileMenuLabel"
          >
            Kaveri Herbals
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
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

          {/* Navigation Links */}
          <ul className="list-group mb-4">
            {[
              { key: "home", label: "Home", icon: Home },
              { key: "products", label: "Products", icon: Package },
              { key: "about", label: "About", icon: Info },
              { key: "contact", label: "Contact", icon: Phone },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.key}
                  className={`list-group-item list-group-item-action border-0 py-3 ${
                    currentPage === item.key
                      ? "active bg-success text-white"
                      : ""
                  }`}
                  onClick={() => {
                    onNavigate(item.key);
                    document
                      .querySelector("#mobileMenu button.btn-close")
                      .click();
                  }}
                  role="button"
                >
                  <Icon size={18} className="me-2" />
                  {item.label}
                </li>
              );
            })}
          </ul>

          {/* Cart Button */}
          <div className="mt-auto pt-3 border-top">
            <button
              onClick={() => {
                onCartOpen();
                document.querySelector("#mobileMenu button.btn-close").click();
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
