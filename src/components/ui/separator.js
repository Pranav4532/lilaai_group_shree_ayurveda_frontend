import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Separator Component (React + Bootstrap)
 *
 * Props:
 * - orientation: "horizontal" | "vertical" (default: "horizontal")
 * - thickness: number (default: 1)
 * - color: string (default: Bootstrap border color)
 * - className: string (optional)
 */

export function Separator({
  orientation = "horizontal",
  thickness = 1,
  color = "#dee2e6", // Bootstrap border-gray
  className = "",
}) {
  const isHorizontal = orientation === "horizontal";

  const styles = {
    backgroundColor: color,
    height: isHorizontal ? `${thickness}px` : "100%",
    width: isHorizontal ? "100%" : `${thickness}px`,
    flexShrink: 0,
  };

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`${
        isHorizontal ? "my-2 w-100" : "mx-2 h-100 align-self-stretch"
      } ${className}`}
      style={styles}
    />
  );
}
