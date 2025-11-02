# Pay-X Project Starter — Monorepo

Small monorepo demo app showing a payments/dashboard flow built with Next.js (App Router), Prisma, NextAuth, Turborepo-style layout and a shared UI package.

Tech stack

- Next.js (App Router) — apps/user-app, apps/merchant-app
- NextAuth for auth (Credentials + Google/GitHub)
- Prisma + SQLite/Postgres (packages/db)
- Shared UI: packages/ui (Tailwind CSS)
- Chart.js for analytics; Framer Motion for animations
- Tailwind CSS for styling
- Node 18+ recommended

Quickstart (local)

1. Copy env:
   `cp .env.example .env`
2. Install:
   `npm install`
3. Migrate & seed (Prisma):
   `npx prisma migrate dev --schema=packages/db/prisma/schema.prisma`
   `node packages/db/prisma/seed.js`
4. Run user app:
   `cd apps/user-app`
   `npm run dev`

Useful scripts (repo root)

- `npm run dev --workspace=apps/user-app` # start user-app dev server
- `npm run build --workspace=apps/user-app`
- `npm run test` # runs workspace tests (if configured)

What’s included

- apps/user-app — Next.js dashboard with charts, transactions, auth
- apps/merchant-app — merchant dashboard
- apps/bank-webhook — webhook example service
- packages/ui — shared React/Tailwind UI components
- packages/db — Prisma schema and seed scripts

Environment variables (.env.example)

- `DATABASE_URL=`
- `NEXTAUTH_SECRET=`
- `GOOGLE_CLIENT_ID=`
- `GOOGLE_CLIENT_SECRET=`
- `GITHUB_ID=`
- `GITHUB_SECRET=`

Notes & troubleshooting

- If port is in use: `kill process using lsof -iTCP:PORT -sTCP:LISTEN`
- If you see "window is not defined" for Framer Motion: ensure client-only components are dynamically imported with `ssr: false` or moved under "use client".
- Keep browserslist DB updated: `npx update-browserslist-db@latest`

License

- MIT
