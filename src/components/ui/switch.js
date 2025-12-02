import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap Switch Component
 * Props:
 * - checked (boolean)
 * - onChange (function)
 * - label (string)
 * - disabled (boolean)
 * - size ("sm" | "lg")
 */

export function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  size = "",
  className = "",
  ...props
}) {
  const id = React.useId();

  return (
    <div className={`form-check form-switch ${size === "lg" ? "fs-5" : ""} ${className}`}>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={id}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        {...props}
      />
      {label && (
        <label className="form-check-label ms-1" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}
