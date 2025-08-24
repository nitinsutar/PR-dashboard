# PR Sentiment Dashboard (Phase 1)

A Vercel-ready Next.js (App Router) project for a celebrity/sports PR sentiment dashboard.

## Quickstart

```bash
npm i
npm run dev
```

http://localhost:3000

## Deploy to Vercel
1. Create a new GitHub repo and push this folder.
2. In Vercel: **New Project** → Import the repo → Framework detected: Next.js → Deploy.
3. (Optional) Add env vars from `.env.example` for Phase 2.

## Tests

```bash
npm test
```

## Phases
- Phase 1: Mock data, core UI (this repo)
- Phase 2: Data connectors (X/Reddit/YouTube/News) + Vercel Cron + KV/Redis
- Phase 3: NLP (emotions, sarcasm), Postgres + vector, search
- Phase 4: Alerts (Slack/Email/WhatsApp), anomaly detection
- Phase 5: Multi-tenant auth, Stripe billing, reports
