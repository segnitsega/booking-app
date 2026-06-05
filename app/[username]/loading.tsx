export default function CoachProfileLoading() {
  return (
    <main className="flex-1 bg-background">
      <section className="bg-ink px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
            <div className="h-12 w-4/5 animate-pulse rounded bg-white/10" />
            <div className="h-12 w-3/5 animate-pulse rounded bg-white/10" />
            <div className="h-20 w-full max-w-lg animate-pulse rounded bg-white/10" />
            <div className="flex gap-3 pt-4">
              <div className="h-12 w-40 animate-pulse rounded-full bg-white/10" />
              <div className="h-12 w-40 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
          <div className="mx-auto aspect-[4/5] w-full max-w-md animate-pulse rounded-2xl bg-white/10" />
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="h-8 w-64 animate-pulse rounded bg-border" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="h-72 animate-pulse rounded-2xl bg-surface" />
            <div className="h-72 animate-pulse rounded-2xl bg-surface" />
          </div>
        </div>
      </section>
    </main>
  );
}
