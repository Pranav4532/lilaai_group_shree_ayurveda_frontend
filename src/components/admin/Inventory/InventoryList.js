import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/productService";
import {
  getInventoryByProduct,
  deleteInventory,
} from "../../../api/inventoryService";
import { Pencil, Trash } from "lucide-react";

export default function InventoryList({ onNavigate }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInventoryData();
  }, []);

  const loadInventoryData = async () => {
    setLoading(true);
    const products = await getProducts();

    const inventoryData = await Promise.all(
      products.map(async (product) => {
        const inv = await getInventoryByProduct(product.id);
        return {
          product_id: product.id,
          name: product.title,
          stock: inv?.stock ?? 0, // always numeric fallback
          low_stock_threshold: inv?.low_stock_threshold ?? 0,
        };
      })
    );

    setRows(inventoryData);
    setLoading(false);
  };

  const handleDelete = async (productId) => {
    await deleteInventory(productId);
    loadInventoryData();
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Inventory</h3>

      {loading ? (
        <p className="text-muted text-center">Loading...</p>
      ) : (
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Low Stock Alert</th>
              <th width="120px">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const isLow = row.stock <= row.low_stock_threshold;

              return (
                <tr
                  key={row.product_id}
                  className={isLow ? "table-warning" : ""}
                >
                  <td>{row.name}</td>

                  <td className="text-center fw-bold">{row.stock}</td>

                  <td
                    className={`text-center ${
                      isLow ? "text-danger fw-bold" : ""
                    }`}
                  >
                    {row.low_stock_threshold}
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() =>
                        onNavigate(`admin-inventory-edit-${row.product_id}`)
                      }
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
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted py-3">
                  No inventory data yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
