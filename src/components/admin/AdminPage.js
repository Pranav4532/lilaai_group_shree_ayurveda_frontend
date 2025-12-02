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
  const [view, setView] = useState(localStorage.getItem("admin-view") || "admin-dashboard");
  const [editId, setEditId] = useState(null);

  const onNavigate = (page) => {
    console.log("Navigate Admin →", page);
    localStorage.setItem("admin-view", page);

    // Dynamic edit routes
    if (page.includes("-edit-") || page.includes("-details-")) {
      const id = page.split("-").pop();
      setEditId(id);
    } else {
      setEditId(null);
    }

    setView(page);
  };

  const renderPage = () => {
    switch (view) {
      case "admin-dashboard":
        return <Dashboard onNavigate={onNavigate} />;

      // Products
      case "admin-products":
        return <ProductList onNavigate={onNavigate} />;
      case "admin-product-new":
        return <ProductForm onNavigate={onNavigate} />;
      case "admin-product-edit":
        return <ProductEdit productId={editId} onNavigate={onNavigate} />;
      case "admin-product-images":
        return <ProductImages onNavigate={onNavigate} />;

      // Categories
      case "admin-categories":
        return <CategoryList onNavigate={onNavigate} />;
      case "admin-category-new":
        return <CategoryForm onNavigate={onNavigate} />;
      case "admin-category-edit":
        return <CategoryForm categoryId={editId} onNavigate={onNavigate} />;

      // Users
      case "admin-users":
        return <UserList onNavigate={onNavigate} />;
      case "admin-user-edit":
        return <UserEdit userId={editId} onNavigate={onNavigate} />;

      // Orders
      case "admin-orders":
        return <OrderList onNavigate={onNavigate} />;
      case "admin-order-details":
        return <OrderDetails orderId={editId} onNavigate={onNavigate} />;

      // Coupons
      case "admin-coupons":
        return <CouponList onNavigate={onNavigate} />;
      case "admin-coupon-new":
        return <CouponForm onNavigate={onNavigate} />;

      // Ingredients
      case "admin-ingredients":
        return <IngredientList onNavigate={onNavigate} />;
      case "admin-ingredient-new":
        return <IngredientForm onNavigate={onNavigate} />;
      case "admin-ingredient-edit":
        return <IngredientForm ingredientId={editId} onNavigate={onNavigate} />;

      // Inventory
      case "admin-inventory":
        return <InventoryList onNavigate={onNavigate} />;
      case "admin-inventory-edit":
        return <InventoryForm productId={editId} onNavigate={onNavigate} />;

      // Reviews
      case "admin-reviews":
        return <ReviewList onNavigate={onNavigate} />;

      // Audit Logs
      case "admin-audits":
        return <AuditLogList onNavigate={onNavigate} />;

      default:
        return <Dashboard onNavigate={onNavigate} />;
    }
  };

  return <AdminLayout onNavigate={onNavigate}>{renderPage()}</AdminLayout>;
}
