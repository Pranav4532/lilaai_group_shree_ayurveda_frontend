// src/components/admin/AdminPage.js
import React, { useState } from "react";

// Layout
import AdminLayout from "./Layout/AdminLayout";

// Dashboard
import Dashboard from "./Dashboard/Dashboard";

// Products
import ProductList from "./Products/ProductList";
import ProductForm from "./Products/ProductForm";
import ProductEdit from "./Products/ProductEdit";
import ProductImages from "./Products/ProductImages";

// Categories
import CategoryList from "./Categories/CategoryList";
import CategoryForm from "./Categories/CategoryForm";

// Users
import UserList from "./Users/UserList";
import UserEdit from "./Users/UserEdit";

// Orders
import OrderList from "./Orders/OrderList";
import OrderDetails from "./Orders/OrdersDetails";

// Coupons
import CouponList from "./Coupons/CouponList";
import CouponForm from "./Coupons/CouponForm";

// Ingredients
import IngredientList from "./Ingredients/IngredientList";
import IngredientForm from "./Ingredients/IngredientForm";

// Inventory
import InventoryList from "./Inventory/InventoryList";
import InventoryForm from "./Inventory/InventoryForm";

// Reviews
import ReviewList from "./Reviews/ReviewList";

// Audit Logs
import AuditLogList from "./AuditLogs/AuditLogList";

export default function AdminPage() {
  const [view, setView] = useState(
    localStorage.getItem("admin-view") || "admin-dashboard"
  );
  const [editId, setEditId] = useState(null);

  const onNavigate = (page) => {
    console.log("Navigate Admin →", page);
    localStorage.setItem("admin-view", page);

    // Extract ID for dynamic navigation
    if (
      page.includes("-edit-") ||
      page.includes("-images-") ||
      page.includes("-details-")
    ) {
      const id = page.split("-").pop();
      setEditId(id);
    } else {
      setEditId(null);
    }

    setView(page);
  };

  const renderPage = () => {
    // -------------------- Dashboard --------------------
    if (view === "admin-dashboard")
      return <Dashboard onNavigate={onNavigate} />;

    // -------------------- Products ----------------------
    if (view === "admin-products")
      return <ProductList onNavigate={onNavigate} />;

    if (view === "admin-product-new")
      return <ProductForm onNavigate={onNavigate} />;

    if (view.includes("admin-product-edit"))
      return <ProductEdit productId={editId} onNavigate={onNavigate} />;

    if (view.includes("admin-product-images"))
      return <ProductImages productId={editId} onNavigate={onNavigate} />;

    // ------------------- Categories ---------------------
    if (view === "admin-categories")
      return <CategoryList onNavigate={onNavigate} />;

    if (view === "admin-category-new")
      return <CategoryForm onNavigate={onNavigate} />;

    if (view.includes("admin-category-edit"))
      return <CategoryForm categoryId={editId} onNavigate={onNavigate} />;

    // -------------------- Users -------------------------
    if (view === "admin-users") return <UserList onNavigate={onNavigate} />;

    if (view.includes("admin-user-edit"))
      return <UserEdit userId={editId} onNavigate={onNavigate} />;

    // -------------------- Orders ------------------------
    if (view === "admin-orders") return <OrderList onNavigate={onNavigate} />;

    if (view.includes("admin-order-details"))
      return <OrderDetails orderId={editId} onNavigate={onNavigate} />;

    // -------------------- Coupons -----------------------
    if (view === "admin-coupons") return <CouponList onNavigate={onNavigate} />;

    if (view === "admin-coupon-new")
      return <CouponForm onNavigate={onNavigate} />;

    // -------------------- Ingredients -------------------
    if (view === "admin-ingredients")
      return <IngredientList onNavigate={onNavigate} />;

    if (view === "admin-ingredient-new")
      return <IngredientForm onNavigate={onNavigate} />;

    if (view.includes("admin-ingredient-edit"))
      return <IngredientForm ingredientId={editId} onNavigate={onNavigate} />;

    // -------------------- Inventory ---------------------
    if (view === "admin-inventory")
      return <InventoryList onNavigate={onNavigate} />;

    if (view.includes("admin-inventory-edit"))
      return <InventoryForm productId={editId} onNavigate={onNavigate} />;

    // -------------------- Reviews -----------------------
    if (view === "admin-reviews") return <ReviewList onNavigate={onNavigate} />;

    // -------------------- Audit Logs --------------------
    if (view === "admin-audits")
      return <AuditLogList onNavigate={onNavigate} />;

    // Default
    return <Dashboard onNavigate={onNavigate} />;
  };

  return <AdminLayout onNavigate={onNavigate}>{renderPage()}</AdminLayout>;
}
