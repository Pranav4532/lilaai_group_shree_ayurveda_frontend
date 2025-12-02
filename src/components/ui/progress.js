import React from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Progress Component (React + Bootstrap)
 *
 * Props:
 * - value: number (required, 0–100)
 * - variant: string (Bootstrap color variant — e.g. "success", "info", "danger")
 * - striped: boolean (optional)
 * - animated: boolean (optional)
 * - label: boolean (optional, shows % value)
 * - className: string (optional)
 */

export function Progress({
  value = 0,
  variant = "primary",
  striped = false,
  animated = false,
  label = false,
  className = "",
}) {
  return (
    <div className={`my-2 ${className}`}>
      <ProgressBar
        now={value}
        label={label ? `${value}%` : ""}
        striped={striped}
        animated={animated}
        variant={variant}
        style={{ height: "8px", borderRadius: "5px" }}
      />
    </div>
  );
}
