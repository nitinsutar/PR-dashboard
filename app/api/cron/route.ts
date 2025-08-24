import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const auth = new Headers(req.headers).get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET || ""}`;
  if (process.env.CRON_SECRET && auth !== expected) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  // call child ingestors sequentially to avoid rate limits
  const origin = new URL(req.url).origin;
  const celeb = process.env.DEFAULT_CELEBRITY || "Demo Star";
  const paths = [
    `/api/ingest/x?celebrity=${encodeURIComponent(celeb)}`,
    `/api/ingest/reddit?celebrity=${encodeURIComponent(celeb)}`
  ];
  const results: any[] = [];
  for (const p of paths) {
    try {
      const r = await fetch(origin + p, { method: "POST", headers: { authorization: auth || "" } });
      results.push({ path: p, status: r.status, body: await r.text() });
    } catch (e: any) {
      results.push({ path: p, error: e?.message || String(e) });
    }
  }
  return NextResponse.json({ ok: true, results, at: Date.now() });
}
