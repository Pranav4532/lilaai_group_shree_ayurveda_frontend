import api from "./axios";

// 📋 Get all audit logs (Admin)
export const getAllAudits = async () => {
  try {
    const res = await api.get("/audits");
    return Array.isArray(res.data) ? res.data : res.data.data || [];
  } catch (err) {
    console.error("Error fetching audits:", err);
    return [];
  }
};

// 📋 Get audit logs by user
export const getAuditsByUser = async (userId) => {
  try {
    const res = await api.get(`/audits/user/${userId}`);
    return Array.isArray(res.data) ? res.data : res.data.data || [];
  } catch (err) {
    console.error(`Error fetching logs for user ${userId}:`, err);
    return [];
  }
};
