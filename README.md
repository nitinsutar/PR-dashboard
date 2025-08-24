# PR Sentiment Dashboard — Phase 2 (X + Reddit + KV + Cron)

This version adds live ingestion from X (Twitter) and Reddit, stores mentions in Vercel KV, and schedules ingestion via Vercel Cron (every 2 minutes).

## Setup on Vercel
1. Add Vercel KV integration (Upstash).
2. Set env vars: NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CRON_SECRET, DEFAULT_CELEBRITY, X_BEARER_TOKEN, (optional) REDDIT_CLIENT_ID/REDDIT_SECRET.
3. Cron job is defined in vercel.json. If you set CRON_SECRET, add Authorization header: `Bearer <CRON_SECRET>`.

## Local Dev
```bash
npm i
npm run dev
```

## Endpoints
- POST /api/ingest/x
- POST /api/ingest/reddit
- GET /api/cron
- GET /api/feed
- GET /api/health
