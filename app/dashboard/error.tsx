"use client";

import Link from "next/link";
import { useEffect } from "react";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-[1.5rem] bg-white px-6 py-16 text-center ring-1 ring-border">
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        Dashboard
      </p>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
        Something went wrong
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">
        We couldn&apos;t load this part of your coach workspace. Try again, or
        head back to the hub.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-surface"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
