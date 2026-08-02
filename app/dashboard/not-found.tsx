import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="rounded-[1.5rem] bg-white px-6 py-16 text-center ring-1 ring-border">
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        Dashboard
      </p>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">
        That dashboard route doesn&apos;t exist, or your coach profile isn&apos;t
        ready yet.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        Back to coaching hub
      </Link>
    </div>
  );
}
