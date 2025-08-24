import { NextResponse } from "next/server";
import { z } from "zod";
import { generateMockFeed } from "@/lib/mock";

export const dynamic = "force-dynamic"; // ensure not cached on Vercel

const QuerySchema = z.object({ celebrity: z.string().default("Demo Star") });

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = QuerySchema.parse({ celebrity: url.searchParams.get("celebrity") || undefined });
  const payload = generateMockFeed();
  return NextResponse.json({ celebrity: q.celebrity, ...payload });
}
