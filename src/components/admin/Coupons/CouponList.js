import React, { useEffect, useState } from "react";
import { getAllCoupons, deleteCoupon } from "../../../api/couponService";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";

export default function CouponList({ onNavigate }) {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    const data = await getAllCoupons();
    setCoupons(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoupon(id);
      toast.success("Coupon deleted!");
      loadCoupons();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete coupon");
    }
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Coupons</h3>

      <button
        className="btn btn-success mb-3"
        onClick={() => onNavigate("admin-coupon-new")}
      >
        + Create Coupon
      </button>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Discount (%)</th>
            <th>Expiry</th>
            <th width="120px">Actions</th>
          </tr>
        </thead>

        <tbody>
          {coupons.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No coupons found
              </td>
            </tr>
          )}

          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.id}</td>
              <td>{coupon.code}</td>
              <td>{coupon.discount_percent}%</td>
              <td>{new Date(coupon.expiry_date).toLocaleDateString()}</td>

              <td className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onNavigate(`admin-coupon-edit-${coupon.id}`)}
                >
                  <Pencil size={14} />
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(coupon.id)}
                >
                  <Trash size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
