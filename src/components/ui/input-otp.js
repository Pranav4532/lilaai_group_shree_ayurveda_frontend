import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * InputOTP Component (React + Bootstrap)
 *
 * Props:
 * - length: number of OTP digits
 * - onChange: function(value) => void
 * - value: current OTP value (optional, for controlled usage)
 * - disabled: boolean
 * - separator: string | ReactNode (optional between digits)
 * - size: "sm" | "lg" (Bootstrap size)
 */

export function InputOTP({
  length = 6,
  onChange,
  value = "",
  disabled = false,
  separator = "—",
  size,
}) {
  const inputsRef = useRef([]);
  const [internalValue, setInternalValue] = useState(value);

  const otpValue = value || internalValue;

  const handleChange = (index, newValue) => {
    const newOtp =
      otpValue.substring(0, index) + newValue.slice(-1) + otpValue.substring(index + 1);
    setInternalValue(newOtp);
    onChange?.(newOtp);

    if (newValue && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, length);
    setInternalValue(paste);
    onChange?.(paste);
    inputsRef.current[Math.min(paste.length, length - 1)]?.focus();
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center gap-2"
      onPaste={handlePaste}
    >
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <Form.Control
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={otpValue[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            className={`text-center fw-bold border-primary rounded ${
              size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : ""
            }`}
            style={{
              width: size === "lg" ? "3rem" : "2.5rem",
              height: size === "lg" ? "3rem" : "2.5rem",
              fontSize: size === "lg" ? "1.5rem" : "1.25rem",
            }}
          />
          {index < length - 1 && (
            <span className="text-muted small" style={{ userSelect: "none" }}>
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
