import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder } from "../../../api/orderService";
import { Eye, Trash } from "lucide-react";
import { toast } from "react-toastify";

export default function OrderList({ onNavigate }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getAllOrders();
    setOrders(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order permanently?")) return;
    await deleteOrder(id);
    toast.success("Order deleted");
    loadOrders();
  };

  const getStatusBadge = (status) => {
    const badgeColors = {
      pending: "badge bg-warning",
      Processing: "badge bg-info",
      Shipped: "badge bg-primary",
      Delivered: "badge bg-success",
      Cancelled: "badge bg-danger",
    };
    return (
      <span className={badgeColors[status] || "badge bg-secondary"}>
        {status}
      </span>
    );
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-4">Orders</h3>

      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th width="150px">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted py-3">
                No orders found
              </td>
            </tr>
          )}

          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>₹{order.total_amount}</td>
              <td>{getStatusBadge(order.status)}</td>
              <td>{new Date(order.placed_at).toLocaleDateString()}</td>

              <td className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => onNavigate(`admin-order-details-${order.id}`)}
                >
                  <Eye size={14} />
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(order.id)}
                >
                  <Trash size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
