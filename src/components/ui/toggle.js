import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap Toggle Button
 *
 * Props:
 * - variant: Bootstrap variant (e.g., "primary", "outline-secondary")
 * - size: "sm" | "lg" | "default"
 * - pressed: boolean (controlled)
 * - defaultPressed: boolean (uncontrolled)
 * - onToggle: callback(boolean)
 * - children: button content
 */

export function Toggle({
  variant = "outline-primary",
  size = "default",
  pressed,
  defaultPressed = false,
  onToggle,
  className = "",
  children,
  ...props
}) {
  const [isOn, setIsOn] = useState(defaultPressed);

  const active = pressed !== undefined ? pressed : isOn;

  const handleClick = () => {
    const newState = !active;
    setIsOn(newState);
    onToggle?.(newState);
  };

  const sizeClass =
    size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";

  return (
    <button
      type="button"
      className={`btn ${`btn-${variant}`} ${sizeClass} ${active ? "active" : ""} ${className}`}
      aria-pressed={active}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
