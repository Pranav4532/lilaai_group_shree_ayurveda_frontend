import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

/**
 * Bootstrap Tooltip Component
 *
 * Props:
 * - text: tooltip content
 * - placement: top | bottom | left | right (default: top)
 * - children: the element that triggers the tooltip
 * - trigger: "hover focus" (default), "click", etc.
 */
export function Tooltip({ text, placement = "top", trigger = "hover focus", children }) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    const el = tooltipRef.current;
    if (!el) return;

    // Bootstrap Tooltip initialization
    const tooltip = new window.bootstrap.Tooltip(el, {
      title: text,
      placement,
      trigger,
    });

    // Cleanup on unmount
    return () => {
      tooltip.dispose();
    };
  }, [text, placement, trigger]);

  return React.cloneElement(children, {
    ref: tooltipRef,
    "data-bs-toggle": "tooltip",
  });
}
