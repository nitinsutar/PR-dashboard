export type Mention = {
  id: string;
  platform: "twitter" | "instagram" | "reddit" | "youtube" | "news";
  text: string;
  sentiment: "positive" | "neutral" | "negative";
  timestamp: number; // ms
  author?: string;
  url?: string;
};

export type FeedPayload = {
  ts: number;
  sentimentScore: number; // -1..1
  totals: { positive: number; neutral: number; negative: number };
  platformShare: { [k in Mention["platform"]]: number };
  trendingKeywords: { word: string; score: number }[];
  mentions: Mention[];
  viralEvents: { ts: number; title: string; deltaPct: number }[];
};
