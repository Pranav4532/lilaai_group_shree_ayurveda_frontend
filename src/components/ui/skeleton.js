import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Simple Bootstrap Skeleton Loader
 *
 * Props:
 * - width: CSS width (default: "100%")
 * - height: CSS height (default: "1rem")
 * - className: additional classes (optional)
 */

export function Skeleton({ width = "100%", height = "1rem", className = "", style = {}, ...props }) {
  return (
    <div
      className={`placeholder-wave bg-secondary bg-opacity-25 rounded ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    >
      <span className="placeholder col-12" />
    </div>
  );
}
