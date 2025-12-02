import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children, onNavigate }) {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-grow-1">
        <AdminHeader />

        <main className="p-3">
          {children}
        </main>
      </div>
    </div>
  );
}
