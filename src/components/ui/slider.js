import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap Slider Component
 * Props:
 * - min, max, step, value, defaultValue
 * - onChange (callback)
 * - label (optional)
 * - showValue (boolean)
 */

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  label,
  showValue = true,
  className = "",
  ...props
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || min);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const currentValue = value !== undefined ? value : internalValue;

  return (
    <div className={`d-flex flex-column gap-2 ${className}`}>
      {label && (
        <label className="form-label fw-medium">
          {label} {showValue && <span className="text-muted">({currentValue})</span>}
        </label>
      )}
      <input
        type="range"
        className="form-range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
