// src/components/CheckoutPage.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import { ArrowLeft, Shield, Truck } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

import { getCart, clearCart } from "../api/cartService";
import { getUserAddresses, createAddress } from "../api/addressService";
import { createOrder } from "../api/orderService";
import { getCurrentUser, getUserById } from "../api/userService";
import { applyCoupon } from "../api/couponService";
import { getImageForProduct } from "../utils/imageHelper";
import { toast } from "sonner";


const UPI_ID = process.env.REACT_APP_UPI_ID;
const UPI_NAME = process.env.REACT_APP_UPI_NAME;
const QR_SIZE = 300;
const QR_TTL_MS = 10 * 60 * 1000; // 10 minutes
const QR_PROVIDER = "https://api.qrserver.com/v1/create-qr-code/";

export default function CheckoutPage({ onNavigate }) {
  const [loading, setLoading] = useState(true);

  // Steps: 1-contact, 2-shipping, 3-payment (QR), 4-review
  const [step, setStep] = useState(1);

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [useExistingAddress, setUseExistingAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  // UPI QR state
  const [qrNonce, setQrNonce] = useState(Date.now());
  const [qrExpiresAt, setQrExpiresAt] = useState(Date.now() + QR_TTL_MS);
  const [secondsLeft, setSecondsLeft] = useState(Math.floor(QR_TTL_MS / 1000));
  const qrTimer = useRef(null);

  // busy flag to avoid duplicate actions
  const [busy, setBusy] = useState(false);

  // -------------------------
  // Load user, cart and addresses
  // -------------------------
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const stored = getCurrentUser();
        if (!stored) {
          toast.error("Please login to checkout");

          onNavigate("home");
          return;
        }

        let user = stored;

        // If phone missing, try fetching full user from API
        if (!stored.phone) {
          try {
            const res = await getUserById(stored.id); // getUserById returns res.data or user object
            user = res?.data ?? res ?? stored;
            // update localStorage so other components can pick phone later
            localStorage.setItem("user", JSON.stringify(user));
          } catch (err) {
            console.warn("Could not fetch full user:", err);
            user = stored;
          }
        }

        // fill contact form
        const [first = "", ...rest] = (user.full_name || "").split(" ");
        const last = rest.join(" ");
        setForm((prev) => ({
          ...prev,
          email: user.email || "",
          firstName: first,
          lastName: last,
          phone: user.phone || "",
        }));

        // load cart items & addresses in parallel
        const [cartRes, addrRes] = await Promise.all([
          getCart(user.id).catch((e) => {
            console.error("Cart fetch failed:", e);
            return [];
          }),
          getUserAddresses().catch((e) => {
            console.error("Address fetch failed:", e);
            return [];
          }),
        ]);

        // normalize cart items
        const itemsRaw = Array.isArray(cartRes) ? cartRes : cartRes.items ?? [];
        const normalized = itemsRaw.map((it) => ({
          ...it,
          name: it.title || it.name || it.product_name,
          image: getImageForProduct(it.title || it.name || it.product_name),
          quantity: Number(it.quantity ?? 1),
          price: Number(it.price ?? it.price_at_added ?? 0),
        }));

        if (!mounted) return;
        setCartItems(normalized);
        setAddresses(Array.isArray(addrRes) ? addrRes : []);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [onNavigate]);

  // -------------------------
  // Totals (consider coupon)
  // -------------------------
  const { subtotal, discountAmount, deliveryFee, total } = useMemo(() => {
    const subtotal = cartItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
    let discount = 0;

    if (couponApplied) {
      if (typeof couponApplied.discountAmount === "number") discount = couponApplied.discountAmount;
      else if (typeof couponApplied.discountPercent === "number")
        discount = Math.round((subtotal * couponApplied.discountPercent) / 100);
      else if (typeof couponApplied.discount === "number") discount = couponApplied.discount;
    }

    const deliveryFee = subtotal >= 500 || subtotal === 0 ? 0 : 50;
    const total = Math.max(0, subtotal - discount + deliveryFee);
    return { subtotal, discountAmount: discount, deliveryFee, total };
  }, [cartItems, couponApplied]);

  // -------------------------
  // QR building & timer
  // -------------------------
  const buildUpiUrl = (nonce) => {
    const params = new URLSearchParams();
    params.set("pa", UPI_ID);
    params.set("pn", UPI_NAME);
    params.set("am", String(total.toFixed(2)));
    params.set("cu", "INR");
    params.set("tn", `Order ${Date.now()}`);
    params.set("nonce", String(nonce));
    return `upi://pay?${params.toString()}`;
  };

  const buildQrSrc = (nonce) => {
    const upi = buildUpiUrl(nonce);
    const params = new URLSearchParams({
      data: upi,
      size: `${QR_SIZE}x${QR_SIZE}`,
    });
    return `${QR_PROVIDER}?${params.toString()}`;
  };

  const qrSrc = buildQrSrc(qrNonce);

  // start/refresh countdown when qrNonce or total changes
  useEffect(() => {
    // reset expiry
    setQrExpiresAt(Date.now() + QR_TTL_MS);
    setSecondsLeft(Math.floor(QR_TTL_MS / 1000));
    if (qrTimer.current) clearInterval(qrTimer.current);

    qrTimer.current = setInterval(() => {
      const remain = Math.max(0, Math.floor((qrExpiresAt - Date.now()) / 1000));
      setSecondsLeft(remain);
      if (remain <= 0) {
        // refresh QR by changing nonce
        setQrNonce(Date.now());
        setQrExpiresAt(Date.now() + QR_TTL_MS);
      }
    }, 1000);

    return () => {
      if (qrTimer.current) clearInterval(qrTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrNonce, total]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // -------------------------
  // Coupons: call backend with correct shape: { code, totalAmount }
  // -------------------------
  const handleApplyCoupon = async () => {
    if (!couponCode?.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await applyCoupon(couponCode.trim(), subtotal);
      // backend may send many shapes, we try to extract discount
      const payload = res?.data ?? res ?? {};
      // console.debug("applyCoupon response:", payload);

      // try common fields
      let computedDiscount = null;
      let discountPercent = null;

      if (typeof payload.discountAmount === "number") computedDiscount = payload.discountAmount;
      else if (typeof payload.discount === "number") computedDiscount = payload.discount;
      else if (typeof payload.discount_value === "number") {
        if (payload.discount_type?.toLowerCase().includes("percent")) discountPercent = payload.discount_value;
        else computedDiscount = payload.discount_value;
      } else if (typeof payload.amount_off === "number") computedDiscount = payload.amount_off;
      else if (typeof payload.newTotal === "number") computedDiscount = Math.round(subtotal - payload.newTotal);
      else if (typeof payload.finalPrice === "number") computedDiscount = Math.round(subtotal - payload.finalPrice);

      if (computedDiscount == null && discountPercent == null) {
        setCouponError("Coupon applied but backend returned unexpected shape.");
        setCouponApplied(null);
      } else {
        setCouponApplied({
          code: couponCode.trim(),
          discountAmount: computedDiscount,
          discountPercent,
          raw: payload,
        });
        setCouponError("");
      }
    } catch (err) {
      console.error("Coupon apply failed:", err);
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Failed to apply coupon";
      setCouponError(String(msg));
      setCouponApplied(null);
    } finally {
      setCouponLoading(false);
      setCouponCode("");
    }
  };

  const removeCoupon = () => {
    setCouponApplied(null);
    setCouponError("");
  };

  // -------------------------
  // Save address
  // -------------------------
  const handleSaveAddress = async () => {
    if (!form.address || !form.city || !form.pincode) {
      toast.warning("Please complete address, city and pincode.");
      return;
    }
    setBusy(true);
    try {
      const newAddr = {
        label: "Home",
        address_line1: form.address,
        city: form.city,
        state: form.state,
        postal_code: form.pincode,
        country: "India",
        phone: form.phone,
        is_default: true,
      };
      const res = await createAddress(newAddr);
      const saved = res?.data ?? res;
      setAddresses((prev) => [...prev, saved]);
      setSelectedAddress(saved);
      setUseExistingAddress(true);
      setStep(3); // move to payment
    } catch (err) {
      console.error("Save address failed:", err);
      toast.error("Failed to save address. Try again.");

    } finally {
      setBusy(false);
    }
  };

  // -------------------------
  // Confirm payment & create order
  // -------------------------
  const handleConfirmPayment = async () => {
    if (!selectedAddress) return toast.error("Please select a shipping address before continuing.");

toast.info("Please ensure UPI payment is completed!");


    setBusy(true);
    try {
      const user = getCurrentUser();
      if (!user) return toast.error("Login required!");

      // build order payload that matches backend controller
      const orderData = {
        total_amount: total,
        shipping_address_id: selectedAddress.id,
        billing_address_id: selectedAddress.id,
        payment_method: "upi",
        payment_status: "paid",
        items: cartItems.map((it) => ({
          product_id: it.product_id ?? it.id,
          quantity: it.quantity,
          price: it.price,
        })),
        coupon_code: couponApplied?.code ?? null,
      };

      await createOrder(orderData);
      // clear cart (best-effort)
      await clearCart(user.id).catch((e) => console.warn("Clear cart failed:", e));

      toast.success("Order placed successfully! 🎉");
      onNavigate("orders");
    } catch (err) {
      console.error("Place order failed:", err);
      toast.error("Failed to place order. Please try again!");

    } finally {
      setBusy(false);
    }
  };

  // -------------------------
  // Loading UI
  // -------------------------
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-75">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  // -------------------------
  // JSX (UI)
  // -------------------------
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-light me-3" onClick={() => onNavigate("products")}>
          <ArrowLeft size={16} className="me-1" />
          Back
        </button>
        <div>
          <h2 className="fw-bold mb-0">Checkout</h2>
          <small className="text-muted">Secure UPI Payment • Fast Checkout</small>
        </div>
      </div>

      {/* Step indicator */}
      <div className="mb-4">
        <div className="d-flex gap-3 align-items-center">
          {[{ id: 1, label: "Contact" }, { id: 2, label: "Shipping" }, { id: 3, label: "Payment" }, { id: 4, label: "Review" }].map((s) => (
            <div key={s.id} className="d-flex align-items-center">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center ${step === s.id ? "bg-success text-white" : step > s.id ? "bg-success bg-opacity-25 text-success" : "bg-light text-muted"}`}
                style={{ width: 34, height: 34 }}
              >
                {s.id}
              </div>
              <div className="ms-2 me-3 small">{s.label}</div>
              {s.id !== 4 && <div style={{ width: 24, height: 1, background: "#e9ecef" }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        {/* LEFT: Steps */}
        <div className="col-lg-7">
          {/* Step 1 - Contact */}
          {step === 1 && (
            <div className="card shadow-sm mb-4">
              <div className="card-header fw-bold">Contact Information</div>
              <div className="card-body">
                <label className="form-label">Email</label>
                <input className="form-control mb-2" value={form.email} readOnly />

                <div className="row">
                  <div className="col">
                    <label className="form-label">First name</label>
                    <input className="form-control" value={form.firstName} readOnly />
                  </div>
                  <div className="col">
                    <label className="form-label">Last name</label>
                    <input className="form-control" value={form.lastName} readOnly />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-control" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Enter phone number" />
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-success" onClick={() => setStep(2)}>
                    Continue to Shipping
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Shipping */}
          {step === 2 && (
            <div className="card shadow-sm mb-4">
              <div className="card-header fw-bold d-flex align-items-center">
                <Truck size={18} className="me-2 text-success" /> Shipping Address
              </div>
              <div className="card-body">
                <div className="d-flex gap-4 mb-3">
                  <div className="form-check">
                    <input id="useExisting" type="radio" className="form-check-input" checked={useExistingAddress} onChange={() => setUseExistingAddress(true)} />
                    <label htmlFor="useExisting" className="form-check-label">Use Existing Address</label>
                  </div>
                  <div className="form-check">
                    <input id="addNew" type="radio" className="form-check-input" checked={!useExistingAddress} onChange={() => setUseExistingAddress(false)} />
                    <label htmlFor="addNew" className="form-check-label">Add New Address</label>
                  </div>
                </div>

                {useExistingAddress ? (
                  <>
                    <label className="form-label">Select saved address</label>
                    <select className="form-select mb-3" value={selectedAddress?.id ?? ""} onChange={(e) => {
                      const found = addresses.find((a) => String(a.id) === String(e.target.value));
                      setSelectedAddress(found || null);
                    }}>
                      <option value="">-- choose address --</option>
                      {addresses.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.address_line1}, {a.city} ({a.postal_code})
                        </option>
                      ))}
                    </select>

                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>Back</button>
                      <button className="btn btn-success" disabled={!selectedAddress} onClick={() => setStep(3)}>Continue to Payment</button>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="form-label">Street Address</label>
                    <input className="form-control mb-2" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />

                    <div className="row">
                      <div className="col">
                        <label className="form-label">City</label>
                        <input className="form-control mb-2" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} />
                      </div>
                      <div className="col">
                        <label className="form-label">State</label>
                        <input className="form-control mb-2" value={form.state} onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))} />
                      </div>
                    </div>

                    <label className="form-label">Pincode</label>
                    <input className="form-control mb-3" value={form.pincode} onChange={(e) => setForm((p) => ({ ...p, pincode: e.target.value }))} />

                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>Back</button>
                      <button className="btn btn-success" onClick={handleSaveAddress} disabled={busy}>Save & Continue</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3 - Payment */}
          {step === 3 && (
            <div className="card shadow-sm mb-4">
              <div className="card-header fw-bold">Payment — UPI</div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-5 d-flex align-items-center justify-content-center">
                    <div className="p-2 border rounded">
                      <img src={qrSrc} width={QR_SIZE} height={QR_SIZE} alt="UPI QR" />
                    </div>
                  </div>

                  <div className="col-md-7">
                    <div><strong>UPI ID:</strong> {UPI_ID}</div>
                    <div><strong>Name:</strong> {UPI_NAME}</div>
                    <div className="mt-2"><strong>Amount:</strong> ₹{total}</div>

                    <div className="mt-3">
                      {secondsLeft > 0 ? <div className="text-success small">QR expires in {formatTime(secondsLeft)}</div> : <div className="text-danger small">Refreshing QR…</div>}
                    </div>

                    <div className="mt-3">
                      <button className="btn btn-success me-2" onClick={() => setStep(4)}>I have paid</button>
                      <button className="btn btn-outline-secondary" onClick={() => { setQrNonce(Date.now()); setQrExpiresAt(Date.now() + QR_TTL_MS); }}>Refresh QR</button>
                    </div>

                    <div className="mt-3 small text-muted">Use any UPI app (GPay, PhonePe, Paytm) to scan. After payment click "I have paid" and confirm.</div>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-outline-secondary" onClick={() => setStep(2)}>Back</button>
                  <button className="btn btn-success" onClick={() => { setStep(4); setQrNonce(Date.now()); }}>Continue to Review</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Review */}
          {step === 4 && (
            <div className="card shadow-sm mb-4">
              <div className="card-header fw-bold">Review & Confirm</div>
              <div className="card-body">
                <div className="mb-3"><strong>Contact:</strong> {form.firstName} {form.lastName} • {form.email} • {form.phone}</div>
                <div className="mb-3"><strong>Shipping:</strong> {selectedAddress ? `${selectedAddress.address_line1}, ${selectedAddress.city} (${selectedAddress.postal_code})` : `${form.address}, ${form.city}`}</div>
                <div className="mb-3"><strong>Payment:</strong> UPI (scan QR and confirm)</div>

                <div className="d-grid gap-2">
                  <button className="btn btn-success" disabled={busy} onClick={handleConfirmPayment}>I HAVE PAID — Confirm & Place Order</button>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => setStep(3)}>Back</button>
                    <button className="btn btn-link text-muted" onClick={() => setStep(2)}>Edit Address</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Order summary + coupon */}
        <div className="col-lg-5">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div><h5 className="mb-0">Order Summary</h5><small className="text-muted">Review items</small></div>
                <div className="text-end"><div className="small text-muted">Items: {cartItems.length}</div></div>
              </div>

              {cartItems.map((it) => (
                <div key={it.id} className="d-flex align-items-center mb-3">
                  <img src={it.image} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} alt={it.name} className="me-3" onError={(e) => (e.currentTarget.src = "/images/default.jpg")} />
                  <div className="flex-grow-1 small">
                    <div className="fw-semibold">{it.name}</div>
                    <div className="text-muted">Qty: {it.quantity}</div>
                  </div>
                  <div className="fw-bold">₹{(it.price * it.quantity).toFixed(0)}</div>
                </div>
              ))}

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between">
                  <div className="small text-muted">Subtotal</div>
                  <div className="fw-semibold">₹{subtotal}</div>
                </div>

                {couponApplied && (
                  <div className="d-flex justify-content-between text-success mt-1">
                    <div className="small">Coupon ({couponApplied.code})</div>
                    <div>-₹{couponApplied.discountAmount ?? Math.round((couponApplied.discountPercent / 100) * subtotal)}</div>
                  </div>
                )}

                <div className="d-flex justify-content-between mt-1">
                  <div className="small text-muted">Delivery</div>
                  <div>{deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}</div>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small text-muted">Total</div>
                    <div className="fw-bold fs-5">₹{total}</div>
                  </div>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => { setStep(3); setQrNonce(Date.now()); setQrExpiresAt(Date.now() + QR_TTL_MS); }}>
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coupon */}
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="fw-semibold">Apply Coupon</div>
                {couponApplied ? <button className="btn btn-link btn-sm text-danger" onClick={removeCoupon}>Remove</button> : null}
              </div>

              {couponApplied ? (
                <div className="p-2 border rounded bg-light mb-2">
                  <div className="small">Applied: <strong>{couponApplied.code}</strong></div>
                </div>
              ) : (
                <>
                  <div className="input-group mb-2">
                    <input className="form-control" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                    <button className="btn btn-success" onClick={handleApplyCoupon} disabled={couponLoading || !couponCode.trim()}>
                      {couponLoading ? "Applying..." : "Apply"}
                    </button>
                  </div>
                  {couponError && <div className="small text-danger">{couponError}</div>}
                </>
              )}
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body small text-muted">
              <div className="mb-2"><Shield size={14} className="me-1" /> Secure Checkout (SSL)</div>
              <div><Truck size={14} className="me-1" /> Free delivery on orders ₹500+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
