import React, { useEffect, useState } from "react";
import {
  createCoupon,
  updateCoupon,
  getAllCoupons,
} from "../../../api/couponService";
import { toast } from "react-toastify";

export default function CouponForm({ couponId, onNavigate }) {
  const isEdit = Boolean(couponId);

  const [form, setForm] = useState({
    code: "",
    description: "",
    discount_type: "percentage", // default
    discount_value: "",
    min_order_amount: "",
    usage_limit: "",
    expires_at: "",
  });

  useEffect(() => {
    if (isEdit) loadCoupon();
  }, []);

  const loadCoupon = async () => {
    try {
      const all = await getAllCoupons();
      const found = all.find((c) => c.id === Number(couponId));

      if (found) {
        setForm({
          code: found.code,
          description: found.description || "",
          discount_type: found.discount_type,
          discount_value: found.discount_value,
          min_order_amount: found.min_order_amount || "",
          usage_limit: found.usage_limit || "",
          expires_at: found.expires_at ? found.expires_at.split("T")[0] : "",
        });
      }
    } catch (err) {
      toast.error("Failed to load coupon details");
    }
  };

  const handleSubmit = async () => {
    if (!form.code || !form.discount_value) {
      toast.error("Code and discount value are required!");
      return;
    }

    try {
      if (isEdit) {
        await updateCoupon(couponId, form);
        toast.success("Coupon updated!");
      } else {
        await createCoupon(form);
        toast.success("Coupon created!");
      }

      setTimeout(() => onNavigate("admin-coupons"), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save coupon");
    }
  };

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">
        {isEdit ? "Edit Coupon" : "Create Coupon"}
      </h3>

      <div className="mb-3">
        <label className="form-label">Coupon Code *</label>
        <input
          className="form-control"
          value={form.code}
          onChange={(e) => updateField("code", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          className="form-control"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Discount Type *</label>
        <select
          className="form-control"
          value={form.discount_type}
          onChange={(e) => updateField("discount_type", e.target.value)}
        >
          <option value="percentage">Percentage (%)</option>
          <option value="flat">Flat Amount</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Discount Value *</label>
        <input
          type="number"
          className="form-control"
          min="1"
          value={form.discount_value}
          onChange={(e) => updateField("discount_value", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Minimum Order Amount</label>
        <input
          type="number"
          className="form-control"
          value={form.min_order_amount}
          onChange={(e) => updateField("min_order_amount", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Usage Limit</label>
        <input
          type="number"
          className="form-control"
          value={form.usage_limit}
          onChange={(e) => updateField("usage_limit", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Expiry Date</label>
        <input
          type="date"
          className="form-control"
          value={form.expires_at}
          onChange={(e) => updateField("expires_at", e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        {isEdit ? "Update" : "Create"}
      </button>

      <button
        className="btn btn-secondary ms-2"
        onClick={() => onNavigate("admin-coupons")}
      >
        Cancel
      </button>
    </div>
  );
}
