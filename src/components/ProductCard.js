// src/components/ProductCard.js
import React, { useState, memo } from "react";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";

const ProductCard = memo(function ProductCard({
  product,
  onNavigate,
  onAddToCart,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // ✅ Toggle wishlist (purely frontend)
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // ✅ Navigate to Product Detail
  const handleProductClick = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    onNavigate && onNavigate("product-detail", product.id);
  };

  // ✅ Add to cart using backend (from ProductsPage)
  const handleAddToCartClick = async (e) => {
    e.stopPropagation();
    if (!onAddToCart) return; // fallback if no function passed

    try {
      setIsAddingToCart(true);
      await onAddToCart(product, e);
    } catch (err) {
      console.error("Add to cart failed:", err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      className="card shadow-sm border-0 h-100 position-relative"
      onClick={handleProductClick}
      style={{ cursor: "pointer" }}
    >
      {/* Product Image */}
      <div className="position-relative">
        <img
          src={
            product.image && product.image.startsWith("http")
              ? product.image
              : `${process.env.PUBLIC_URL}/images/default.jpg`
          }
          alt={product.name}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.src = `${process.env.PUBLIC_URL}/images/default.jpg`;
          }}
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="badge bg-success position-absolute top-0 start-0 m-2">
            -{discountPercentage}% OFF
          </span>
        )}

        {/* Wishlist + View buttons */}
        <div className="position-absolute top-0 end-0 m-2 d-flex flex-column">
          <button
            onClick={handleWishlistToggle}
            className={`btn btn-light p-2 mb-2 border rounded-circle ${
              isWishlisted ? "text-danger" : "text-secondary"
            }`}
          >
            <Heart
              size={18}
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="btn btn-light p-2 border rounded-circle text-secondary"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="fw-bold text-truncate">{product.name}</h5>
        <p className="text-muted small text-truncate">{product.description}</p>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`me-1 ${
                i < Math.floor(product.rating)
                  ? "text-warning"
                  : "text-secondary opacity-50"
              }`}
            />
          ))}
        </div>

        {/* Price */}
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">₹{product.price}</span>
          {product.originalPrice && (
            <small className="text-muted text-decoration-line-through">
              ₹{product.originalPrice}
            </small>
          )}
        </div>

        {/* ✅ Add to Cart */}
        <button
          onClick={handleAddToCartClick}
          disabled={isAddingToCart}
          className="btn btn-success mt-2 w-100"
        >
          {isAddingToCart ? (
            "Adding..."
          ) : (
            <>
              <ShoppingCart size={16} className="me-1" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
