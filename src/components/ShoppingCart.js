// src/components/ShoppingCart.js
import React, { useEffect, useState, useMemo, useRef } from "react";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCart, updateCartItem, removeCartItem } from "../api/cartService";
import { getImageForProduct } from "../utils/imageHelper";
import { toast } from "sonner"; // ✅ Replaced alerts

export default function ShoppingCart({ isOpen, onClose, onNavigate }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const userId = currentUser?.id ?? null;

  useEffect(() => {
    if (!isOpen || hasFetched.current) return;
    hasFetched.current = true;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await getCart(userId);
        const items = Array.isArray(res) ? res : res.items ?? [];

        const normalized = items.map((item) => ({
          ...item,
          stableImage: item.image?.startsWith("http")
            ? item.image
            : item.image_url?.startsWith("http")
            ? item.image_url
            : "/images/default.jpg",
        }));

        setCartItems(normalized);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchCart();
    else setLoading(false);
  }, [isOpen, userId]);

  const removeFromCart = async (id) => {
    try {
      await removeCartItem(id);
      setCartItems((items) => items.filter((it) => it.id !== id));
      toast.success("Removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(id);

    try {
      await updateCartItem(id, { quantity: newQuantity });
      setCartItems((items) =>
        items.map((it) =>
          it.id === id ? { ...it, quantity: newQuantity } : it
        )
      );
      toast.success("Quantity updated");
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const { subtotal, deliveryFee, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price ?? 0) * (item.quantity ?? 1),
      0
    );
    const deliveryFee = subtotal >= 500 || subtotal === 0 ? 0 : 50;
    return { subtotal, deliveryFee, total: subtotal + deliveryFee };
  }, [cartItems]);

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error("Please login first!");
      return;
    }
    hasFetched.current = false;
    onClose();
    onNavigate?.("checkout");
  };

  if (!isOpen) {
    hasFetched.current = false;
    return null;
  }

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      />

      <div
        className="position-fixed top-0 end-0 bg-white h-100 shadow-lg overflow-auto d-flex flex-column"
        style={{ width: "400px", zIndex: 1050 }}
      >
        <div className="d-flex justify-content-between align-items-center border-bottom p-3">
          <div className="d-flex align-items-center gap-2">
            <ShoppingBag size={20} />
            <h5 className="mb-0">Shopping Cart</h5>
            <span className="badge bg-success ms-2">{cartItems.length}</span>
          </div>
          <button className="btn btn-sm btn-light" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="flex-grow-1 p-3 overflow-auto">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" />
            </div>
          ) : error ? (
            <div className="text-center text-danger py-4">{error}</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center mt-5">
              <ShoppingBag size={48} className="mb-3 text-muted" />
              <h5>Your cart is empty</h5>
              <button
                className="btn btn-success"
                onClick={() => {
                  onClose();
                  onNavigate?.("products");
                }}
              >
                Shop Now
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-3 border-0 border-bottom pb-2"
              >
                <div className="d-flex gap-3">
                  <img
                    src={item.stableImage}
                    alt={item.title || item.name}
                    className="rounded"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    onError={(e) =>
                      (e.currentTarget.src = "/images/default.jpg")
                    }
                  />

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="mb-1">{item.title ?? item.name}</h6>
                      <button
                        className="btn btn-sm btn-light"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="d-flex align-items-center border rounded">
                        <button
                          className="btn btn-sm"
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity ?? 1) - 1)
                          }
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 small fw-semibold">
                          {item.quantity ?? 1}
                        </span>
                        <button
                          className="btn btn-sm"
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity ?? 1) + 1)
                          }
                          disabled={(item.quantity ?? 1) >= 99}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <strong>
                        ₹{(item.price * (item.quantity ?? 1)).toFixed(0)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-top p-3">
            <div className="d-flex justify-content-between small">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-success">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>
            <hr />
            <div className="fw-bold d-flex justify-content-between">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              className="btn btn-success w-100 mt-3"
              onClick={handleCheckout}
            >
              Proceed to Checkout <ArrowRight size={16} className="ms-1" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
