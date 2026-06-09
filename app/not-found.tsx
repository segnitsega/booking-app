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
        That link doesn&apos;t match anything here. Head home or sign in to your
        coach workspace.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-3 text-white hover:bg-accent-dark"
        >
          Back home
        </Link>
        <Link
          href="/sign-in"
          className="rounded-full border border-border bg-white px-6 py-3 text-ink hover:bg-surface"
        >
          Coach login
        </Link>
      </div>
    </main>
  );
}
