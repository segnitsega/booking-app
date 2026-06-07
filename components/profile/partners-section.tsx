const PARTNERS = [
  "Airbnb",
  "BCG",
  "Brave",
  "Notion",
  "Stripe",
  "Linear",
  "Figma",
  "Vercel",
];

export function PartnersSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-glow),0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-accent sm:text-3xl">
          Partners and Clients
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              className="flex h-20 items-center justify-center rounded-2xl bg-surface px-4 text-sm font-semibold tracking-wide text-ink/55"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
