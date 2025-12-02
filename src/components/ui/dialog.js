import React from "react";
import { Modal, Button } from "react-bootstrap";
import { X } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Dialog Component (Bootstrap version)
 * 
 * Props:
 * - show: boolean (controls open/close)
 * - onClose: function (called when closed)
 * - title: string
 * - description: string
 * - children: ReactNode (body content)
 * - footer: ReactNode (optional footer buttons)
 * - size: "sm" | "lg" | "xl" (optional)
 */

export function Dialog({
  show,
  onClose,
  title,
  description,
  children,
  footer,
  size = "lg",
}) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size={size}
      backdrop="static"
      className="rounded-3"
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="fw-semibold fs-5">{title}</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      </Modal.Header>

      {description && (
        <div className="px-4 text-muted small mb-2">{description}</div>
      )}

      <Modal.Body className="pt-0">{children}</Modal.Body>

      {footer && (
        <Modal.Footer className="border-0 pt-0">
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
}
