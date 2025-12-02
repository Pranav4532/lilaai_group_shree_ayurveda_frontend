import React from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Label Component (React + Bootstrap)
 *
 * Props:
 * - htmlFor: ID of the input it labels
 * - children: label text or ReactNode
 * - className: extra Bootstrap/utility classes
 * - disabled: makes label appear dimmed (optional)
 */

export function Label({ htmlFor, children, className = "", disabled = false, ...props }) {
  return (
    <Form.Label
      htmlFor={htmlFor}
      className={`fw-medium text-body-secondary ${disabled ? "opacity-50" : ""} ${className}`}
      {...props}
    >
      {children}
    </Form.Label>
  );
}
