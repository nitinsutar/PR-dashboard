import { Mention } from "@/lib/types";

export function normalizeTweets(payload: any, celebrity: string): Mention[] {
  const users = new Map<string, any>();
  (payload?.includes?.users || []).forEach((u: any) => users.set(u.id, u));
  const tweets = payload?.data || [];
  const out: Mention[] = tweets.map((t: any) => {
    const u = users.get(t.author_id) || {};
    return {
      id: `x_${t.id}`,
      platform: "twitter",
      text: t.text || "",
      sentiment: naiveSentiment(t.text || ""),
      timestamp: new Date(t.created_at || Date.now()).getTime(),
      author: u.username ? `@${u.username}` : undefined,
      url: `https://twitter.com/${u.username || "i"}/status/${t.id}`
    };
  });
  return out;
}

export function normalizeReddit(json: any, celebrity: string): Mention[] {
  const children = json?.data?.children || json?.data?.children?.data ? json.data.children : json?.data?.children || [];
  const items = Array.isArray(children) ? children : [];
  const out: Mention[] = items.map((c: any) => {
    const d = c?.data || c;
    const text = d.title || d.selftext || "";
    return {
      id: `r_${d.id}`,
      platform: "reddit",
      text,
      sentiment: naiveSentiment(text),
      timestamp: (d.created_utc ? d.created_utc * 1000 : Date.now()),
      author: d.author ? `u/${d.author}` : undefined,
      url: d.permalink ? `https://reddit.com${d.permalink}` : undefined
    };
  });
  return out;
}

// extremely simple lexicon-based sentiment placeholder
export function naiveSentiment(text: string): "positive" | "neutral" | "negative" {
  const t = text.toLowerCase();
  const pos = ["good","great","amazing","love","best","wow","win","excellent","nice","fire","lit","iconic"];
  const neg = ["bad","terrible","hate","worst","awful","mid","flop","cringe","lame","angry"];
  let score = 0;
  pos.forEach(w => { if (t.includes(w)) score++; });
  neg.forEach(w => { if (t.includes(w)) score--; });
  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
}
