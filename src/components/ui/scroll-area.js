import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * ScrollArea Component (React + Bootstrap)
 *
 * A simple, reusable scroll container with custom Bootstrap styling.
 *
 * Props:
 * - height: string (CSS height, e.g. "300px", "50vh")
 * - width: string (CSS width, optional)
 * - className: string (optional)
 * - children: ReactNode
 */

export function ScrollArea({ height = "300px", width = "100%", className = "", children }) {
  return (
    <div
      className={`border rounded bg-light position-relative ${className}`}
      style={{
        height,
        width,
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "thin",
        scrollbarColor: "#6c757d #e9ecef",
      }}
    >
      <div className="p-3">{children}</div>

      {/* Optional custom scrollbar styling for WebKit */}
      <style>
        {`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #e9ecef;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #6c757d;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background-color: #495057;
          }
        `}
      </style>
    </div>
  );
}
