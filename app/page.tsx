import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

const featuredCoach =
  process.env.NEXT_PUBLIC_FEATURED_COACH_USERNAME?.trim() || "home";

export default function Home() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-accent-soft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-glow),0.18),transparent_50%)]" />

      <SiteHeader />

      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center sm:py-24">
        <p className="text-sm font-medium tracking-[0.22em] text-accent uppercase">
          SlotWise
        </p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
          Book a <span className="text-accent">Session</span> That Fits Your Life
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Scheduling built for coaches and consultants. Share your booking
          page, set your hours, and let clients reserve sessions that work for
          everyone.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={`/${featuredCoach}`} variant="accent">
            Get started
          </Button>
          <Button
            href="/sign-in?redirect_url=%2Fdashboard"
            variant="outline"
            showArrow={false}
          >
            Coach dashboard
          </Button>
        </div>
      </div>

      <section className="relative border-t border-border/70 bg-white/70 px-6 py-10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-ink">Are you a coach?</p>
            <p className="mt-1 text-sm text-muted">
              Sign in to manage availability, sessions, and bookings from your
              private dashboard.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sign-in?redirect_url=%2Fdashboard"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
            >
              Sign in to dashboard
            </Link>
            <Link
              href="/sign-up?intent=coach&redirect_url=%2Fdashboard"
              className="text-sm font-medium text-accent hover:text-accent-dark"
            >
              Create coach account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
