import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.35),transparent_40%)]" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-medium tracking-[0.22em] text-accent uppercase">
          SlotWise
        </p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Book a <span className="text-accent">Session</span> That Fits Your Life
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          A Calendly-style booking experience for coaches. Open the seeded demo
          profile to explore the public booking surface.
        </p>
        <div className="mt-10">
          <Button href="/alex" variant="accent">
            View demo coach
          </Button>
        </div>
        <p className="mt-6 text-sm text-white/45">
          Or go directly to{" "}
          <Link href="/alex" className="text-white underline-offset-4 hover:underline">
            /alex
          </Link>
        </p>
      </div>
    </main>
  );
}
