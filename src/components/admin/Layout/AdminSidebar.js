import React from "react";
import {
  LayoutDashboard,
  Package,
  ListTree,
  ShoppingBag,
  Users,
  Gift,
  Layers,
  ClipboardList,
  Star,
  FileText,
  LogOut,
} from "lucide-react";

export default function AdminSidebar({ onNavigate }) {
  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3"
      style={{ width: "230px", minHeight: "100vh" }}
    >
      <h4 className="fw-bold text-center mb-4">Admin Panel</h4>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-dashboard")}
      >
        <LayoutDashboard size={18} className="me-2" />
        Dashboard
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-products")}
      >
        <Package size={18} className="me-2" />
        Products
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-categories")}
      >
        <ListTree size={18} className="me-2" />
        Categories
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-orders")}
      >
        <ShoppingBag size={18} className="me-2" />
        Orders
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-users")}
      >
        <Users size={18} className="me-2" />
        Users
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-coupons")}
      >
        <Gift size={18} className="me-2" />
        Coupons
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-ingredients")}
      >
        <Layers size={18} className="me-2" />
        Ingredients
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-inventory")}
      >
        <ClipboardList size={18} className="me-2" />
        Inventory
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-reviews")}
      >
        <Star size={18} className="me-2" />
        Reviews
      </button>

      <button
        className="btn btn-dark text-start mb-2"
        onClick={() => onNavigate("admin-audits")}
      >
        <FileText size={18} className="me-2" />
        Audit Logs
      </button>

      <div className="mt-auto">
        <button
          className="btn btn-danger w-100"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <LogOut size={18} className="me-2" /> Logout
        </button>
      </div>
    </div>
  );
}
