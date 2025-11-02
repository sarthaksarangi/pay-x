# User App (Next.js)

This is the main user dashboard app.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

To create [API routes](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) add an `api/` directory to the `app/` directory with a `route.ts` file. For individual endpoints, create a subfolder in the `api` directory, like `api/hello/route.ts` would map to [http://localhost:3001/api/hello](http://localhost:3001/api/hello).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_source=github.com&utm_medium=referral&utm_campaign=turborepo-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Prerequisites

- Node 18+
- .env with NEXTAUTH_SECRET and DATABASE_URL configured
- Prisma migrations applied and seed data loaded

## Run locally

1. From repo root:
   npm install
2. Start dev:
   cd apps/user-app
   npm run dev

## Common commands

- npm run dev — dev server (default port 3000)
- npm run build — build for production
- npm run start — start built app

## Notes

- Client components that depend on window must be loaded with dynamic(..., { ssr: false }) or marked "use client".
- The app uses Chart.js; charts are responsive via maintainAspectRatio: false and container heights.

## Seed data

- packages/db/prisma/seed.ts seeds users and transactions used by the dashboard.
