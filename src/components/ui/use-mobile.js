import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile() - Detects if the current screen width is below MOBILE_BREAKPOINT.
 * Returns `true` on mobile devices (below 768px), otherwise `false`.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler for changes in screen size
    const onChange = (e) => {
      setIsMobile(e.matches);
    };

    // Initial check
    setIsMobile(mql.matches);

    // Listen for resize changes
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
