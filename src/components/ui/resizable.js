import React, { useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * ResizablePanels Component (React + Bootstrap)
 *
 * A simple horizontal resizable layout using CSS and React state.
 * Works for splitting two panels (left/right) with a draggable handle.
 */

export function ResizablePanels() {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50); // initial 50%

  const startDragging = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const container = containerRef.current;
    const startWidth = leftWidth;

    const handleMouseMove = (event) => {
      const deltaX = event.clientX - startX;
      const newWidth =
        ((container.offsetWidth * startWidth) / 100 + deltaX) /
        container.offsetWidth;
      setLeftWidth(Math.min(80, Math.max(20, newWidth * 100))); // clamp between 20% and 80%
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className="d-flex border rounded overflow-hidden"
      style={{ height: "400px", width: "100%" }}
    >
      {/* Left Panel */}
      <div
        className="bg-light border-end p-3"
        style={{
          width: `${leftWidth}%`,
          overflow: "auto",
          transition: "width 0.05s linear",
        }}
      >
        <h5>Left Panel</h5>
        <p>This section can hold menus, navigation, or book categories.</p>
      </div>

      {/* Divider / Handle */}
      <div
        className="d-flex align-items-center justify-content-center bg-secondary text-white"
        style={{
          width: "8px",
          cursor: "col-resize",
          userSelect: "none",
        }}
        onMouseDown={startDragging}
      >
        <GripVertical size={16} />
      </div>

      {/* Right Panel */}
      <div className="bg-white flex-grow-1 p-3 overflow-auto">
        <h5>Right Panel</h5>
        <p>
          This area can contain your main content, book details, or user
          dashboard.
        </p>
      </div>
    </div>
  );
}
