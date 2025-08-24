import { ReactNode } from "react";

export default function StatCard({ title, value, footer, icon }: { title: string; value: ReactNode; footer?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-zinc-400">{title}</h3>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {footer && <div className="mt-1 text-xs text-zinc-500">{footer}</div>}
    </div>
  );
}
