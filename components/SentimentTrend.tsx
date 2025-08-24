"use client";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function SentimentTrend({ nowScore }: { nowScore: number }) {
  const [data, setData] = useState<{ t: number; s: number }[]>([]);

  useEffect(() => {
    setData((d) => [...d.slice(-59), { t: Date.now(), s: nowScore }]);
  }, [nowScore]);

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="t" tickFormatter={(t) => new Date(t as number).toLocaleTimeString()} stroke="#71717a" fontSize={12} />
          <YAxis domain={[-1, 1]} stroke="#71717a" fontSize={12} />
          <Tooltip labelFormatter={(t) => new Date(Number(t)).toLocaleTimeString()} />
          <Area type="monotone" dataKey="s" stroke="#4f46e5" fill="url(#g)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
