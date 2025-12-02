import React, { useState } from "react";
import { ToggleGroup } from "./ToggleGroup";

export default function ToggleGroupDemo() {
  const [selected, setSelected] = useState("daily");
  const [selectedMultiple, setSelectedMultiple] = useState(["email"]);

  return (
    <div className="p-4">
      <h5>📅 Single Selection</h5>
      <ToggleGroup
        type="single"
        value={selected}
        onChange={setSelected}
        options={[
          { label: "Daily", value: "daily" },
          { label: "Weekly", value: "weekly" },
          { label: "Monthly", value: "monthly" },
        ]}
      />
      <p className="mt-2">Selected: {selected || "None"}</p>

      <h5 className="mt-4">📬 Multiple Selection</h5>
      <ToggleGroup
        type="multiple"
        value={selectedMultiple}
        onChange={setSelectedMultiple}
        options={[
          { label: "Email", value: "email" },
          { label: "SMS", value: "sms" },
          { label: "Push", value: "push" },
        ]}
      />
      <p className="mt-2">Selected: {selectedMultiple.join(", ") || "None"}</p>
    </div>
  );
}
