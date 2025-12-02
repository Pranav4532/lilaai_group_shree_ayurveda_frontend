import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap-based Card components for React
 * -----------------------------------------
 * Usage:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Product Title</CardTitle>
 *     <CardDescription>Short description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card body content...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Buy Now</Button>
 *   </CardFooter>
 * </Card>
 */

export function Card({ className = "", children, ...props }) {
  return (
    <div className={`card shadow-sm border rounded-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`card-header bg-white border-0 pb-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }) {
  return (
    <h5 className={`card-title fw-bold mb-1 ${className}`} {...props}>
      {children}
    </h5>
  );
}

export function CardDescription({ className = "", children, ...props }) {
  return (
    <p className={`text-muted small mb-2 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`card-body pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = "", children, ...props }) {
  return (
    <div className={`card-footer bg-white border-0 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardAction({ className = "", children, ...props }) {
  return (
    <div className={`d-flex justify-content-end ${className}`} {...props}>
      {children}
    </div>
  );
}
