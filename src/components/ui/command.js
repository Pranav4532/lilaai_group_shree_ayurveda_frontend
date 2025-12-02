import React, { useState, useMemo } from "react";
import { Modal, Form } from "react-bootstrap";
import { Search } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Command Palette (Bootstrap version)
 * 
 * Props:
 * - items: array of { name: string, icon?: ReactNode, action?: Function, shortcut?: string }
 * - open: boolean (controlled)
 * - onClose: function
 * - placeholder: string (default: "Search commands...")
 * - title: string (default: "Command Palette")
 */

export function CommandPalette({
  items = [],
  open,
  onClose,
  title = "Command Palette",
  placeholder = "Search commands...",
}) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  const handleSelect = (item) => {
    if (item.action) item.action();
    onClose();
  };

  return (
    <Modal
      show={open}
      onHide={onClose}
      centered
      dialogClassName="modal-dialog-centered"
      contentClassName="border-0 shadow-lg rounded-3"
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-5">{title}</Modal.Title>
        <button
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </Modal.Header>

      <Modal.Body className="pt-2">
        {/* Search Input */}
        <div className="input-group mb-3">
          <span className="input-group-text bg-white border-end-0">
            <Search className="text-muted" size={18} />
          </span>
          <Form.Control
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-start-0 shadow-none"
            autoFocus
          />
        </div>

        {/* Command List */}
        {filteredItems.length === 0 ? (
          <p className="text-muted text-center py-3 small">
            No matching commands found.
          </p>
        ) : (
          <ul className="list-group list-group-flush">
            {filteredItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="list-group-item list-group-item-action d-flex align-items-center justify-content-between px-3 py-2"
                role="button"
              >
                <div className="d-flex align-items-center gap-2">
                  {item.icon && (
                    <span className="text-primary">{item.icon}</span>
                  )}
                  <span>{item.name}</span>
                </div>
                {item.shortcut && (
                  <small className="text-muted">{item.shortcut}</small>
                )}
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
    </Modal>
  );
}
