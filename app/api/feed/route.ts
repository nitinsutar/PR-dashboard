import { NextResponse } from "next/server";
import { z } from "zod";
import { kv } from "@vercel/kv";
import { analyzeMentions } from "@/lib/sentiment";
import { Mention } from "@/lib/types";
import { generateMockFeed } from "@/lib/mock";

export const dynamic = "force-dynamic";

const QuerySchema = z.object({ celebrity: z.string().default("Demo Star") });

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = QuerySchema.parse({ celebrity: url.searchParams.get("celebrity") || undefined });
  const key = `mentions:${q.celebrity}`;
  const raw = await kv.lrange<string>(key, -200, -1);

  if (!raw || raw.length === 0) {
    const payload = generateMockFeed();
    return NextResponse.json({ celebrity: q.celebrity, ...payload });
  }

  const mentions: Mention[] = raw.map((s) => JSON.parse(s));
  const payload = analyzeMentions(mentions);
  return NextResponse.json({ celebrity: q.celebrity, ...payload });
}
