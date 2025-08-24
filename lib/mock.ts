import { FeedPayload, Mention } from "@/lib/types";

const words = [
  "red carpet", "oscar", "mvp", "transfer", "trade", "drama", "apology",
  "interview", "fashion", "coach", "injury", "viral", "award", "blockbuster",
  "box office", "trailer", "hat-trick", "comeback"
];

const sample = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const platforms: Mention["platform"][] = ["twitter", "instagram", "reddit", "youtube", "news"];
const sentiments: Mention["sentiment"][] = ["positive", "neutral", "negative"];

let lastTotals = { positive: 120, neutral: 80, negative: 40 };

export function generateMockFeed(): FeedPayload {
  // drift totals slightly
  lastTotals = {
    positive: Math.max(0, lastTotals.positive + Math.floor(Math.random() * 11 - 5)),
    neutral: Math.max(0, lastTotals.neutral + Math.floor(Math.random() * 11 - 5)),
    negative: Math.max(0, lastTotals.negative + Math.floor(Math.random() * 11 - 5))
  };
  const total = lastTotals.positive + lastTotals.neutral + lastTotals.negative || 1;
  const sentimentScore = (lastTotals.positive - lastTotals.negative) / total; // -1..1

  const platformShare = {
    twitter: Math.random(),
    instagram: Math.random(),
    reddit: Math.random(),
    youtube: Math.random(),
    news: Math.random()
  } as FeedPayload["platformShare"];
  const sum = Object.values(platformShare).reduce((a, b) => a + b, 0);
  (Object.keys(platformShare) as (keyof typeof platformShare)[]).forEach((k) => {
    platformShare[k] = Number((platformShare[k] / sum).toFixed(3));
  });

  const trendingKeywords = words
    .sort(() => 0.5 - Math.random())
    .slice(0, 10)
    .map((w, i) => ({ word: w, score: 1 - i * 0.07 + Math.random() * 0.1 }));

  const now = Date.now();
  const mentions: Mention[] = Array.from({ length: 12 }).map((_, i) => ({
    id: `${now}-${i}`,
    platform: sample(platforms),
    sentiment: sample(sentiments),
    text: `Random ${sample(words)} mention #${i + 1}`,
    timestamp: now - Math.floor(Math.random() * 1000 * 60 * 60),
    author: ["@fan123", "@critic", "@analyst", "@fashionmag"][Math.floor(Math.random() * 4)],
    url: "#"
  }));

  const viralEvents = Math.random() > 0.6
    ? [{ ts: now - Math.floor(Math.random() * 1000 * 60 * 30), title: "Spike detected", deltaPct: Math.floor(Math.random() * 500) + 100 }]
    : [];

  return { ts: now, sentimentScore, totals: lastTotals, platformShare, trendingKeywords, mentions, viralEvents };
}
