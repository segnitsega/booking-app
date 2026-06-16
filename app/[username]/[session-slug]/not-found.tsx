import Link from "next/link";

export default function BookingNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-[#f7f5fc] px-6 py-24 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
        BrandElevate
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">
        Session not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        That session isn&apos;t available. Head back to the demo coach profile
        and pick an active session type.
      </p>
      <Link
        href="/alex"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        View demo coach
      </Link>
    </main>
  );
}
