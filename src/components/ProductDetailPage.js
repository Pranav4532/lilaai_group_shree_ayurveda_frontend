// src/components/ProductDetailPage.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShoppingCart, Plus, Minus } from "lucide-react";

import { addToCart } from "../api/cartService";
import { getProductById } from "../api/productService";
import { getIngredientsByProduct } from "../api/productIngredientService";
import ProductReviews from "./ProductReviews";
import { toast } from "sonner";

export default function ProductDetailPage({ onNavigate }) {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("selectedProduct");
    if (!saved) return onNavigate("products");

    const prod = JSON.parse(saved);
    loadProduct(prod.id);
    loadIngredients(prod.id);
  }, [onNavigate]);

  const loadProduct = async (id) => {
    try {
      const full = await getProductById(id);

      setProduct(full);

      const normalizedImages = (full.images || [])
        .map((img) => {
          if (!img) return null;

          let src = img;

          // Fix missing slash after domain
          src = src.replace("3000images", "3000/images");

          // Extract only path after domain
          src = src.replace(/^https?:\/\/[^\/]+/, "");

          // Guarantee correct prefix
          src = src.replace(/^\/?images\//, "/images/");

          // Adding public URL
          src = process.env.PUBLIC_URL + src;

          return src;
        })
        .filter(Boolean);

      const fallback = process.env.PUBLIC_URL + "/images/default.jpg";

      setImages(normalizedImages.length ? normalizedImages : [fallback]);
      setSelectedImage(normalizedImages[0] || fallback);

    } catch (err) {
      console.error("❌ Failed loading product:", err);
    }
  };

  const loadIngredients = async (id) => {
    try {
      const res = await getIngredientsByProduct(id);
      const data = res?.data ?? res;
      setIngredients(data);
    } catch (err) {
      console.error("❌ Failed to load ingredients:", err);
    }
  };

  const handleAddToCart = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!currentUser?.id) {
      toast.error("Please log in first!");
      return;
    }

    try {
      await addToCart({
        userId: currentUser.id,
        productId: product.id,
        quantity,
        price: product.price,
      });

      toast.success("Added to cart! 🛒");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart!");
    }
  };

  if (!product) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container my-5">

      {/* Breadcrumb */}
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item text-success" role="button" onClick={() => onNavigate("home")}>Home</li>
          <li className="breadcrumb-item text-success" role="button" onClick={() => onNavigate("products")}>Products</li>
          <li className="breadcrumb-item active">{product.title}</li>
        </ol>
      </nav>

      <div className="row g-5">

        {/* MAIN IMAGE */}
        <div className="col-md-6">
          <img
            src={selectedImage}
            alt={product.title}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: 450, objectFit: "cover" }}
          />

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className="d-flex gap-2 flex-wrap">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onError={(e) => (e.target.style.display = "none")}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded border ${selectedImage === img ? "border-success border-2" : "border-light"}`}
                  style={{
                    width: 70,
                    height: 70,
                    cursor: "pointer",
                    objectFit: "cover"
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT INFO */}
        <div className="col-md-6">
          
          <h2 className="fw-bold">{product.title}</h2>
          {product.short_description && (
            <p className="text-muted">{product.short_description}</p>
          )}

          {/* Ingredients */}
          {ingredients.length > 0 && (
            <>
              <h5 className="fw-bold mt-3">Ingredients</h5>
              <ul className="text-muted">
                {ingredients.map((ing, i) => (
                  <li key={i}>{ing.ingredient_name || ing.name}</li>
                ))}
              </ul>
            </>
          )}

          <p><strong>SKU:</strong> {product.sku}</p>
          <h4 className="text-success fw-bold mt-2">₹{product.price}</h4>

          {/* Quantity */}
          <div className="d-flex align-items-center my-3">
            <span className="me-3">Quantity:</span>
            <div className="input-group" style={{ width: 140 }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Minus size={16} />
              </button>
              <input className="form-control text-center" value={quantity} readOnly />
              <button
                className="btn btn-outline-secondary"
                onClick={() => quantity < 10 && setQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button className="btn btn-success w-100" onClick={handleAddToCart}>
            <ShoppingCart size={18} className="me-2" /> Add to Cart
          </button>

          {/* Description */}
          {product.long_description && (
            <>
              <h5 className="fw-bold mt-4">Description</h5>
              <p className="text-muted">{product.long_description}</p>
            </>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-5">
        <ProductReviews productId={product.id} />
      </div>

    </div>
  );
}
