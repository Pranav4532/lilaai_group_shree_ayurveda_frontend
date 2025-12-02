import React, { createContext, useContext, useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap Sidebar System (All-in-One)
 * Includes:
 * - SidebarProvider (context)
 * - useSidebar (hook)
 * - Sidebar (component)
 * - SidebarTrigger (mobile button)
 */

// ------------------- CONTEXT PROVIDER -------------------

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle for desktop
  const toggleSidebar = () => setOpen((prev) => !prev);

  // Toggle for mobile
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  // Keyboard shortcut: Ctrl + B
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <SidebarContext.Provider
      value={{ open, toggleSidebar, mobileOpen, toggleMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// ------------------- SIDEBAR COMPONENT -------------------

export function Sidebar({ side = "left", width = "240px", children }) {
  const { open, toggleSidebar, mobileOpen, toggleMobile } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`d-none d-md-flex flex-column bg-light border-end ${
          open ? "p-3" : "p-2"
        }`}
        style={{
          width: open ? width : "60px",
          transition: "width 0.3s ease",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <Button
          variant="outline-secondary"
          size="sm"
          className="mb-3"
          onClick={toggleSidebar}
        >
          {open ? "Collapse" : "Expand"}
        </Button>
        <div className="flex-grow-1 overflow-auto">{children}</div>
      </div>

      {/* Mobile Offcanvas Sidebar */}
      <Offcanvas
        show={mobileOpen}
        onHide={toggleMobile}
        placement={side === "right" ? "end" : "start"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

// ------------------- TRIGGER BUTTON -------------------

export function SidebarTrigger() {
  const { toggleMobile } = useSidebar();
  return (
    <Button variant="primary" onClick={toggleMobile} className="d-md-none">
      ☰
    </Button>
  );
}
