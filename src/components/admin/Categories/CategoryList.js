import React, { useEffect, useState } from "react";
import { getAllCategories, deleteCategory } from "../../../api/categoryService";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";

export default function CategoryList({ onNavigate }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully!");
      loadCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Categories</h3>

      <button
        className="btn btn-success mb-2"
        onClick={() => onNavigate("admin-category-new")}
      >
        + Add Category
      </button>

      <table className="table table-hover table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No Categories Found
              </td>
            </tr>
          )}

          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>

              <td className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onNavigate(`admin-category-edit-${cat.id}`)}
                >
                  <Pencil size={16} />
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cat.id)}
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
