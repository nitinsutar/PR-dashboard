import { FeedPayload, Mention } from "@/lib/types";

export function analyzeMentions(mentions: Mention[]): FeedPayload {
  const totals = { positive: 0, neutral: 0, negative: 0 };
  const platformShare: any = { twitter: 0, instagram: 0, reddit: 0, youtube: 0, news: 0 };
  const trending = new Map<string, number>();

  for (const m of mentions) {
    totals[m.sentiment]++;
    platformShare[m.platform] = (platformShare[m.platform] || 0) + 1;
    // crude keyword split
    for (const w of m.text.toLowerCase().split(/[^a-z0-9#]+/).filter(Boolean)) {
      trending.set(w, (trending.get(w) || 0) + 1);
    }
  }

  const total = totals.positive + totals.neutral + totals.negative || 1;
  const sentimentScore = (totals.positive - totals.negative) / total;

  const sumShare = Object.values(platformShare).reduce((a: any, b: any) => a + b, 0) || 1;
  (Object.keys(platformShare) as (keyof typeof platformShare)[]).forEach((k) => {
    platformShare[k] = Number((platformShare[k] / sumShare).toFixed(3));
  });

  const trendingKeywords = Array.from(trending.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, cnt]) => ({ word, score: cnt }));

  const now = Date.now();
  const viralEvents = []; // reserved for Phase 3 anomaly detection

  return { ts: now, sentimentScore, totals, platformShare, trendingKeywords, mentions, viralEvents };
}
