# SlotWise

Booking and scheduling for coaches and consultants — a Next.js portfolio build.

## Stack

- Next.js (App Router) + Tailwind CSS
- Prisma + PostgreSQL
- Clerk, Resend, Framer Motion (coming in later steps)

## Local setup

1. Copy env values:

```bash
cp .env.example .env
```

2. Put a real Postgres `DATABASE_URL` in `.env` (Neon or Supabase free tier works).

3. Apply the schema and seed the demo coach:

```bash
npm run db:migrate
npm run db:seed
```

4. Start the app:

```bash
npm run dev
```

Demo coach username after seeding: `alex`

Open the public profile at [http://localhost:3000/alex](http://localhost:3000/alex).
