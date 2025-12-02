import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * NavigationMenu Component (React + Bootstrap)
 *
 * Props:
 * - brand: string | ReactNode (Brand name or logo)
 * - links: array of navigation items, e.g.:
 *   [
 *     { label: "Home", href: "/" },
 *     {
 *       label: "Services",
 *       items: [
 *         { label: "Web Development", href: "/services/web" },
 *         { label: "Mobile Apps", href: "/services/mobile" },
 *       ]
 *     },
 *     { label: "Contact", href: "/contact" }
 *   ]
 * - fixed: "top" | "bottom" (optional)
 */

export function NavigationMenu({ brand = "MyApp", links = [], fixed }) {
  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed={fixed}
      className="border-bottom shadow-sm"
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand href="/">{brand}</Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* Nav Links */}
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {links.map((link, i) =>
              link.items ? (
                <NavDropdown title={link.label} id={`nav-dropdown-${i}`} key={i}>
                  {link.items.map((sub, j) =>
                    sub.divider ? (
                      <NavDropdown.Divider key={j} />
                    ) : (
                      <NavDropdown.Item
                        key={j}
                        href={sub.href}
                        onClick={sub.onClick}
                        disabled={sub.disabled}
                      >
                        {sub.label}
                      </NavDropdown.Item>
                    )
                  )}
                </NavDropdown>
              ) : (
                <Nav.Link
                  key={i}
                  href={link.href}
                  active={link.active}
                  disabled={link.disabled}
                >
                  {link.label}
                </Nav.Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
