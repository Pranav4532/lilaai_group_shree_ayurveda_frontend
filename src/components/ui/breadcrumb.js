import React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap-based Breadcrumb system
 *
 * Usage:
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/products">Products</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Ayurvedic Oils</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */

export function Breadcrumb({ children, className = "", ...props }) {
  return (
    <nav aria-label="breadcrumb" className={`mb-3 ${className}`} {...props}>
      {children}
    </nav>
  );
}

export function BreadcrumbList({ children, className = "", ...props }) {
  return (
    <ol className={`breadcrumb d-flex align-items-center flex-wrap ${className}`} {...props}>
      {children}
    </ol>
  );
}

export function BreadcrumbItem({ children, className = "", ...props }) {
  return (
    <li className={`breadcrumb-item d-flex align-items-center ${className}`} {...props}>
      {children}
    </li>
  );
}

export function BreadcrumbLink({ href, children, className = "", ...props }) {
  return (
    <a href={href} className={`text-decoration-none text-primary ${className}`} {...props}>
      {children}
    </a>
  );
}

export function BreadcrumbPage({ children, className = "", ...props }) {
  return (
    <span className={`fw-semibold text-dark ${className}`} aria-current="page" {...props}>
      {children}
    </span>
  );
}

export function BreadcrumbSeparator({ children, className = "", ...props }) {
  return (
    <li className={`d-flex align-items-center mx-2 ${className}`} {...props}>
      {children || <ChevronRight size={14} />}
    </li>
  );
}

export function BreadcrumbEllipsis({ className = "", ...props }) {
  return (
    <li className={`d-flex align-items-center ${className}`} {...props}>
      <MoreHorizontal size={16} />
      <span className="visually-hidden">More</span>
    </li>
  );
}
