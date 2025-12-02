import React, { useEffect, useState } from "react";
import {
  getAllIngredients,
  deleteIngredient,
} from "../../../api/ingredientService";
import { Pencil, Trash } from "lucide-react";

export default function IngredientList({ onNavigate }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    const data = await getAllIngredients();
    setIngredients(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ingredient?")) return;
    await deleteIngredient(id);
    loadIngredients();
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold mb-3">Ingredients</h3>

      <button
        className="btn btn-success mb-3"
        onClick={() => onNavigate("admin-ingredient-new")}
      >
        + Add Ingredient
      </button>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th width="150px">Actions</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>

              <td className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => onNavigate(`admin-ingredient-edit-${item.id}`)}
                >
                  <Pencil size={14} />
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash size={14} />
                </button>
              </td>
            </tr>
          ))}

          {ingredients.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No Ingredients Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
