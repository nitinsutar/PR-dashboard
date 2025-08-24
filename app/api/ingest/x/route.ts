import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { normalizeTweets } from "@/lib/normalize";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const celebrity = url.searchParams.get("celebrity") || "Demo Star";
  const bearer = process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN;
  if (!bearer) {
    return NextResponse.json({ ok: false, reason: "X_BEARER_TOKEN missing" }, { status: 400 });
  }

  const query = `${celebrity} -is:retweet lang:en`;
  const since_id = (await kv.get<string>(`x:since_id:${celebrity}`)) || undefined;

  const params = new URLSearchParams({
    query,
    max_results: "50",
    "tweet.fields": "created_at,lang,public_metrics",
    "expansions": "author_id",
    "user.fields": "username,name"
  });
  if (since_id) params.set("since_id", since_id);

  const resp = await fetch("https://api.twitter.com/2/tweets/search/recent?" + params.toString(), {
    headers: { Authorization: `Bearer ${bearer}` }
  });

  if (!resp.ok) {
    const txt = await resp.text();
    return NextResponse.json({ ok: false, status: resp.status, body: txt }, { status: resp.status });
  }

  const data = await resp.json();
  const mentions = normalizeTweets(data, celebrity);
  // append to KV list (cap length)
  const key = `mentions:${celebrity}`;
  if (mentions.length) {
    await kv.rpush(key, ...mentions.map(m => JSON.stringify(m)));
    await kv.ltrim(key, -500, -1); // keep last 500
  }
  // update since_id
  const newest = data?.meta?.newest_id;
  if (newest) await kv.set(`x:since_id:${celebrity}`, newest);

  return NextResponse.json({ ok: true, added: mentions.length });
}
