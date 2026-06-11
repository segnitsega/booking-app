type Partner = {
  name: string;
  mark: "text" | "airbnb" | "bcg" | "brave" | "allstate";
};

const ROW_ONE: Partner[] = [
  { name: "BCG", mark: "bcg" },
  { name: "DailyPay", mark: "text" },
  { name: "Tweewieler", mark: "text" },
  { name: "Pfalzwerke", mark: "text" },
  { name: "Airbnb", mark: "airbnb" },
  { name: "ActionCOACH", mark: "text" },
  { name: "Allstate", mark: "allstate" },
  { name: "Brave", mark: "brave" },
];

const ROW_TWO: Partner[] = [
  { name: "Zepto", mark: "text" },
  { name: "Binocs", mark: "text" },
  { name: "Credova", mark: "text" },
  { name: "FlySafair", mark: "text" },
  { name: "Jeven", mark: "text" },
  { name: "Allbridge", mark: "text" },
  { name: "Coteccoms", mark: "text" },
];

function PartnerMark({ partner }: { partner: Partner }) {
  if (partner.mark === "airbnb") {
    return (
      <span className="text-[1.35rem] font-bold tracking-tight text-[#FF5A5F]">
        airbnb
      </span>
    );
  }

  if (partner.mark === "bcg") {
    return (
      <span className="flex items-center gap-1.5 text-ink">
        <span className="grid grid-cols-2 gap-0.5" aria-hidden>
          <span className="size-2 rounded-[1px] bg-ink" />
          <span className="size-2 rounded-[1px] bg-ink" />
          <span className="size-2 rounded-[1px] bg-ink" />
          <span className="size-2 rounded-[1px] bg-ink" />
        </span>
        <span className="text-sm font-bold tracking-[0.08em]">BCG</span>
      </span>
    );
  }

  if (partner.mark === "brave") {
    return (
      <span className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink">
        <span
          className="flex size-5 items-center justify-center rounded-full bg-[#FB542B] text-[10px] text-white"
          aria-hidden
        >
          B
        </span>
        Brave
      </span>
    );
  }

  if (partner.mark === "allstate") {
    return (
      <span className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-[#0076B6]">
        <span
          className="flex size-5 items-center justify-center rounded-full bg-[#0076B6] text-[10px] font-bold text-white"
          aria-hidden
        >
          A
        </span>
        Allstate
      </span>
    );
  }

  return (
    <span className="text-sm font-semibold tracking-tight text-ink/70">
      {partner.name}
    </span>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-[72px] min-w-[118px] flex-1 items-center justify-center rounded-2xl bg-white px-4 shadow-[0_10px_30px_-18px_rgba(23,23,28,0.35)] ring-1 ring-black/[0.03] sm:min-w-[128px]">
      <PartnerMark partner={partner} />
    </div>
  );
}

export function PartnersSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f5fc] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--accent-glow),0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-center text-[1.75rem] font-bold tracking-tight text-accent sm:text-3xl">
          Partners and Clients
        </h2>

        <div className="mt-12 space-y-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {ROW_ONE.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {ROW_TWO.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
