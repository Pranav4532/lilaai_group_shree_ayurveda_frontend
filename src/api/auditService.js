import api from "./axios";

// 📋 Get all audit logs (Admin)
export const getAllAudits = async () => {
  const res = await api.get("/audits");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// 📋 Get audit logs by user
export const getAuditsByUser = async (userId) => {
  const res = await api.get(`/audits/user/${userId}`);
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};
