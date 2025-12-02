// src/components/ProductGrid.js
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onNavigate, onAddToCart }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-muted">No products found.</p>;
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
          <ProductCard 
            product={product} 
            onNavigate={onNavigate} 
            onAddToCart={onAddToCart} 
          />
        </div>
      ))}
    </div>
  );
}
