import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * AlertDialog (Bootstrap-based replacement for Radix UI AlertDialog)
 * Usage:
 * <AlertDialog
 *   title="Delete Product"
 *   message="Are you sure you want to delete this item?"
 *   confirmText="Yes, Delete"
 *   cancelText="Cancel"
 *   onConfirm={() => console.log("Deleted")}
 * />
 */
export default function AlertDialog({
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = () => {},
  triggerText = "Open Dialog",
}) {
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleOpen}
      >
        {triggerText}
      </button>

      {/* Modal */}
      {show && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={handleClose}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
          >
            <div className="modal-content shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-semibold">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body text-muted">{message}</div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirm}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
