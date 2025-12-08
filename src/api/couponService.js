import api from "./axios";

// 💰 Get all coupons (Admin Only)
export const getAllCoupons = async () => {
  const res = await api.get("/coupons");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// 🧮 Apply coupon to order
export const applyCoupon = async (code, totalAmount) => {
  const res = await api.post("/coupons/apply", { code, totalAmount });
  return res.data;
};

// 🆕 Create coupon (Admin)
export const createCoupon = async (coupon) => {
  const payload = {
    code: coupon.code,
    description: coupon.description || "",
    discount_type: coupon.discount_type, // "percentage" or "flat"
    discount_value: Number(coupon.discount_value),
    min_order_amount: coupon.min_order_amount || 0,
    usage_limit: coupon.usage_limit || null,
    expires_at: coupon.expires_at || null,
  };

  const res = await api.post("/coupons", payload);
  return res.data;
};

// ✏ Update coupon (Admin)
export const updateCoupon = async (id, coupon) => {
  const payload = {
    code: coupon.code,
    description: coupon.description || "",
    discount_type: coupon.discount_type,
    discount_value: Number(coupon.discount_value),
    min_order_amount: coupon.min_order_amount || 0,
    usage_limit: coupon.usage_limit || null,
    expires_at: coupon.expires_at || null,
  };

  const res = await api.put(`/coupons/${id}`, payload);
  return res.data;
};

// ❌ Delete coupon (Admin)
export const deleteCoupon = async (id) => {
  const res = await api.delete(`/coupons/${id}`);
  return res.data;
};
