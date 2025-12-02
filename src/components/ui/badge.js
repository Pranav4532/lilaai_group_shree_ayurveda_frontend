import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap-based Badge component (no Radix, no Tailwind)
 *
 * Props:
 * - variant: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "outline"
 * - children: text or icon
 * - className: custom styles
 *
 * Example:
 * <Badge variant="success">In Stock</Badge>
 * <Badge variant="outline"><Heart /> Wishlist</Badge>
 */
export function Badge({ variant = "primary", children, className = "", ...props }) {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary text-white";
      case "success":
        return "bg-success text-white";
      case "danger":
      case "destructive":
        return "bg-danger text-white";
      case "warning":
        return "bg-warning text-dark";
      case "info":
        return "bg-info text-dark";
      case "outline":
        return "border border-secondary text-secondary bg-transparent";
      default:
        return "bg-primary text-white";
    }
  };

  return (
    <span
      className={`badge d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill ${getVariantClass()} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
