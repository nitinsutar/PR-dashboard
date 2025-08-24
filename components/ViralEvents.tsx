export default function ViralEvents({ events }: { events: { ts: number; title: string; deltaPct: number }[] }) {
  if (!events?.length) return (
    <div className="text-sm text-zinc-400">No viral spikes in the last window.</div>
  );
  return (
    <ul className="space-y-2">
      {events.map((e, i) => (
        <li key={i} className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
          <div className="text-sm">{e.title}</div>
          <div className="text-xs text-zinc-400 mt-1">+{e.deltaPct}% • {new Date(e.ts).toLocaleTimeString()}</div>
        </li>
      ))}
    </ul>
  );
}
