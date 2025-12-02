import React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { X } from "lucide-react";

/**
 * Sheet Component (React + Bootstrap)
 *
 * Props:
 * - show: boolean → controls open/close
 * - onHide: function → closes the sheet
 * - side: "left" | "right" | "top" | "bottom" (default: "right")
 * - title: optional string for header
 * - children: content of the sheet
 */

export function Sheet({ show, onHide, side = "right", title, children }) {
  const placementMap = {
    left: "start",
    right: "end",
    top: "top",
    bottom: "bottom",
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement={placementMap[side]}
      backdrop
      scroll={false}
      className="shadow-lg"
    >
      <Offcanvas.Header closeButton>
        {title && <Offcanvas.Title>{title}</Offcanvas.Title>}
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}

/**
 * SheetTrigger - Simple button to open the Sheet
 */
export function SheetTrigger({ onClick, label = "Open Drawer" }) {
  return (
    <Button variant="primary" onClick={onClick}>
      {label}
    </Button>
  );
}

/**
 * SheetClose - Reusable close button (can be used inside the Sheet body)
 */
export function SheetClose({ onClick }) {
  return (
    <Button
      variant="outline-secondary"
      onClick={onClick}
      className="d-flex align-items-center gap-1"
    >
      <X size={16} /> Close
    </Button>
  );
}
