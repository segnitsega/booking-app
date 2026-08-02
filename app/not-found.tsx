import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-surface px-6 py-24 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
        SlotWise
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        That link doesn&apos;t match anything here. Try the demo coach or head
        home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <Link
          href="/alex"
          className="rounded-full bg-accent px-6 py-3 text-white hover:bg-accent-dark"
        >
          View demo coach
        </Link>
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
