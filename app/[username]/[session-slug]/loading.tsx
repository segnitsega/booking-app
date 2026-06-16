export default function BookingLoading() {
  return (
    <main className="flex-1 bg-[#f7f5fc]">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
        <div className="h-[420px] animate-pulse rounded-[1.75rem] bg-white/80 ring-1 ring-border" />
        <div className="space-y-5">
          <div className="h-28 animate-pulse rounded-[1.75rem] bg-white/80 ring-1 ring-border" />
          <div className="h-80 animate-pulse rounded-[1.75rem] bg-white/80 ring-1 ring-border" />
          <div className="h-56 animate-pulse rounded-[1.75rem] bg-white/80 ring-1 ring-border" />
        </div>
      </div>
    </main>
  );
}
