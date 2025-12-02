import React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/dist/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Calendar component (React + Bootstrap)
 *
 * Props:
 * - mode: "single" | "range"
 * - selected: date or { from, to }
 * - onSelect: (date) => void
 * - showOutsideDays: boolean (default true)
 */

export function Calendar({
  className = "",
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  ...props
}) {
  return (
    <div className={`p-3 bg-white rounded border shadow-sm ${className}`}>
      <DayPicker
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        showOutsideDays={showOutsideDays}
        className="w-100"
        classNames={{
          months: "d-flex flex-column flex-sm-row gap-3 justify-content-center",
          month: "d-flex flex-column gap-3 text-center",
          caption:
            "d-flex align-items-center justify-content-between px-3 position-relative fw-semibold",
          caption_label: "small fw-semibold",
          nav: "d-flex align-items-center gap-2 position-absolute end-0 top-0 px-3",
          nav_button:
            "btn btn-outline-secondary btn-sm rounded-circle p-1 opacity-75 hover-opacity-100",
          table: "table table-borderless mb-0 text-center",
          head_row: "",
          head_cell: "text-muted fw-normal small py-1",
          row: "",
          cell: "p-0",
          day: "btn btn-light btn-sm rounded-circle w-100 border-0 fw-normal",
          day_selected:
            "btn btn-success text-white fw-semibold rounded-circle w-100 border-0",
          day_today:
            "btn btn-warning text-dark fw-bold border-0 rounded-circle w-100",
          day_outside: "text-muted opacity-50",
          day_disabled: "opacity-25 text-muted",
        }}
        components={{
          IconLeft: () => <ChevronLeft size={18} />,
          IconRight: () => <ChevronRight size={18} />,
        }}
        {...props}
      />
    </div>
  );
}
