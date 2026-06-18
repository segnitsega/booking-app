import { Button } from "@/components/ui/button";

const featuredCoach =
  process.env.NEXT_PUBLIC_FEATURED_COACH_USERNAME?.trim() || "alex";

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
          Scheduling built for coaches and consultants. Share your booking
          page, set your hours, and let clients reserve sessions that work for
          everyone.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={`/${featuredCoach}`} variant="accent">
            Get started
          </Button>
          <Button href="/sign-in" variant="outline" showArrow={false}>
            Coach login
          </Button>
        </div>
      </div>
    </main>
  );
}
