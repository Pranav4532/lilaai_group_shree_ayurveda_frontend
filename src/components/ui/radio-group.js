import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * RadioGroup Component (React + Bootstrap)
 *
 * Props:
 * - name: string (required) – shared group name for radio buttons
 * - options: array of { value, label } – radio options
 * - selectedValue: string – current selected value
 * - onChange: function(value) – callback when selection changes
 * - inline: boolean (optional) – show radios inline
 * - disabled: boolean (optional)
 */

export function RadioGroup({
  name,
  options = [],
  selectedValue,
  onChange,
  inline = false,
  disabled = false,
}) {
  return (
    <div className="mb-3">
      {options.map((option) => (
        <div
          key={option.value}
          className={`form-check ${inline ? "form-check-inline" : ""}`}
        >
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
          />
          <label
            className="form-check-label"
            htmlFor={`${name}-${option.value}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
