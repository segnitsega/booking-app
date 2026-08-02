"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";

type BookingErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function BookingError({ error, reset }: BookingErrorProps) {
  const params = useParams<{ username?: string }>();
  const profileHref =
    typeof params?.username === "string" ? `/${params.username}` : "/";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-[#f7f5fc] px-6 py-24 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
        Booking
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">
        Couldn&apos;t load this session
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Availability or session details failed to load. Try again in a moment.
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
          href={profileHref}
          className="rounded-full border border-border bg-white px-6 py-3 text-ink hover:bg-surface"
        >
          Back to profile
        </Link>
      </div>
    </main>
  );
}
