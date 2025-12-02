import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ChevronRight, Check } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * DropdownMenu Component (Bootstrap version)
 *
 * Props:
 * - title: string (button label)
 * - items: array of menu items: [{ label, onClick, disabled, divider, checked, submenu }]
 * - variant: button color (primary, secondary, etc.)
 * - size: "sm" | "lg" | undefined
 */

export function DropdownMenu({ title, items = [], variant = "secondary", size }) {
  return (
    <DropdownButton
      id="dropdown-menu"
      title={title}
      variant={variant}
      size={size}
      align="end"
      className="shadow-sm"
    >
      {items.map((item, index) => {
        if (item.divider) {
          return <Dropdown.Divider key={index} />;
        }

        if (item.submenu) {
          // Submenu support (nested dropdown)
          return (
            <Dropdown drop="end" key={index} className="dropdown-submenu position-relative">
              <Dropdown.Toggle
                variant="light"
                className="w-100 text-start d-flex justify-content-between align-items-center border-0 bg-transparent px-3 py-2"
              >
                {item.label}
                <ChevronRight size={16} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm border-0 mt-0">
                {item.submenu.map((sub, subIndex) => (
                  <Dropdown.Item
                    key={subIndex}
                    onClick={sub.onClick}
                    disabled={sub.disabled}
                    className="d-flex align-items-center gap-2"
                  >
                    {sub.checked && <Check size={14} />}
                    {sub.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          );
        }

        return (
          <Dropdown.Item
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            className="d-flex align-items-center gap-2"
          >
            {item.checked && <Check size={14} />}
            {item.label}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
}
