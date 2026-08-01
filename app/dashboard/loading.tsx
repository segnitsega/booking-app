export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-28 rounded-full bg-accent-soft" />
      <div className="mt-3 h-9 w-64 max-w-full rounded-2xl bg-white ring-1 ring-border" />
      <div className="mt-3 h-4 w-full max-w-md rounded-full bg-white/80 ring-1 ring-border" />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 rounded-[1.35rem] bg-white ring-1 ring-border"
          />
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-border">
        <div className="border-b border-border px-6 py-4">
          <div className="h-5 w-40 rounded-full bg-surface" />
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="space-y-2">
                <div className="h-4 w-36 rounded-full bg-surface" />
                <div className="h-3 w-24 rounded-full bg-surface" />
              </div>
              <div className="h-4 w-28 rounded-full bg-surface" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
