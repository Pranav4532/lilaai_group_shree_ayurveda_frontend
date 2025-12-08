import React, { useEffect, useState } from "react";
import {
  createInventory,
  getInventoryByProduct,
  updateInventory,
} from "../../../api/inventoryService";
import { getProducts } from "../../../api/productService";
import { toast } from "react-toastify";

export default function InventoryForm({ productId, onNavigate }) {
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState("");
  const [threshold, setThreshold] = useState("");
  const [isNewInventory, setIsNewInventory] = useState(false);

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
      setIsNewInventory(false);
    } else {
      setStock("");
      setThreshold(0);
      setIsNewInventory(true);
    }
  };

  const handleSubmit = async () => {
    if (!stock && stock !== 0) {
      toast.error("Stock is required");
      return;
    }

    const payload = {
      product_id: Number(productId),
      stock: Number(stock),
      low_stock_threshold: Number(threshold),
    };

    try {
      if (isEdit && !isNewInventory) {
        await updateInventory(productId, payload);
        toast.success("Inventory updated successfully!");
      } else {
        await createInventory(payload);
        toast.success("Inventory created successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }

    setTimeout(() => {
      onNavigate("admin-inventory");
    }, 1000);
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold">
        {isNewInventory ? "Create Inventory" : "Edit Inventory"}
      </h3>

      {!isEdit && (
        <div className="mb-3">
          <label className="form-label fw-bold">Select Product</label>
          <select
            className="form-control"
            onChange={(e) =>
              onNavigate(`admin-inventory-edit-${e.target.value}`)
            }
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
        <label className="form-label fw-bold">Stock</label>
        <input
          type="number"
          className="form-control"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Low Stock Threshold</label>
        <input
          type="number"
          className="form-control"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        {isNewInventory ? "Create Inventory" : "Update Inventory"}
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
