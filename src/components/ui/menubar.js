import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Menubar Component (React + Bootstrap)
 *
 * Props:
 * - brand: string | ReactNode (Navbar brand name or logo)
 * - menus: array of menu objects like:
 *   [
 *     {
 *       title: "File",
 *       items: [
 *         { label: "New File", onClick: () => {} },
 *         { label: "Open...", onClick: () => {} },
 *         { divider: true },
 *         { label: "Exit", onClick: () => {} }
 *       ]
 *     }
 *   ]
 */

export function Menubar({ brand = "MyApp", menus = [] }) {
  return (
    <Navbar bg="light" expand="md" className="shadow-sm border rounded">
      <Container fluid>
        <Navbar.Brand href="#home" className="fw-semibold">
          {brand}
        </Navbar.Brand>

        <Nav className="me-auto">
          {menus.map((menu, idx) => (
            <NavDropdown title={menu.title} id={`menu-${idx}`} key={idx}>
              {menu.items.map((item, i) =>
                item.divider ? (
                  <NavDropdown.Divider key={i} />
                ) : item.submenu ? (
                  <NavDropdown drop="end" title={item.label} key={i}>
                    {item.submenu.map((sub, j) =>
                      sub.divider ? (
                        <NavDropdown.Divider key={j} />
                      ) : (
                        <NavDropdown.Item
                          key={j}
                          onClick={sub.onClick}
                          disabled={sub.disabled}
                          className={sub.variant === "danger" ? "text-danger" : ""}
                        >
                          {sub.label}
                        </NavDropdown.Item>
                      )
                    )}
                  </NavDropdown>
                ) : (
                  <NavDropdown.Item
                    key={i}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={item.variant === "danger" ? "text-danger" : ""}
                  >
                    {item.label}
                  </NavDropdown.Item>
                )
              )}
            </NavDropdown>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}
