# yaofan.io

Give interesting AI projects a bite so they stay live.

`yaofan.io` is a small but opinionated experiment in a different kind of AI product economics. Instead of pretending every project needs to become a full SaaS company, it treats weird, useful, internet-native AI tools as living things: you try them, decide whether they deserve another week of life, and support the ones you want to keep evolving.

The product is intentionally simple. A visitor lands on a page of playful AI mini-projects, tests one in seconds, and then chooses whether to feed a single tool or support the whole garden. The goal is not “subscriptions for everything.” The goal is to keep interesting work from dying in private folders, half-finished repos, or abandoned tabs.

## Vision

`yaofan` comes from a blunt internet instinct: if something is interesting, useful, or funny enough to exist, maybe it deserves a bite instead of a shutdown.

This repo is the first version of that idea:

- a home for small AI tools that people can actually try
- a lightweight support layer that turns curiosity into maintenance budget
- a public-facing product that treats updates as something earned by audience interest
- a brand that is informal, sharp, and internet-native instead of pretending to be enterprise software

In practical terms, `yaofan.io` is building toward a tiny patronage system for experimental AI products. Every project can have its own page, status, roadmap, and support signal. Over time, the site can expand into a rotating catalog of living AI curiosities: not polished “platform features,” but compact tools that stay alive because users keep feeding them.

## Current Product

The current homepage presents three supportable AI mini-projects:

- `AI拒绝生成器 / AI Refusal Generator`
- `AI 人设包装器 / AI Persona Polisher`
- `AI借口生成器 / AI Excuse Generator`

Each project is framed as something with momentum and survival cost, not just as a feature card. The site combines:

- a branded landing page
- local interactive playgrounds for trying the concepts immediately
- single-project support and full-access support flows
- a public supporter feed
- a site vitality bar derived from payment history

## Stack

- `Vite`
- `React 19`
- `TypeScript`
- `react-router-dom`
- `Tailwind CSS v4`
- `Radix UI` primitives with local UI wrappers
- `framer-motion`
- `Stripe Checkout` + webhook handling
- `Supabase` for payment persistence
- `Vercel` for frontend hosting, serverless functions, and analytics

## Architecture

The app is a Vite single-page frontend with a small set of serverless endpoints in `api/`.

- the frontend renders the brand experience, mini-project cards, local playgrounds, pricing, and supporter UI
- `Stripe Checkout` handles one-time support payments
- the Stripe webhook writes successful payments into `Supabase`
- public API routes read payment records back for supporter display and vitality aggregation
- `Vercel` hosts both the SPA and the serverless routes

Because the site uses `BrowserRouter`, `vercel.json` includes a rewrite so direct visits to `/thankyou` resolve back to the SPA entrypoint.

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Type check locally with:

```bash
npx tsc --noEmit -p tsconfig.app.json
```

## Environment Variables

Only variable names are documented here. Put real values in local env files and in Vercel Project Settings.

```bash
FRONTEND_ORIGIN
STRIPE_SECRET_KEY
STRIPE_PRICE_SINGLE_PROJECT
STRIPE_PRICE_ALL_ACCESS
STRIPE_WEBHOOK_SECRET
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_ANON_KEY
```

## Payments

`yaofan.io` currently uses hosted one-time `Stripe Checkout Sessions`.

- support modes exposed by the product:
  - `single_project`
  - `all_access`
- webhook endpoint:
  - `/api/stripe-checkout/webhook`
- success URL:
  - `/thankyou`
- cancel URL:
  - `/`

The checkout session stores lightweight metadata so the support event can be attached to a project context:

- `display_name`
- `message`
- `project_id`
- `project_name`

## Data Layer

`Supabase` is currently the only runtime data store in this repo.

- `/api/stripe-checkout/webhook`
  - inserts completed payment records into `payments`
- `/api/payments`
  - returns recent public payment records
- `/api/get-hp-stats`
  - aggregates support totals for the vitality bar

Operational repo artifacts:

- `supabase_schema.sql`
  - current schema snapshot
- `scripts/seed-supabase.js`
  - local seed script for development/demo data

## Deployment

The repo is linked to a `Vercel` project using the `vite` framework preset.

Expected deployment shape:

- frontend built with `npm run build`
- static assets served from the Vite output
- serverless API routes served from `api/*`
- analytics enabled via `@vercel/analytics`

Standard Git-based deployment flow:

```bash
git push origin main
```

Ad hoc preview or production deployment from the project directory:

```bash
npx vercel
npx vercel --prod
```

## Useful Commands

```bash
npm run dev
npm run build
npm run preview
npx tsc --noEmit -p tsconfig.app.json
```

## Repo Hygiene

- do not commit live secrets
- keep `.env` local only
- prefer Vercel Project Settings for environment management
