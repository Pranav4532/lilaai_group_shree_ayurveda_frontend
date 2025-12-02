import React, { useState, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * HoverCard (Bootstrap version)
 * 
 * Props:
 * - trigger: ReactNode (element that triggers the card)
 * - title: string | ReactNode (optional header)
 * - content: string | ReactNode (main hover content)
 * - placement: top | bottom | left | right
 * - delay: number (hover delay in ms)
 */

export function HoverCard({ trigger, title, content, placement = "top", delay = 200 }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  let timer;

  const handleMouseEnter = () => {
    timer = setTimeout(() => setShow(true), delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setShow(false);
  };

  return (
    <>
      <span
        ref={target}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer", display: "inline-block" }}
      >
        {trigger}
      </span>

      <Overlay target={target.current} show={show} placement={placement}>
        {(props) => (
          <Popover {...props} className="shadow border-0">
            {title && (
              <Popover.Header as="h6" className="fw-semibold bg-light border-bottom">
                {title}
              </Popover.Header>
            )}
            <Popover.Body>{content}</Popover.Body>
          </Popover>
        )}
      </Overlay>
    </>
  );
}
