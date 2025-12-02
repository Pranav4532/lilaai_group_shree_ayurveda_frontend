import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Bootstrap-based Accordion (no Radix, no Tailwind)
 * Usage example:
 * <Accordion items={[{ title: "Question 1", content: "Answer 1" }, { title: "Question 2", content: "Answer 2" }]} />
 */

export default function Accordion({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion" id="customAccordion">
      {items.map((item, index) => (
        <div className="accordion-item border-0 mb-2 shadow-sm rounded" key={index}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button d-flex justify-content-between align-items-center ${
                activeIndex === index ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggleItem(index)}
              style={{ cursor: "pointer", background: "white" }}
            >
              <span className="fw-semibold">{item.title}</span>
              <ChevronDown
                className={`transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                size={18}
              />
            </button>
          </h2>

          <div
            className={`accordion-collapse collapse ${
              activeIndex === index ? "show" : ""
            }`}
          >
            <div className="accordion-body small text-muted">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
