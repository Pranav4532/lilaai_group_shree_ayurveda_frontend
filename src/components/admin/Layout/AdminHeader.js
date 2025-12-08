import React from "react";
import { User } from "lucide-react";
import { getCurrentUser } from "../../../api/userService";

export default function AdminHeader() {
  const user = getCurrentUser();

  return (
    <nav
      className="navbar bg-white shadow-sm px-4 d-flex justify-content-between"
      style={{ height: "65px", borderBottom: "1px solid #e5e5e5" }}
    >
      <h5 className="fw-bold mb-0">Admin Dashboard</h5>

      <div className="d-flex align-items-center gap-2">
        <User className="text-success" size={20} />
        <span className="fw-bold">{user?.full_name || "Admin"}</span>
      </div>
    </nav>
  );
}
