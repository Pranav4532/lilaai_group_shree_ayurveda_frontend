import React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Drawer Component (Bootstrap version)
 *
 * Props:
 * - show: boolean (controls open/close)
 * - onClose: function (close handler)
 * - title: string
 * - placement: "start" | "end" | "top" | "bottom"
 * - children: ReactNode
 * - footer: ReactNode (optional)
 * - description: string (optional)
 */

export function Drawer({
  show,
  onClose,
  title,
  description,
  placement = "end",
  children,
  footer,
}) {
  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement={placement}
      backdrop
      scroll={false}
      className="border-0 shadow-lg"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-semibold fs-5">{title}</Offcanvas.Title>
      </Offcanvas.Header>

      {description && (
        <div className="px-4 text-muted small mb-2">{description}</div>
      )}

      <Offcanvas.Body className="d-flex flex-column">
        <div className="flex-grow-1">{children}</div>

        {footer && (
          <div className="mt-3 border-top pt-3">{footer}</div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
