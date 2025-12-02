import React, { useState, useRef } from "react";
import { Overlay, Popover as BSPopover, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Popover Component (React + Bootstrap)
 *
 * Props:
 * - title: string | ReactNode (optional)
 * - content: string | ReactNode (required)
 * - triggerText: string (button text)
 * - placement: top | right | bottom | left (default: 'bottom')
 * - buttonVariant: string (Bootstrap variant, default: 'secondary')
 */

export function Popover({
  title,
  content,
  triggerText = "Open Popover",
  placement = "bottom",
  buttonVariant = "secondary",
}) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className="d-inline-block">
      <Button
        variant={buttonVariant}
        ref={target}
        onClick={() => setShow(!show)}
        aria-expanded={show}
      >
        {triggerText}
      </Button>

      <Overlay
        target={target.current}
        show={show}
        placement={placement}
        rootClose
        onHide={() => setShow(false)}
      >
        <BSPopover id="popover-basic" className="shadow-sm">
          {title && <BSPopover.Header as="h5">{title}</BSPopover.Header>}
          <BSPopover.Body>{content}</BSPopover.Body>
        </BSPopover>
      </Overlay>
    </div>
  );
}
