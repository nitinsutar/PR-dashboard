import clsx from "clsx";

export default function AlertBanner({ sentimentScore }: { sentimentScore: number }) {
  const severity = sentimentScore < -0.3 ? "red" : sentimentScore < 0 ? "amber" : "emerald" as const;
  const classes = {
    red: "bg-red-950/40 border-red-800/60",
    amber: "bg-amber-950/40 border-amber-800/60",
    emerald: "bg-emerald-950/40 border-emerald-800/60",
  } as const;
  const message = sentimentScore < -0.3 ? "Negative trend detected" : sentimentScore < 0 ? "Slight negative drift" : "Positive momentum";
  return (
    <div className={clsx("rounded-xl border p-3 mb-4", classes[severity])}>
      <div className="text-sm">{message}</div>
    </div>
  );
}
