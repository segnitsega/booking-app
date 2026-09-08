# SlotWise

**Timezone-aware booking for coaches and consultants.**

SlotWise is a Calendly-style scheduling product with a public coach profile, a polished booking flow, and an authenticated dashboard for managing availability, session types, and bookings. It is built as a production-shaped Next.js portfolio app — UI-forward, fullstack, and ready to demo.

Public surfaces use a BrandElevate-inspired editorial look; the dashboard keeps the same language with denser, work-oriented layouts.

---

## Features

### Public booking
- Coach profile with services, process, testimonials, and blog-style sections
- Session booking with calendar + slot picker
- Client timezone conversion against coach working hours
- Confirmation page with `.ics` download
- Booking confirmation email via Resend

### Coach dashboard (Clerk-authenticated)
- Home with upcoming sessions and booking stats
- Bookings list (upcoming / past / cancelled)
- Weekly hours + date overrides (days off / special hours)
- Session types CRUD (title, slug, duration, price, color, active)
- Settings: profile, username, bio, avatar, timezone
- Mock Google Calendar connect (UI-only)

### Reliability & polish
- Skeleton loaders, branded empty states, and error boundaries
- Responsive layouts for profile, booking, and dashboard
- Prisma models with seeded demo coach (`alex`)

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4, custom design tokens |
| Database | PostgreSQL (Neon-ready) + Prisma 6 |
| Auth | Clerk |
| Email | Resend |
| Dates | `date-fns` + `date-fns-tz` |
| Motion | Framer Motion |

---

## Demo routes

After seeding locally:

| Surface | URL |
| --- | --- |
| Landing | `/` |
| Public profile | `/alex` |
| Book a session | `/alex/discovery-call` |
| Coach login | `/sign-in` |
| Dashboard | `/dashboard` |

The first signed-in user can claim the seeded `alex` coach when `DEMO_CLAIM_USERNAME=alex` (default) and that coach still uses the demo `clerkUserId` from the seed script.

---

## Getting started

### Prerequisites
- Node.js 20+
- A PostgreSQL database (Neon, Supabase, or local)
- Clerk application keys
- Optional: Resend API key for live email

### 1. Install

```bash
npm install
cp .env.example .env
```

### 2. Configure environment

Fill in `.env` (and `.env.local` if you use Clerk’s keyless / CLI setup):

```bash
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Optional email
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="BrandElevate <onboarding@resend.dev>"

# Optional: claim seeded coach on first sign-in
DEMO_CLAIM_USERNAME=alex
```

### 3. Database

```bash
npm run db:migrate
npm run db:seed
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Run migrations (dev) |
| `npm run db:seed` | Seed demo coach + sessions |
| `npm run db:studio` | Open Prisma Studio |

---

## Architecture notes

**Availability** — Slots are computed server-side from weekly hours, date overrides, existing confirmed bookings, and session duration. Results are labeled in the guest’s timezone while working hours stay in the coach’s timezone.

**Auth** — Clerk protects `/dashboard`. On first visit, SlotWise resolves or creates a `Coach` row by `clerkUserId` (or claims the seeded demo coach when configured).

**Email** — Confirmation emails are sent after a successful booking. If Resend is not configured, the booking still succeeds and the server logs a warning.

**Data model** — `Coach`, `SessionType`, `Availability`, `DateOverride`, `Booking` (see `prisma/schema.prisma`).

---

## Project structure

```text
app/
  [username]/              # Public profile + booking + confirmation
  dashboard/               # Authenticated coach workspace
  api/                     # Availability + ICS endpoints
  sign-in/ · sign-up/      # Clerk auth pages
components/
  booking/ · profile/ · dashboard/ · brand/
lib/
  availability/            # Slot generation
  bookings/ · email/ · dashboard/
prisma/
  schema.prisma · seed.ts
```

---

## Deployment (Vercel)

1. Push the repo and import it in Vercel.
2. Set the same environment variables as local (production Clerk + Resend + `DATABASE_URL` + `NEXT_PUBLIC_APP_URL`).
3. Run migrations against production Postgres:

```bash
npx prisma migrate deploy
npx prisma db seed
```

4. Confirm `/alex` and `/dashboard` after deploy.

---

## Roadmap / stretch

- Stripe for paid sessions
- Real Google Calendar two-way sync
- Booking cancellation + email
- Waitlists / buffer times between sessions

---

## License

Private portfolio project. All rights reserved unless otherwise noted.
