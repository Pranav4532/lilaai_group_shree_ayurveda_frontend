import React, { useEffect, useState } from "react";
import {
  createInventory,
  getInventoryByProduct,
  updateInventory,
} from "../../../api/inventoryService";
import { getProducts } from "../../../api/productService";

export default function InventoryForm({ productId, onNavigate }) {
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState("");
  const [threshold, setThreshold] = useState("");

  const isEdit = Boolean(productId);

  useEffect(() => {
    loadProducts();
    if (isEdit) loadInventory();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const loadInventory = async () => {
    const inv = await getInventoryByProduct(productId);
    if (inv) {
      setStock(inv.stock);
      setThreshold(inv.low_stock_threshold);
    }
  };

  const handleSubmit = async () => {
    if (!stock) return alert("Stock is required.");

    const payload = {
      stock: Number(stock),
      low_stock_threshold: Number(threshold),
      product_id: Number(productId),
    };

    if (isEdit) {
      await updateInventory(productId, payload);
      alert("Inventory updated successfully!");
    } else {
      await createInventory(payload);
      alert("Inventory added successfully!");
    }

    onNavigate("admin-inventory");
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold">{isEdit ? "Edit Inventory" : "Add Inventory"}</h3>

      {!isEdit && (
        <div className="mb-3">
          <label className="form-label">Select Product</label>
          <select
            className="form-control"
            onChange={(e) => onNavigate(`admin-inventory-edit-${e.target.value}`)}
          >
            <option value="">Choose...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          type="number"
          className="form-control"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Low Stock Threshold</label>
        <input
          type="number"
          className="form-control"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        {isEdit ? "Update" : "Create"}
      </button>

      <button
        className="btn btn-secondary ms-2"
        onClick={() => onNavigate("admin-inventory")}
      >
        Cancel
      </button>
    </div>
  );
}
