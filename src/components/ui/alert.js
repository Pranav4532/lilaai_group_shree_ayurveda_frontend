import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

/**
 * Bootstrap-based Alert component (replaces ShadCN + Tailwind version)
 * Usage:
 * <Alert variant="success" title="Success!" description="Your order has been placed successfully." />
 */

export default function Alert({
  variant = "info",
  title,
  description,
  icon,
  className = "",
  ...props
}) {
  const getVariantClasses = (variant) => {
    switch (variant) {
      case "success":
        return "alert alert-success d-flex align-items-start gap-2";
      case "danger":
      case "error":
      case "destructive":
        return "alert alert-danger d-flex align-items-start gap-2";
      case "warning":
        return "alert alert-warning d-flex align-items-start gap-2";
      case "info":
      default:
        return "alert alert-info d-flex align-items-start gap-2";
    }
  };

  const renderIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case "success":
        return <CheckCircle className="text-success mt-1" size={20} />;
      case "danger":
      case "error":
      case "destructive":
        return <XCircle className="text-danger mt-1" size={20} />;
      case "warning":
        return <AlertTriangle className="text-warning mt-1" size={20} />;
      default:
        return <Info className="text-info mt-1" size={20} />;
    }
  };

  return (
    <div
      role="alert"
      className={`${getVariantClasses(variant)} shadow-sm ${className}`}
      {...props}
    >
      {renderIcon()}
      <div>
        {title && <div className="fw-semibold mb-1">{title}</div>}
        {description && <div className="small text-muted">{description}</div>}
      </div>
    </div>
  );
}
