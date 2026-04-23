"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Session {
  id: string;
  date: string;
  durationMinutes: number;
  completedAt: string;
  label?: string;
}

interface WeeklyChartProps {
  sessions: Session[];
}

export default function WeeklyChart({ sessions }: WeeklyChartProps) {
  const data = useMemo(() => {
    const result: { day: string; shortDay: string; sessions: number; isToday: boolean }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const count = sessions.filter((s) => s.date === dateStr).length;
      const isToday = i === 0;

      result.push({
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        shortDay: d.toLocaleDateString("en-US", { weekday: "narrow" }),
        sessions: count,
        isToday,
      });
    }
    return result;
  }, [sessions]);

  const maxSessions = Math.max(...data.map((d) => d.sessions), 1);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Last 7 Days</h2>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
              }}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              formatter={(value: number) => [`${value} session${value !== 1 ? "s" : ""}`, "Sessions"]}
            />
            <Bar dataKey="sessions" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isToday ? "#10b981" : "#e2e8f0"}
                  className={entry.isToday ? "" : "hover:fill-slate-300 transition-colors"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
