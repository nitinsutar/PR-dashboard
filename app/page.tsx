"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import SentimentGauge from "@/components/SentimentGauge";
import SentimentTrend from "@/components/SentimentTrend";
import PlatformShare from "@/components/PlatformShare";
import KeywordCloud from "@/components/KeywordCloud";
import ViralEvents from "@/components/ViralEvents";
import StatCard from "@/components/StatCard";
import AlertBanner from "@/components/AlertBanner";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function Page() {
  const sp = useSearchParams();
  const celeb = sp.get("celebrity") || "Demo Star";
  const { data } = useSWR(`/api/feed?celebrity=${encodeURIComponent(celeb)}`, fetcher, { refreshInterval: 5000 });

  const positive = data?.totals?.positive ?? 0;
  const neutral = data?.totals?.neutral ?? 0;
  const negative = data?.totals?.negative ?? 0;

  return (
    <main>
      <AlertBanner sentimentScore={data?.sentimentScore ?? 0} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
          <SentimentGauge score={data?.sentimentScore ?? 0} />
        </div>
        <div className="lg:col-span-3 rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Live Sentiment Trend — {celeb}</h2>
            <div className="text-sm text-zinc-400">Celebrity: {data?.celebrity ?? "-"}</div>
          </div>
          <SentimentTrend nowScore={data?.sentimentScore ?? 0} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <StatCard title="Positive Mentions" value={positive} footer="last window" />
        <StatCard title="Neutral Mentions" value={neutral} footer="last window" />
        <StatCard title="Negative Mentions" value={negative} footer="last window" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
          <h3 className="text-sm text-zinc-400 mb-2">Platform Share</h3>
          {data?.platformShare && <PlatformShare share={data.platformShare} />}
        </div>
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
          <h3 className="text-sm text-zinc-400 mb-2">Trending Keywords</h3>
          <KeywordCloud items={data?.trendingKeywords ?? []} />
        </div>
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
          <h3 className="text-sm text-zinc-400 mb-2">Viral Events</h3>
          <ViralEvents events={data?.viralEvents ?? []} />
        </div>
      </div>

      <div className="mt-6 text-xs text-zinc-500">Phase 2 — X + Reddit live ingestion with Vercel Cron + KV.</div>
    </main>
  );
}
