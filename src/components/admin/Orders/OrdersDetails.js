import React, { useEffect, useState } from "react";
import { getOrderDetails, updateOrder } from "../../../api/orderService";
import { toast } from "react-toastify";

export default function OrderDetails({ orderId, onNavigate }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const data = await getOrderDetails(orderId);
    setOrder(data);
  };

  const handleStatusUpdate = async () => {
    try {
      await updateOrder(order.id, { status: order.status });
      toast.success("Order status updated!");
      loadOrder(); // Refresh updated status
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update status");
    }
  };

  if (!order) return <p className="text-center my-5">Loading...</p>;

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Order #{order.id}</h3>

      <div className="card p-3 shadow-sm mb-3">
        <h5>Customer Info</h5>
        <p>
          <strong>User ID:</strong> {order.user_id}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.placed_at).toLocaleString()}
        </p>
      </div>

      <div className="card p-3 shadow-sm mb-3">
        <h5>Order Summary</h5>
        <p>
          <strong>Total Amount:</strong> ₹{order.total_amount}
        </p>

        <label className="fw-bold">Status</label>
        <select
          className="form-select w-auto mb-3"
          value={order.status}
          onChange={(e) => setOrder({ ...order, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button className="btn btn-primary" onClick={handleStatusUpdate}>
          Update Status
        </button>
      </div>

      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Ordered Items</h5>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td>{item.product_title}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => onNavigate("admin-orders")}
      >
        Back to Orders
      </button>
    </div>
  );
}
