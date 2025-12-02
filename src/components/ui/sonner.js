import React, { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Toaster Component for React + Bootstrap
 * Usage:
 *   const { addToast } = useToaster();
 *   addToast("Message", "success");
 */

const ToasterContext = React.createContext();

export function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, variant = "primary", delay = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => removeToast(id), delay);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            onClose={() => removeToast(toast.id)}
            bg={toast.variant}
            show
            delay={3000}
            autohide
          >
            <Toast.Body className="text-white fw-medium">
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  const context = React.useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within ToasterProvider");
  }
  return context;
}
