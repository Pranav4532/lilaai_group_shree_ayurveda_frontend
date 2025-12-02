import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() - Utility to merge class names conditionally and safely.
 * It combines clsx() and tailwind-merge() for better control.
 *
 * Example:
 *   cn("p-2", isActive && "bg-blue-500", "text-white")
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
