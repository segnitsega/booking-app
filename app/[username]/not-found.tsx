import Link from "next/link";

export default function CoachNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-surface px-6 py-24 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
        SlotWise
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">
        Coach not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        That username doesn&apos;t match a profile yet. Check the link or create
        your own booking page.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <Link
          href="/sign-up"
          className="rounded-full bg-accent px-6 py-3 text-white hover:bg-accent-dark"
        >
          Get started
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
