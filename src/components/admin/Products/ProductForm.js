import React, { useEffect, useState } from "react";
import { createProduct } from "../../../api/productService";
import { getAllCategories } from "../../../api/categoryService";
import { toast } from "react-toastify";

export default function ProductForm({ onNavigate }) {
  const [form, setForm] = useState({
    sku: "",
    title: "",
    slug: "",
    short_description: "",
    long_description: "",
    price: "",
    mrp: "",
    weight_gram: "",
    unit: "g",
    category_id: "",
    is_active: 1,
    is_featured: 0,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (e) => {
    setForm({ ...form, is_active: e.target.checked ? 1 : 0 });
  };

  const handleSubmit = async () => {
    try {
      await createProduct(form);
      toast.success("Product created successfully!");
      onNavigate("admin-products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Add New Product</h3>

      {/* SKU */}
      <div className="mb-3">
        <label className="form-label">SKU</label>
        <input
          name="sku"
          className="form-control"
          value={form.sku}
          onChange={handleChange}
        />
      </div>

      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          name="title"
          className="form-control"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      {/* Slug */}
      <div className="mb-3">
        <label className="form-label">Slug</label>
        <input
          name="slug"
          className="form-control"
          value={form.slug}
          onChange={handleChange}
        />
      </div>

      {/* Short Description */}
      <div className="mb-3">
        <label className="form-label">Short Description</label>
        <textarea
          name="short_description"
          className="form-control"
          value={form.short_description}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Full Description */}
      <div className="mb-3">
        <label className="form-label">Full Description</label>
        <textarea
          name="long_description"
          className="form-control"
          rows="3"
          value={form.long_description}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Price Row */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Selling Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">MRP Price</label>
          <input
            type="number"
            name="mrp"
            className="form-control"
            value={form.mrp}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Quantity Row */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Quantity Value</label>
          <input
            type="number"
            name="weight_gram"
            className="form-control"
            value={form.weight_gram}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Unit</label>
          <select
            name="unit"
            className="form-select"
            value={form.unit}
            onChange={handleChange}
          >
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="capsules">capsules</option>
            <option value="tablets">tablets</option>
            <option value="kit">kit</option>
          </select>
        </div>
      </div>

      {/* Category */}
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category_id"
          className="form-select"
          value={form.category_id}
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

      {/* Toggle: Active */}
      <div className="form-check my-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={form.is_active === 1}
          onChange={handleToggle}
        />
        <label className="form-check-label">Active</label>
      </div>

      {/* Submit Button */}
      <button className="btn btn-success" onClick={handleSubmit}>
        Save Product
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
