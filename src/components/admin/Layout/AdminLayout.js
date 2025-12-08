import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children, onNavigate }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Sidebar - fixed width */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <AdminSidebar onNavigate={onNavigate} />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Sticky Admin Header */}
        <div style={{ position: "sticky", top: 0, zIndex: 999 }}>
          <AdminHeader />
        </div>

        <main className="p-4 flex-grow-1" style={{ background: "#f7f7f7" }}>
          {children}
        </main>

        {/* Toasts */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          pauseOnHover
          closeOnClick
        />
      </div>
    </div>
  );
}
