import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/productService";
import { Pencil, Trash, Image } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductList({ onNavigate }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      loadProducts();
    } catch (err) {
      toast.error("Failed to delete product!");
    }
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold">Products</h3>

      <button
        className="btn btn-success mb-3"
        onClick={() => onNavigate("admin-product-new")}
      >
        + Add Product
      </button>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Weight</th>
            <th>Active</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No product found
              </td>
            </tr>
          )}

          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>
                {p.weight_gram} {p.unit}
              </td>
              <td>{p.is_active ? "Yes" : "No"}</td>
              <td>{p.is_featured ? "Yes" : "No"}</td>

              <td className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onNavigate(`admin-product-edit-${p.id}`)}
                >
                  <Pencil size={16} />
                </button>

                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => onNavigate(`admin-product-images-${p.id}`)}
                >
                  <Image size={16} />
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
