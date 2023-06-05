# SlotWise

Timezone-aware booking for coaches and consultants.

Public coach profiles, a calendar booking flow, and a Clerk-authenticated dashboard for availability, session types, and bookings.

**Live demo:** [Add your deployed URL here](https://your-app.example.com)

---

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 4**
- **PostgreSQL** + **Prisma 6** (Neon)
- **Clerk** (auth)
- **Resend** (booking emails)
- **Docker** (production image)

---

## Features

- Public coach profile and session booking with timezone-aware slots
- Confirmation page with `.ics` download and optional email via Resend
- Coach dashboard: bookings, weekly hours, date overrides, session types, settings
- Role-gated dashboard (coaches only)
- Seeded demo coach at `/home`

---

## Getting started

**Requirements:** Node.js 20+, PostgreSQL (e.g. Neon), Clerk keys. Resend optional.

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL, Clerk, and optional Resend values

npx prisma migrate deploy
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

See [`.env.example`](.env.example) for the full list. At minimum:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `NEXT_PUBLIC_APP_URL` | Public site URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk auth |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | Booking emails (optional) |

### Docker

```bash
npm run docker:build
npm run docker:run
```

Uses values from `.env` (including your Neon `DATABASE_URL`).

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build & serve |
| `npm run db:migrate` | Prisma migrate (dev) |
| `npm run db:seed` | Seed demo coach + bookings |
| `npm run docker:up` | Build and run the Docker image |

---

## License

Private project. All rights reserved.
