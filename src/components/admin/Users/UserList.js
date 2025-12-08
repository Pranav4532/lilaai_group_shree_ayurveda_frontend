import React, { useEffect, useState } from "react";
import { getAllUsers, getCurrentUser } from "../../../api/userService";
import { Pencil } from "lucide-react";

export default function UserList({ onNavigate }) {
  const [users, setUsers] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>

              {/* Show Role Only */}
              <td className="fw-semibold text-primary">{user.role}</td>

              {/* Verified Badge */}
              <td style={{ fontSize: "18px" }}>
                {user.is_verified === 1 || user.is_verified === true
                  ? "✔️"
                  : "❌"}
              </td>

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
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
