import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap Tabs Component
 *
 * Usage:
 * <Tabs defaultActiveKey="home">
 *   <Tab eventKey="home" title="Home">Content</Tab>
 *   <Tab eventKey="profile" title="Profile">...</Tab>
 * </Tabs>
 */

export function Tabs({ defaultActiveKey, children, className = "" }) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  // Add activeKey prop to each Tab child
  const tabs = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      activeKey,
      onSelect: setActiveKey,
    })
  );

  return <div className={`tabs-wrapper ${className}`}>{tabs}</div>;
}

export function Tab({ eventKey, title, children, activeKey, onSelect }) {
  const isActive = activeKey === eventKey;

  return (
    <>
      {/* Tab Button */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${isActive ? "active" : ""}`}
            onClick={() => onSelect(eventKey)}
            type="button"
          >
            {title}
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      {isActive && <div className="tab-pane fade show active p-3 border rounded">{children}</div>}
    </>
  );
}
