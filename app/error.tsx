"use client";

import Link from "next/link";
import { useEffect } from "react";

type AppErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-accent-soft px-6 py-24 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
        SlotWise
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">
        Something broke
      </h1>
      <p className="mt-4 max-w-md text-muted">
        An unexpected error stopped this page. You can retry or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-accent px-6 py-3 text-white hover:bg-accent-dark"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-border bg-white px-6 py-3 text-ink hover:bg-surface"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
