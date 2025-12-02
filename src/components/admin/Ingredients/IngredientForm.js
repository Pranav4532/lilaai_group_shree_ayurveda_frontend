import React, { useEffect, useState } from "react";
import {
  createIngredient,
  getIngredientById,
  updateIngredient,
} from "../../../api/ingredientService";

export default function IngredientForm({ ingredientId, onNavigate }) {
  const [name, setName] = useState("");
  const isEdit = Boolean(ingredientId);

  useEffect(() => {
    if (isEdit) loadIngredient();
  }, []);

  const loadIngredient = async () => {
    const data = await getIngredientById(ingredientId);
    setName(data.name || "");
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Ingredient name cannot be empty.");

    if (isEdit) {
      await updateIngredient(ingredientId, { name });
      alert("Ingredient updated successfully!");
    } else {
      await createIngredient({ name });
      alert("Ingredient added successfully!");
    }

    onNavigate("admin-ingredients");
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold">{isEdit ? "Edit Ingredient" : "Add Ingredient"}</h3>

      <div className="mb-3">
        <label className="form-label">Ingredient Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Ashwagandha"
        />
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        {isEdit ? "Update" : "Create"}
      </button>

      <button
        className="btn btn-secondary ms-2"
        onClick={() => onNavigate("admin-ingredients")}
      >
        Cancel
      </button>
    </div>
  );
}
