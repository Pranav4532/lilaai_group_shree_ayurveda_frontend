import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap Table Components
 * Props:
 * - bordered, striped, hover, responsive, variant ("light" | "dark")
 */

export function Table({
  bordered = true,
  striped = true,
  hover = true,
  responsive = true,
  variant = "light",
  className = "",
  children,
  ...props
}) {
  const tableClass = [
    "table",
    bordered ? "table-bordered" : "",
    striped ? "table-striped" : "",
    hover ? "table-hover" : "",
    variant === "dark" ? "table-dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <table className={tableClass} {...props}>
      {children}
    </table>
  );

  return responsive ? (
    <div className="table-responsive">{content}</div>
  ) : (
    content
  );
}

// Subcomponents for semantic clarity and future extensibility
export function TableHeader({ children }) {
  return <thead className="table-light">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableFooter({ children }) {
  return <tfoot className="table-secondary">{children}</tfoot>;
}

export function TableRow({ children, active = false }) {
  return <tr className={active ? "table-active" : ""}>{children}</tr>;
}

export function TableHead({ children }) {
  return <th scope="col">{children}</th>;
}

export function TableCell({ children }) {
  return <td>{children}</td>;
}

export function TableCaption({ children }) {
  return <caption className="text-muted">{children}</caption>;
}
