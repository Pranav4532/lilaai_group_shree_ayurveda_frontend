import React, { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../../api/productService";

export default function ProductEdit({ productId, onNavigate }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await getProductById(productId);
    setForm(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateProduct(productId, form);
    alert("Product updated successfully");
    onNavigate("admin-products");
  };

  if (!form) return <p className="text-center my-5">Loading...</p>;

  return (
    <div className="container my-4">
      <h3>Edit Product</h3>

      <div className="mb-3">
        <label>Title</label>
        <input name="title" className="form-control"
          onChange={handleChange} value={form.title} />
      </div>

      <div className="mb-3">
        <label>Short Description</label>
        <textarea name="short_description" className="form-control"
          onChange={handleChange} value={form.short_description} />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
        Update Product
      </button>
    </div>
  );
}
