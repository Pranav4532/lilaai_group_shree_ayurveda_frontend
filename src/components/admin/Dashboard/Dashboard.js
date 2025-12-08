import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";

// Corrected import paths
import { getAllUsers } from "../../../api/userService";
import { getProducts } from "../../../api/productService";
import { getAllIngredients } from "../../../api/ingredientService";
import { getAllOrders } from "../../../api/orderService";
import { getAllAudits } from "../../../api/auditService";

// Stats Card Component
import DashboardStats from "./Dashboardstats";

export default function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    ingredients: 0,
  });

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [users, products, ingredients, orders, audits] = await Promise.all([
        getAllUsers(),
        getProducts(),
        getAllIngredients(),
        getAllOrders(),
        getAllAudits(),
      ]);

      setStats({
        users: users?.length || 0,
        products: products?.length || 0,
        orders: orders?.length || 0,
        ingredients: ingredients?.length || 0,
      });

      setLogs(Array.isArray(audits) ? audits : audits?.data || []);
    } catch (err) {
      console.error("Dashboard load failed:", err);
    }
  };

  const formatMeta = (meta) => {
    if (!meta) return "—";
    try {
      const obj =
        typeof meta === "string" && meta.startsWith("{")
          ? JSON.parse(meta)
          : meta;

      return Object.entries(obj)
        .map(([key, val]) => `${key}: ${val}`)
        .join(" | ");
    } catch (e) {
      return meta;
    }
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Actions */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h4 className="fw-bold">Manage</h4>
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() => onNavigate("admin-product-new")}
        >
          <PlusCircle size={18} className="me-2" /> Add Product
        </button>
      </div>

      {/* Recent Activity */}
      <div className="card shadow-sm">
        <div className="card-header fw-bold bg-light">Recent Activity</div>
        <div className="card-body">
          {logs.length === 0 ? (
            <p className="text-muted text-center">No latest logs found.</p>
          ) : (
            logs.slice(0, 8).map((log) => (
              <div key={log.id} className="border-bottom mb-3 pb-2">
                <strong>{log.action}</strong>
                <br />
                <small className="text-muted">{formatMeta(log.meta)}</small>
                <br />
                <small className="text-secondary">
                  {new Date(log.created_at).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
