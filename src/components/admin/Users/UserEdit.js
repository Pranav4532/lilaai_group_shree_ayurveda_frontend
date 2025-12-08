import React, { useEffect, useState } from "react";
import {
  getUserById,
  updateUserProfile,
  getCurrentUser,
} from "../../../api/userService";

export default function UserEdit({ userId, onNavigate }) {
  const [form, setForm] = useState(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getUserById(userId);
    setForm(data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await updateUserProfile(userId, form);
    onNavigate("admin-users");
  };

  if (!form) return <p className="text-center my-5">Loading...</p>;

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Edit User</h3>

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          className="form-control"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          className="form-control"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
        />
      </div>

      {/* Role selection visible only to superadmin */}
      {currentUser.role === "superadmin" && (
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>
      )}

      <button className="btn btn-success" onClick={handleSave}>
        Save
      </button>
      <button
        className="btn btn-secondary ms-2"
        onClick={() => onNavigate("admin-users")}
      >
        Cancel
      </button>
    </div>
  );
}
