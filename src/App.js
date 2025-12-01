// src/App.js
import React, { useState, useCallback, Suspense, useEffect } from "react";
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
import ShoppingCart from "./components/ShoppingCart";
import LoginModal from "./components/LoginModal";
import ProfilePage from "./components/ProfilePage";
import OrdersPage from "./components/OrdersPage";

import AdminPage from "./components/admin/AdminPage";

import { getCurrentUser, logoutUser } from "./api/userService";
import { getCart } from "./api/cartService";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) setUser(savedUser);
    loadCartCount();
  }, []);

  const loadCartCount = async () => {
    const existingUser = getCurrentUser();
    if (!existingUser) return setCartCount(0);

    try {
      const cart = await getCart(existingUser.id);
      const items = Array.isArray(cart) ? cart : cart.items || [];
      setCartCount(items.reduce((sum, i) => sum + (i.quantity || 0), 0));
    } catch {
      setCartCount(0);
    }
  };

  const handleNavigate = useCallback((page, id = null) => {

    // 🔐 Redirect admin navigation properly
    if (page.startsWith("admin")) {
      localStorage.setItem("admin-view", page);
      return setCurrentPage("admin");
    }

    setCurrentPage(page);

    if (page === "product-detail") {
      setSelectedProductId(id);
    }

    if (page !== "products") {
      setSearchQuery("");
    }
  }, []);

  const handleLogout = useCallback(() => {
    logoutUser();
    setUser(null);
    setCartCount(0);
    setCurrentPage("home");
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;

      case "products":
        return (
          <ProductsPage
            searchQuery={searchQuery}
            onNavigate={handleNavigate}
            loadCartCount={loadCartCount}
          />
        );

      case "product-detail":
        return <ProductDetailPage productId={selectedProductId} onNavigate={handleNavigate} />;

      case "checkout":
        return <CheckoutPage onNavigate={handleNavigate} />;

      case "about":
        return <AboutPage />;

      case "contact":
        return <ContactPage />;

      case "orders":
        return <OrdersPage onNavigate={handleNavigate} />;

      case "admin": {
        const loggedUser = getCurrentUser();

        if (!loggedUser) {
          return <h3 className="text-center text-danger py-5">Please Login as Admin</h3>;
        }

        if (loggedUser.role !== "admin" && loggedUser.role !== "superadmin") {
          return <h3 className="text-center text-danger py-5">Access Denied</h3>;
        }

        return <AdminPage />; // ⬅ FULL ADMIN PANEL
      }

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
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
          <Suspense fallback={<div className="text-center p-5"><div className="spinner-border text-success"></div></div>}>
            {renderPage()}
          </Suspense>
        </main>

        <Footer onNavigate={handleNavigate} />

        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => {
            setIsCartOpen(false);
            loadCartCount();
          }}
          onNavigate={handleNavigate}
          reloadCartCount={loadCartCount}
        />

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
