import React, { useState } from "react";
import { createProduct } from "../../../api/productService";

export default function ProductForm({ onNavigate }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    short_description: "",
    weight_gram: "",
    unit: "Gram"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await createProduct(form);
    alert("Product created successfully");
    onNavigate("admin-products");
  };

  return (
    <div className="container my-4">
      <h3>Add New Product</h3>

      <div className="mb-3">
        <label>Title</label>
        <input name="title" className="form-control"
          onChange={handleChange} value={form.title} />
      </div>

      <div className="mb-3">
        <label>Slug</label>
        <input name="slug" className="form-control"
          onChange={handleChange} value={form.slug} />
      </div>

      <div className="mb-3">
        <label>Short Description</label>
        <textarea name="short_description" className="form-control"
          onChange={handleChange} value={form.short_description} />
      </div>

      <div className="row">
        <div className="col">
          <label>Weight</label>
          <input name="weight_gram" className="form-control"
            onChange={handleChange} value={form.weight_gram} />
        </div>
        <div className="col">
          <label>Unit</label>
          <select name="unit" className="form-select"
            onChange={handleChange} value={form.unit}>
            <option>Gram</option>
            <option>ML</option>
            <option>Capsule</option>
            <option>Tablets</option>
            <option>g</option>
          </select>
        </div>
      </div>

      <button className="btn btn-success mt-3" onClick={handleCreate}>
        Save Product
      </button>
    </div>
  );
}
