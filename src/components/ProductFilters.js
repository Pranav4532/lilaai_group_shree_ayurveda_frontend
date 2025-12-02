// src/components/ProductFilters.js
import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

import { getAllCategories } from "../api/categoryService";
import { getAllIngredients } from "../api/ingredientService";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductFilters({ filters, onFiltersChange }) {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // Load data from backend
  useEffect(() => {
    Promise.all([getAllCategories(), getAllIngredients()])
      .then(([cats, ingr]) => {
        setCategories(Array.isArray(cats) ? cats : []);
        setIngredients(Array.isArray(ingr) ? ingr : []);
      })
      .catch((err) => console.error("❌ Filter load failed:", err));
  }, []);

  const handleCategoryChange = (category, checked) =>
    onFiltersChange({
      ...filters,
      categories: checked
        ? [...filters.categories, category]
        : filters.categories.filter((c) => c !== category),
    });

  const handleIngredientChange = (ingredient, checked) =>
    onFiltersChange({
      ...filters,
      ingredients: checked
        ? [...filters.ingredients, ingredient]
        : filters.ingredients.filter((i) => i !== ingredient),
    });

  const handlePriceChange = (e) =>
    onFiltersChange({
      ...filters,
      priceRange: [0, Number(e.target.value)],
    });

  const handleStockChange = (checked) =>
    onFiltersChange({
      ...filters,
      inStock: checked,
    });

  const clearAllFilters = () =>
    onFiltersChange({
      categories: [],
      priceRange: [0, 5000],
      ingredients: [],
      inStock: false,
    });

  const activeFilterBadge = () =>
    (filters.categories?.length || 0) +
    (filters.ingredients?.length || 0) +
    (filters.inStock ? 1 : 0);

  return (
    <div>
      {/* FILTER HEADER (only one) */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Filters</h5>
        {activeFilterBadge() > 0 && (
          <button
            className="btn btn-link text-decoration-none text-danger fw-semibold p-0"
            onClick={clearAllFilters}
          >
            <RotateCcw size={16} className="me-1" />
            Clear All ({activeFilterBadge()})
          </button>
        )}
      </div>

      {/* PRODUCT TYPES */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">Product Types</h6>
          {categories.length === 0 && (
            <p className="text-muted small mb-0">No categories found</p>
          )}

          {categories.map((cat) => {
            const catName = cat.name || cat.category_name || ""; // ✅ support both shapes
            if (!catName) return null;

            return (
              <label key={cat.id || catName} className="form-check mb-2">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={filters.categories.includes(catName)}
                  onChange={(e) =>
                    handleCategoryChange(catName, e.target.checked)
                  }
                />
                {catName}
              </label>
            );
          })}
        </div>
      </div>

      {/* INGREDIENTS */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">Ingredients</h6>

          {ingredients.length === 0 && (
            <p className="text-muted small mb-0">No ingredients found</p>
          )}

          {ingredients.map((ing) => {
            const ingName = ing.name || ing.ingredient_name || ""; // ✅ support both
            if (!ingName) return null;

            return (
              <label key={ing.id || ingName} className="form-check mb-2">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={filters.ingredients.includes(ingName)}
                  onChange={(e) =>
                    handleIngredientChange(ingName, e.target.checked)
                  }
                />
                {ingName}
              </label>
            );
          })}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h6 className="fw-semibold mb-2">Price Range</h6>
          <input
            type="range"
            className="form-range"
            min="0"
            max="5000"
            step="50"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
          />
          <small className="text-muted">
            ₹{filters.priceRange[0]} — ₹{filters.priceRange[1]}
          </small>
        </div>
      </div>

      {/* STOCK */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <label className="form-check">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={filters.inStock}
              onChange={(e) => handleStockChange(e.target.checked)}
            />
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
}
