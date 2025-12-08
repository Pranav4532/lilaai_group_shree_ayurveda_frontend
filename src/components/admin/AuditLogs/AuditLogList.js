import React, { useEffect, useState } from "react";
import { getAllAudits, getAuditsByUser } from "../../../api/auditService";
import { getAllUsers } from "../../../api/userService";
import { Clock } from "lucide-react";

export default function AuditLogList() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    await Promise.all([loadUsers(), loadLogs()]);
    setLoading(false);
  };

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
    if (!userId) return loadLogs();

    const filtered = await getAuditsByUser(userId);
    setLogs(filtered);
  };

  const formatMeta = (meta) => {
    if (!meta) return "—";

    try {
      const obj = typeof meta === "string" ? JSON.parse(meta) : meta;
      return Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
    } catch {
      return meta;
    }
  };

  const actionStyle = (action) => {
    switch (action) {
      case "DELETE":
        return "text-danger fw-bold";
      case "UPDATE":
        return "text-warning fw-bold";
      default:
        return "text-success fw-bold"; // CREATE
    }
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

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th width="180px">User</th>
              <th width="100px">Action</th>
              <th>Details</th>
              <th width="180px">Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  Loading...
                </td>
              </tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.user_name || log.email || "Unknown"}</td>

                  <td className={actionStyle(log.action)}>{log.action}</td>

                  {/* Use meta instead of details */}
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {formatMeta(log.meta)}
                  </td>

                  <td className="small text-muted">
                    <Clock size={13} className="me-1" />
                    {log.created_at
                      ? new Date(log.created_at).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
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
