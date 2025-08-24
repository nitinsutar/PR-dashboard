"use client";
import { RadialBar, RadialBarChart, Tooltip } from "recharts";

export default function SentimentGauge({ score }: { score: number }) {
  const val = Math.round(((score + 1) / 2) * 100); // 0..100
  const data = [{ name: "sentiment", value: val, fill: "#4f46e5" }];
  return (
    <div className="flex flex-col items-center justify-center">
      <RadialBarChart width={220} height={220} cx={110} cy={110} innerRadius={80} outerRadius={100} data={data} startAngle={180} endAngle={0}>
        <RadialBar dataKey="value" cornerRadius={8} />
        <Tooltip />
      </RadialBarChart>
      <div className="-mt-20 text-4xl font-bold">{val}%</div>
      <div className="mt-1 text-xs text-zinc-400">overall sentiment</div>
    </div>
  );
}
