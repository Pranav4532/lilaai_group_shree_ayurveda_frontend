import React from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Input Component (React + Bootstrap)
 *
 * Props:
 * - type: "text" | "email" | "password" | "file" | etc.
 * - placeholder: string
 * - disabled: boolean
 * - isInvalid: boolean (show red border)
 * - size: "sm" | "lg"
 * - className: extra Bootstrap/utility classes
 */

export function Input({
  type = "text",
  placeholder = "",
  disabled = false,
  isInvalid = false,
  size,
  className = "",
  ...props
}) {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      isInvalid={isInvalid}
      size={size}
      className={`border border-secondary-subtle rounded-2 shadow-none focus:border-primary focus:ring-0 ${className}`}
      {...props}
    />
  );
}
