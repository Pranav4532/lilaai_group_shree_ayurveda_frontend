import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserProfile } from "../../../api/userService";
import { Pencil } from "lucide-react";

export default function UserList({ onNavigate }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleRoleChange = async (user, newRole) => {
    await updateUserProfile(user.id, { role: newRole });
    loadUsers();
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">User Management</h3>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>

              <td>
                <select
                  className="form-select form-select-sm"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </td>

              <td>{user.is_verified ? "✔️" : "❌"}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate(`admin-user-edit-${user.id}`)}
                >
                  <Pencil size={14} />
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr><td colSpan="6" className="text-center text-muted">No users found</td></tr>
          )}
        </tbody>

      </table>
    </div>
  );
}
