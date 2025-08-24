"use client";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function PlatformShare({ share }: { share: Record<string, number> }) {
  const data = Object.entries(share).map(([name, value]) => ({ name, value }));
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
