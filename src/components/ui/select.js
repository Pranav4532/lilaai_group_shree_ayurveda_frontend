import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * SelectDropdown Component (React + Bootstrap)
 *
 * Props:
 * - label: optional label text
 * - options: array of { value, label }
 * - value: current selected value
 * - onChange: function(value)
 * - disabled: optional
 * - size: "sm" | "lg" | undefined
 */

export function SelectDropdown({
  label,
  options = [],
  value,
  onChange,
  disabled = false,
  size,
}) {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label fw-medium">
          {label}
        </label>
      )}

      <select
        className={`form-select ${size ? `form-select-${size}` : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Select an option...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
