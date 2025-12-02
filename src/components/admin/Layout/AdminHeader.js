import React from "react";
import { User } from "lucide-react";
import { getCurrentUser } from "../../../api/userService";

export default function AdminHeader() {
  const user = getCurrentUser();

  return (
    <nav className="navbar navbar-light bg-light shadow-sm px-4 sticky-top">
      <h5 className="fw-bold mb-0">Admin Dashboard</h5>

      <div className="d-flex align-items-center">
        <User className="me-2 text-success" />
        <span className="fw-bold">
          {user?.full_name || "Admin"}
        </span>
      </div>
    </nav>
  );
}
