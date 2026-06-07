export default function CoachProfileLoading() {
  return (
    <main className="flex-1 bg-background">
      <section className="relative min-h-[100svh] overflow-hidden bg-surface">
        <div className="absolute inset-x-4 top-4 h-14 animate-pulse rounded-full bg-white/70 sm:inset-x-6" />
        <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-40 pt-28">
          <div className="h-14 w-4/5 max-w-2xl animate-pulse rounded-xl bg-border/70" />
          <div className="mt-4 h-14 w-3/5 max-w-xl animate-pulse rounded-xl bg-border/70" />
          <div className="mt-8 flex gap-4">
            <div className="h-12 w-44 animate-pulse rounded-full bg-border/70" />
            <div className="h-12 w-56 animate-pulse rounded-full bg-border/50" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 animate-pulse bg-border/40" />
      </section>
    </main>
  );
}
