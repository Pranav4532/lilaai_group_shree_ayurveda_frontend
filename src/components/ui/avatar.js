import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Avatar Component (Plain React + Bootstrap)
 * Usage:
 *  <Avatar src="/user.jpg" alt="User" fallback="AB" size="lg" />
 */

export function Avatar({ src, alt = "User avatar", fallback = "?", size = "md", className = "" }) {
  const [hasError, setHasError] = useState(false);

  const getSize = () => {
    switch (size) {
      case "sm":
        return "40px";
      case "lg":
        return "80px";
      case "xl":
        return "120px";
      default:
        return "60px";
    }
  };

  const avatarStyle = {
    width: getSize(),
    height: getSize(),
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    fontWeight: 600,
    fontSize: "1rem",
    color: "#555",
    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
  };

  return (
    <div className={`position-relative ${className}`} style={avatarStyle}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
