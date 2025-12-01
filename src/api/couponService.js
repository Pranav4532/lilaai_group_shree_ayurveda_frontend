import api from "./axios";

// 💰 Get all coupons
export const getAllCoupons = async () => {
  const res = await api.get("/coupons");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// 💰 Apply coupon to order
export const applyCoupon = async (code, totalAmount) => {
  const res = await api.post("/coupons/apply", {
    code,
    totalAmount
  });
  return res.data;
};


// 💰 Create coupon (Admin)
export const createCoupon = async (couponData) => {
  const res = await api.post("/coupons", couponData);
  return res.data;
};

// 💰 Delete coupon (Admin)
export const deleteCoupon = async (id) => {
  const res = await api.delete(`/coupons/${id}`);
  return res.data;
};

// 💰 Update coupon (Admin)
export const updateCoupon = async (id, couponData) => {
  const res = await api.put(`/coupons/${id}`, couponData);
  return res.data;
};

