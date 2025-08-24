import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { normalizeReddit } from "@/lib/normalize";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const celebrity = url.searchParams.get("celebrity") || "Demo Star";

  // Try OAuth client-credentials first if provided; else fallback to public JSON.
  let json: any = null;
  try {
    if (process.env.REDDIT_CLIENT_ID && process.env.REDDIT_SECRET) {
      const basic = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`).toString("base64");
      const form = new URLSearchParams({ grant_type: "client_credentials" });
      const tok = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: form
      }).then(r => r.json());
      const auth = `Bearer ${tok.access_token}`;
      const u = new URL("https://oauth.reddit.com/search");
      u.searchParams.set("q", celebrity);
      u.searchParams.set("limit", "50");
      u.searchParams.set("sort", "new");
      json = await fetch(u, { headers: { Authorization: auth, "User-Agent": "pr-sentiment-dashboard/0.1 by vercel" } }).then(r => r.json());
    } else {
      const u = new URL("https://www.reddit.com/search.json");
      u.searchParams.set("q", celebrity);
      u.searchParams.set("limit", "50");
      u.searchParams.set("sort", "new");
      json = await fetch(u, { headers: { "User-Agent": "pr-sentiment-dashboard/0.1" } }).then(r => r.json());
    }
  } catch (e: any) {
    return NextResponse.json({ ok: false, reason: e?.message || String(e) }, { status: 500 });
  }

  const mentions = normalizeReddit(json, celebrity);
  const key = `mentions:${celebrity}`;
  if (mentions.length) {
    await kv.rpush(key, ...mentions.map(m => JSON.stringify(m)));
    await kv.ltrim(key, -500, -1);
  }
  return NextResponse.json({ ok: true, added: mentions.length });
}
