import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder, updateOrder } from "../../../api/orderService";
import { Eye, Trash, Edit } from "lucide-react";

export default function OrderList({ onNavigate }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getAllOrders();
    setOrders(data);
  };

  const handleStatusChange = async (order, newStatus) => {
    await updateOrder(order.id, { status: newStatus });
    loadOrders();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order permanently?")) return;
    await deleteOrder(id);
    loadOrders();
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-4">Orders</h3>

      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th width="180px">Actions</th>
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

          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>₹{order.total_amount}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>

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
