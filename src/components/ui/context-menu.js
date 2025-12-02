import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * ContextMenu (React + Bootstrap)
 *
 * Props:
 * - items: [{ label, onClick, divider?: boolean, disabled?: boolean, shortcut?: string }]
 * - children: element that triggers the right-click menu
 */

export function ContextMenu({ items = [], children }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  // Handle right-click event
  const handleContextMenu = (event) => {
    event.preventDefault();
    setMenuVisible(true);
    setMenuPosition({ x: event.pageX, y: event.pageY });
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", () => setMenuVisible(false));

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", () => setMenuVisible(false));
    };
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }} onContextMenu={handleContextMenu}>
      {children}

      {menuVisible && (
        <ul
          ref={menuRef}
          className="dropdown-menu show shadow-sm border-0"
          style={{
            position: "absolute",
            top: menuPosition.y,
            left: menuPosition.x,
            minWidth: "180px",
            zIndex: 1050,
          }}
        >
          {items.map((item, index) =>
            item.divider ? (
              <li key={index}>
                <hr className="dropdown-divider" />
              </li>
            ) : (
              <li key={index}>
                <button
                  className={`dropdown-item d-flex justify-content-between align-items-center ${
                    item.disabled ? "disabled text-muted" : ""
                  }`}
                  onClick={() => {
                    if (!item.disabled && item.onClick) item.onClick();
                    setMenuVisible(false);
                  }}
                >
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <small className="text-muted">{item.shortcut}</small>
                  )}
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
