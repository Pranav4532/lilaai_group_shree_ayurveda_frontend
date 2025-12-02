import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Collapsible Component (React + Bootstrap)
 *
 * Props:
 * - title: heading shown on the toggle button
 * - children: content inside the collapsible area
 * - defaultOpen: boolean (initial state)
 * - className: optional extra styling classes
 */

export function Collapsible({ title = "Toggle", children, defaultOpen = false, className = "" }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border rounded shadow-sm mb-3 ${className}`}>
      <button
        className="btn btn-light w-100 text-start fw-semibold d-flex justify-content-between align-items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <span
          className={`ms-2 transition-transform ${isOpen ? "rotate-90" : ""}`}
          style={{
            display: "inline-block",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▶
        </span>
      </button>

      <div
        className={`collapse ${isOpen ? "show" : ""}`}
        style={{
          transition: "all 0.35s ease",
        }}
      >
        <div className="p-3 bg-light border-top">{children}</div>
      </div>
    </div>
  );
}
