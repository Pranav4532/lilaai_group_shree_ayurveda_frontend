import React, { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../../api/productService";
import { getAllCategories } from "../../../api/categoryService";
import { toast } from "react-toastify";

export default function ProductEdit({ productId, onNavigate }) {
  const [form, setForm] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = async () => {
    const data = await getProductById(productId);
    setForm(data);
  };

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setForm({ ...form, is_active: form.is_active === 1 ? 0 : 1 });
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(productId, form);
      toast.success("Product updated!");
      onNavigate("admin-products");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (!form) return <p className="text-center my-5">Loading...</p>;

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Edit Product</h3>

      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          name="title"
          value={form.title || ""}
          onChange={handleChange}
        />
      </div>

      {/* Slug */}
      <div className="mb-3">
        <label className="form-label">Slug</label>
        <input
          className="form-control"
          name="slug"
          value={form.slug || ""}
          onChange={handleChange}
        />
      </div>

      {/* Short Description */}
      <div className="mb-3">
        <label className="form-label">Short Description</label>
        <textarea
          className="form-control"
          name="short_description"
          value={form.short_description || ""}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Long Description */}
      <div className="mb-3">
        <label className="form-label">Full Description</label>
        <textarea
          className="form-control"
          name="long_description"
          rows="4"
          value={form.long_description || ""}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Price Row */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Selling Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={form.price || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">MRP Price</label>
          <input
            type="number"
            className="form-control"
            name="mrp"
            value={form.mrp || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Weight & Unit */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Quantity Value</label>
          <input
            type="number"
            className="form-control"
            name="weight_gram"
            value={form.weight_gram || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Unit (g/ml/capsules)</label>
          <input
            className="form-control"
            name="unit"
            value={form.unit || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="category_id"
          value={form.category_id || ""}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Active Toggle */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={form.is_active === 1}
          onChange={handleToggle}
        />
        <label className="form-check-label ms-2">Is Active</label>
      </div>

      {/* Buttons */}
      <button className="btn btn-success" onClick={handleUpdate}>
        Update Product
      </button>
      <button
        className="btn btn-secondary ms-2"
        onClick={() => onNavigate("admin-products")}
      >
        Cancel
      </button>
    </div>
  );
}
