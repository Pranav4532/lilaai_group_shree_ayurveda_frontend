import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Generic Chart Container (Bootstrap + Recharts)
 *
 * Props:
 * - type: "line" | "bar" | "pie"
 * - data: array of data objects
 * - dataKey: string for main value
 * - xKey: string for x-axis value
 * - colors: array of colors (optional)
 * - height: chart height (default 300)
 * - title: chart title (optional)
 */

export function ChartContainer({
  type = "line",
  data = [],
  dataKey = "value",
  xKey = "name",
  colors = ["#198754", "#0d6efd", "#ffc107", "#dc3545"],
  height = 300,
  title,
  className = "",
}) {
  return (
    <div className={`card shadow-sm mb-4 ${className}`}>
      {title && (
        <div className="card-header bg-white border-0 pb-0">
          <h5 className="fw-bold mb-0">{title}</h5>
        </div>
      )}

      <div className="card-body">
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            {type === "line" && (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={colors[0]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            )}

            {type === "bar" && (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey={xKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={dataKey} fill={colors[1]} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}

            {type === "pie" && (
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={data}
                  dataKey={dataKey}
                  nameKey={xKey}
                  outerRadius={100}
                  label
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
