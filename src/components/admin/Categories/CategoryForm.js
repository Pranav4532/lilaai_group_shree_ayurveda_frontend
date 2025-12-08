import React, { useEffect, useState } from "react";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../../../api/categoryService";
import { toast } from "react-toastify";

export default function CategoryForm({ categoryId, onNavigate }) {
  const isEdit = Boolean(categoryId);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit) loadCategory();
  }, []);

  const loadCategory = async () => {
    const data = await getCategoryById(categoryId);
    setForm({
      name: data.name || "",
      slug: data.slug || "",
      description: data.description || "",
    });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateCategory(categoryId, form);
        toast.success("Category updated successfully!");
      } else {
        await createCategory(form);
        toast.success("Category created successfully!");
      }

      onNavigate("admin-categories");
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Operation failed");
    }
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold">{isEdit ? "Edit Category" : "Add Category"}</h3>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Slug</label>
        <input
          name="slug"
          className="form-control"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        {isEdit ? "Update" : "Save"}
      </button>

      <button
        className="btn btn-secondary ms-2"
        onClick={() => onNavigate("admin-categories")}
      >
        Cancel
      </button>
    </div>
  );
}
