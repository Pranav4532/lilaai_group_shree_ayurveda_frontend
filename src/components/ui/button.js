import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Button Component (React + Bootstrap)
 *
 * Props:
 * - variant: "primary" | "secondary" | "success" | "danger" | "outline" | "link" | "ghost"
 * - size: "sm" | "md" | "lg" | "icon"
 * - disabled: boolean
 * - onClick: function
 * - className: string
 * - children: content inside the button
 */

export const Button = React.forwardRef(
  ({ variant = "primary", size = "md", disabled = false, className = "", children, onClick, type = "button", ...props }, ref) => {
    // Map size to Bootstrap classes
    const sizeClass =
      size === "sm"
        ? "btn-sm py-1 px-3"
        : size === "lg"
        ? "btn-lg py-2 px-4"
        : size === "icon"
        ? "d-flex align-items-center justify-content-center rounded-circle p-2"
        : "py-2 px-4";

    // Map variant to Bootstrap styles
    const variantClass = (() => {
      switch (variant) {
        case "secondary":
          return "btn btn-secondary text-white";
        case "success":
          return "btn btn-success text-white";
        case "danger":
        case "destructive":
          return "btn btn-danger text-white";
        case "outline":
          return "btn btn-outline-secondary";
        case "ghost":
          return "btn btn-light border-0";
        case "link":
          return "btn btn-link text-decoration-none";
        default:
          return "btn btn-primary text-white";
      }
    })();

    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        className={`${variantClass} ${sizeClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
