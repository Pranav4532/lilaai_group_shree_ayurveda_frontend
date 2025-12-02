import React, { useEffect, useState } from "react";
import {
  Package,
  Calendar,
  Truck,
  IndianRupee,
  CheckCircle,
  Clock,
} from "lucide-react";
import { getOrdersByUser } from "../api/orderService";
import { getImageForProduct } from "../utils/imageHelper";

export default function OrdersPage({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user?.id;

    if (!userId) return;

    getOrdersByUser(userId)
      .then((res) => {
        console.log("📦 Full Orders:", res);
        setOrders(res || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-success"></div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="container text-center py-5">
        <Package size={48} className="text-muted mb-3" />
        <h5>No orders found</h5>
        <button className="btn btn-success" onClick={() => onNavigate("products")}>
          Start Shopping
        </button>
      </div>
    );

  return (
    <div className="container my-4">

      <h3 className="fw-bold mb-4">My Orders</h3>

      <style>
        {`
          .order-card {
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            transition: 0.2s;
          }
          .order-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: scale(1.01);
          }
          .order-header {
            background: #f8f9fa;
            padding: 12px;
            border-bottom: 1px solid #ddd;
            border-radius: 12px 12px 0 0;
          }
          .order-item-img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid #ddd;
          }
        `}
      </style>

      {orders.map((order) => (
        <div key={order.id} className="order-card p-3 mb-4">

          {/* Header */}
          <div className="order-header d-flex justify-content-between align-items-center">
            <div>
              <strong>Order #{order.order_number}</strong>
              <div className="text-muted small d-flex align-items-center">
                <Calendar size={14} className="me-1" />
                {new Date(order.placed_at).toLocaleDateString()}
              </div>
            </div>

            <span
              className={`badge px-3 py-2 ${
                order.status === "delivered"
                  ? "bg-success"
                  : order.status === "shipped"
                  ? "bg-primary"
                  : "bg-warning text-dark"
              }`}
            >
              {order.status.toUpperCase()}
            </span>
          </div>

          {/* Items */}
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center mt-3 pb-3 border-bottom"
            >
              <img
                src={getImageForProduct(item.product_title)}
                className="order-item-img me-3"
                alt={item.product_title}
                onError={(e) => (e.target.src = "/images/default.jpg")}
              />

              <div className="flex-grow-1">
                <div className="fw-semibold">{item.product_title}</div>
                <div className="text-muted small">Qty: {item.quantity}</div>
              </div>

              <div className="fw-bold d-flex align-items-center">
                ₹{item.total_price}
              </div>
            </div>
          ))}

          {/* Address */}
          <div className="mt-3 small">
            <strong className="d-flex align-items-center">
              <Truck size={16} className="me-1 text-success" /> Delivery Address
            </strong>

            <div className="text-muted">
              {order.shipping_address
                ? `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_zip}`
                : "No address found"}
            </div>
          </div>

          {/* Payment and Total */}
          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">

            <div>
              <div className="small text-muted">Payment</div>
              <strong>{order.payment_method.toUpperCase()}</strong>
            </div>

            <div>
              <div className="small text-muted">Total Amount</div>
              <strong className="d-flex align-items-center">
                <IndianRupee size={16} />
                {order.total_amount}
              </strong>
            </div>
          </div>

          {/* Footer Status */}
          <div className="text-center mt-3">
            {order.status === "delivered" ? (
              <span className="text-success">
                <CheckCircle size={16} className="me-1" />
                Delivered
              </span>
            ) : (
              <span className="text-muted">
                <Clock size={16} className="me-1" />
                In Progress
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
