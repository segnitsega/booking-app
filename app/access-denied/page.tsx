import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";

export default function AccessDeniedPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#f7f5fc]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-glow),0.14),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <BrandLogo href="/" />
        <p className="mt-8 text-sm font-medium tracking-[0.16em] text-accent uppercase">
          Access denied
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
          Coach dashboard only
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          You&apos;re signed in as a client. The dashboard is for coaches who
          manage availability, sessions, and bookings. You can still browse and
          book sessions as a guest or client.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="accent" showArrow={false}>
            Back home
          </Button>
          <Button
            href="/sign-in?redirect_url=%2Fdashboard"
            variant="outline"
            showArrow={false}
          >
            Coach sign in
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Want to offer sessions?{" "}
          <Link
            href="/sign-up?intent=coach&redirect_url=%2Fdashboard"
            className="font-medium text-accent hover:text-accent-dark"
          >
            Create a coach account
          </Link>
        </p>
      </div>
    </main>
  );
}
