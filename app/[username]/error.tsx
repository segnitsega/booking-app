"use client";

import Link from "next/link";
import { useEffect } from "react";

type ProfileErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProfileError({ error, reset }: ProfileErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-surface px-6 py-24 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
        SlotWise
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">
        Couldn&apos;t load this profile
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Something went wrong while loading the coach page. Please try again.
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
