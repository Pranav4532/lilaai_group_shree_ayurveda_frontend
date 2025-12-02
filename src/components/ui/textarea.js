import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap Textarea Component
 *
 * Props:
 * - label: optional string for a label
 * - rows: number of visible rows (default: 3)
 * - value, onChange: for controlled input
 * - placeholder, disabled, required
 * - feedback: optional validation/error message
 */

export function Textarea({
  label,
  value,
  onChange,
  placeholder = "Enter text...",
  rows = 3,
  className = "",
  disabled = false,
  required = false,
  feedback = "",
  ...props
}) {
  const id = React.useId();

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label fw-semibold">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <textarea
        id={id}
        className="form-control"
        rows={rows}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...props}
      />

      {feedback && <div className="form-text text-danger">{feedback}</div>}
    </div>
  );
}
