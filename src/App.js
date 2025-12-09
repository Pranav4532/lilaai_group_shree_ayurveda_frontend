// src/App.js
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Toaster } from "sonner";
import ErrorBoundary from "./components/ErrorBoundary";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import ProductDetailPage from "./components/ProductDetailPage";
import CheckoutPage from "./components/CheckoutPage";
import ProfilePage from "./components/ProfilePage";
import OrdersPage from "./components/OrdersPage";
import ShoppingCart from "./components/ShoppingCart";
import LoginModal from "./components/LoginModal";
import AdminPage from "./components/admin/AdminPage";

import { getCurrentUser, logoutUser } from "./api/userService";
import { getCart } from "./api/cartService";

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("currentPage") || "home";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedUser = getCurrentUser();
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        handleLogout();
        return;
      }
    }

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    loadCartCount();
  }, [user]);

  const loadCartCount = async () => {
    if (!user) return setCartCount(0);

    try {
      const cart = await getCart(user.id);
      const items = Array.isArray(cart) ? cart : cart.items || [];
      setCartCount(items.reduce((sum, i) => sum + (i.quantity || 0), 0));
    } catch {
      setCartCount(0);
    }
  };

  const handleNavigate = useCallback((page, id = null) => {
    localStorage.setItem("currentPage", page);

    if (page.startsWith("admin")) {
      return setCurrentPage("admin");
    }

    if (page === "product-detail") {
      setSelectedProductId(id);
    }

    setCurrentPage(page);
    if (page !== "products") setSearchQuery("");
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setCartCount(0);
    localStorage.removeItem("currentPage");
  };

  const renderPage = () => {
    if (currentPage === "product-detail") {
      return (
        <ProductDetailPage
          productId={selectedProductId}
          onNavigate={handleNavigate}
        />
      );
    }

    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "products":
        return (
          <ProductsPage searchQuery={searchQuery} onNavigate={handleNavigate} />
        );
      case "checkout":
        return <CheckoutPage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "orders":
        return <OrdersPage onNavigate={handleNavigate} />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      case "admin":
      case "admin-dashboard":
        if (!user) {
          return null;
        }

        if (user.role !== "admin" && user.role !== "superadmin") {
          return (
            <h3 className="text-center text-danger py-5">Access Denied</h3>
          );
        }

        return <AdminPage />;

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {/* GLOBAL TOASTER */}
      <Toaster richColors position="top-center" />

      <ErrorBoundary>
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onCartOpen={() => setIsCartOpen(true)}
          onLoginOpen={() => setShowLogin(true)}
          user={user}
          onLogout={handleLogout}
          cartCount={cartCount}
        />

        <main className="flex-grow-1 w-100">
          <Suspense
            fallback={
              <div className="text-center p-5">
                <div className="spinner-border text-success"></div>
              </div>
            }
          >
            {renderPage()}
          </Suspense>
        </main>

        <Footer onNavigate={handleNavigate} />

        {/* CART DRAWER */}
        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => {
            setIsCartOpen(false);
            loadCartCount();
          }}
          onNavigate={handleNavigate}
        />

        {/* LOGIN MODAL */}
        <LoginModal
          show={showLogin}
          onClose={() => setShowLogin(false)}
          onNavigate={handleNavigate}
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            loadCartCount();
            setShowLogin(false);
          }}
        />
      </ErrorBoundary>
    </>
  );
}
