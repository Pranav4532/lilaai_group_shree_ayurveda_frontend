import React, { useEffect, useState } from "react";
import { createCoupon, updateCoupon, getAllCoupons } from "../../../api/couponService";

export default function CouponForm({ couponId, onNavigate }) {
  const isEdit = Boolean(couponId);

  const [form, setForm] = useState({
    code: "",
    discount_percent: "",
    expiry_date: ""
  });

  useEffect(() => {
    if (isEdit) loadCoupon();
  }, []);

  const loadCoupon = async () => {
    const all = await getAllCoupons();
    const found = all.find(c => c.id === Number(couponId));
    if (found) {
      setForm({
        code: found.code,
        discount_percent: found.discount_percent,
        expiry_date: found.expiry_date.split("T")[0] // Format yyyy-mm-dd
      });
    }
  };

  const handleSubmit = async () => {
    if (!form.code || !form.discount_percent || !form.expiry_date) {
      return alert("Fill all fields!");
    }

    if (isEdit) {
      await updateCoupon(couponId, form);
      alert("Coupon updated!");
    } else {
      await createCoupon(form);
      alert("Coupon created!");
    }

    onNavigate("admin-coupons");
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">
        {isEdit ? "Edit Coupon" : "Create Coupon"}
      </h3>

      <div className="mb-3">
        <label className="form-label">Coupon Code</label>
        <input
          className="form-control"
          name="code"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Discount %</label>
        <input
          type="number"
          className="form-control"
          name="discount_percent"
          min="1"
          max="90"
          value={form.discount_percent}
          onChange={e => setForm({ ...form, discount_percent: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Expiry Date</label>
        <input
          type="date"
          className="form-control"
          name="expiry_date"
          value={form.expiry_date}
          onChange={e => setForm({ ...form, expiry_date: e.target.value })}
        />
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        {isEdit ? "Update" : "Create"}
      </button>

      <button className="btn btn-secondary ms-2" onClick={() => onNavigate("admin-coupons")}>
        Cancel
      </button>
    </div>
  );
}
