import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/productService";
import { getInventoryByProduct, deleteInventory } from "../../../api/inventoryService";
import { Pencil, Trash } from "lucide-react";

export default function InventoryList({ onNavigate }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadInventoryData();
  }, []);

  const loadInventoryData = async () => {
    const products = await getProducts();

    const inventoryData = await Promise.all(
      products.map(async (product) => {
        const inv = await getInventoryByProduct(product.id);
        return {
          product_id: product.id,
          name: product.title,
          stock: inv?.stock || 0,
          low_stock_threshold: inv?.low_stock_threshold || 0,
        };
      })
    );

    setRows(inventoryData);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Remove inventory for this product?")) return;
    await deleteInventory(productId);
    loadInventoryData();
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Inventory</h3>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Low Stock Alert</th>
            <th width="120px">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.product_id}>
              <td>{row.name}</td>
              <td>{row.stock}</td>
              <td className={row.stock <= row.low_stock_threshold ? "text-danger fw-bold" : ""}>
                {row.low_stock_threshold}
              </td>
              <td className="d-flex gap-1">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onNavigate(`admin-inventory-edit-${row.product_id}`)}
                >
                  <Pencil size={14} />
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(row.product_id)}
                >
                  <Trash size={14} />
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted py-3">
                No inventory data yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
