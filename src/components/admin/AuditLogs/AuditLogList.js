import React, { useEffect, useState } from "react";
import { getAllAudits, getAuditsByUser } from "../../../api/auditService";
import { getAllUsers } from "../../../api/userService";
import { Clock } from "lucide-react";

export default function AuditLogList() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    loadUsers();
    loadLogs();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const loadLogs = async () => {
    const data = await getAllAudits();
    setLogs(data);
  };

  const filterLogsByUser = async (userId) => {
    setSelectedUser(userId);

    if (!userId) {
      loadLogs();
      return;
    }

    const filtered = await getAuditsByUser(userId);
    setLogs(filtered);
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold">Audit Logs</h3>

      {/* Filter */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label fw-bold">Filter by User</label>
          <select
            className="form-control"
            value={selectedUser}
            onChange={(e) => filterLogsByUser(e.target.value)}
          >
            <option value="">All Users</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.full_name || u.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.user_name || "Unknown"}</td>
                <td><strong>{log.action}</strong></td>
                <td>{log.details}</td>
                <td className="small text-muted">
                  <Clock size={13} className="me-1" />
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}

            {logs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted py-3">
                  No audit logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
