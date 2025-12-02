// src/components/ProductsPage.js
import React, { useState, useMemo, useEffect } from "react";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import { getProducts } from "../api/productService";
import { SlidersHorizontal } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css"; // only CSS is needed!
import { addToCart } from "../api/cartService";
import { getImageForProduct } from "../utils/imageHelper";
import { toast } from "sonner";

export default function ProductsPage({ searchQuery = "", onNavigate }) {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 5000],
    ingredients: [],
    inStock: false,
  });

  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const productData = await getProducts();

        const mapped = productData.map((p) => {
          const name = p.title || p.name;
          let imagePath = p.image
            ? (p.image.startsWith("/") ? p.image : "/" + p.image)
            : getImageForProduct(name);

          return {
            id: p.id,
            name,
            description: p.short_description || p.description,
            price: Number(p.price),
            originalPrice: Number(p.mrp) || Number(p.originalPrice),
            image: imagePath,
            category: p.category_name || p.category || "Herbal",
            rating: p.rating || 0,
            reviews: p.reviews || 0,
            inStock: p.in_stock ?? true,
          };
        });

        setProducts(mapped);
      } catch (err) {
        console.error("❌ Product Load Error:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddToCart = async (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    const userId = currentUser?.id;

    if (!userId) {
      toast.error("Please login first!");
      return;
    }

    try {
      await addToCart({
        userId,
        productId: product.id,
        quantity: 1,
        price: product.price,
      });

      toast.success(`${product.name} added to cart! 🛒`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart!");
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const search = searchQuery.toLowerCase();

        if (
          search &&
          !(
            product.name.toLowerCase().includes(search) ||
            product.description?.toLowerCase().includes(search) ||
            product.category?.toLowerCase().includes(search)
          )
        )
          return false;

        if (filters.categories.length > 0) {
          const prodCat = product.category?.toLowerCase();
          const matched = filters.categories.some((cat) =>
            prodCat.includes(cat.toLowerCase())
          );
          if (!matched) return false;
        }

        if (
          product.price < filters.priceRange[0] ||
          product.price > filters.priceRange[1]
        )
          return false;

        if (filters.inStock && !product.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [products, searchQuery, filters, sortBy]);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success"></div>
        <p className="mt-3 text-muted">Loading products...</p>
      </div>
    );

  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Herbal Products</h2>
        <p className="text-muted">Experience the purity of Ayurveda</p>
      </div>

      <div className="row">
        <div className="col-md-3 mb-4">
          <button
            className="btn btn-outline-secondary btn-sm d-md-none mb-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filterCollapse"
            aria-expanded="false"
            aria-controls="filterCollapse"
          >
            <SlidersHorizontal size={16} className="me-1" />
            Filters
          </button>

          <div className="collapse d-md-block" id="filterCollapse">
            <div className="card card-body p-2 shadow-sm">
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="text-muted mb-0">
              {filteredProducts.length} products found
            </p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select form-select-sm"
              style={{ width: 200 }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <ProductGrid
            products={filteredProducts}
            onNavigate={onNavigate}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}
