import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap-based Checkbox Component
 *
 * Props:
 * - label: string (optional label text)
 * - checked: boolean (controlled)
 * - defaultChecked: boolean (uncontrolled)
 * - onChange: function(e) (callback)
 * - disabled: boolean
 * - id: optional custom id
 * - className: optional additional class
 */

export function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  className = "",
  ...props
}) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`form-check ${className}`}>
      <input
        type="checkbox"
        className="form-check-input"
        id={checkboxId}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {label && (
        <label className="form-check-label" htmlFor={checkboxId}>
          {label}
        </label>
      )}
    </div>
  );
}
