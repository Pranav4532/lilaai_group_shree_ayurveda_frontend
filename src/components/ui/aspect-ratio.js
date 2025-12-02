import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * A simple AspectRatio component (Bootstrap + CSS only)
 *
 * Example usage:
 * <AspectRatio ratio={16 / 9}>
 *   <img src="https://picsum.photos/800/450" alt="Example" />
 * </AspectRatio>
 */
export default function AspectRatio({ ratio = 16 / 9, children, className = "", style = {} }) {
  const containerStyle = {
    position: "relative",
    width: "100%",
    paddingTop: `${100 / ratio}%`, // sets the vertical space
    overflow: "hidden",
    ...style,
  };

  const contentStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
