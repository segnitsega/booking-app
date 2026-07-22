import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-accent-soft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-glow),0.18),transparent_50%)]" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-medium tracking-[0.22em] text-accent uppercase">
          SlotWise
        </p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
          Book a <span className="text-accent">Session</span> That Fits Your Life
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          A Calendly-style booking experience for coaches. Open the seeded demo
          profile to explore the public booking surface.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/alex" variant="accent">
            View demo coach
          </Button>
          <Button href="/sign-in" variant="outline" showArrow={false}>
            Coach login
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Or go directly to{" "}
          <Link
            href="/alex"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            /alex
          </Link>
          {" · "}
          <Link
            href="/dashboard"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            /dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}
