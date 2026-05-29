export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-surface px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium tracking-wide text-accent uppercase">
          SlotWise
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Book a <span className="text-accent">Session</span> That Fits Your
          Life
        </h1>
        <p className="mt-5 text-lg text-muted">
          Scaffolding is in place — design tokens, Prisma schema, and a demo
          coach seed. Public booking pages come next.
        </p>
      </div>
    </main>
  );
}
