import type { LucideIcon } from "lucide-react";

export type ProfileStat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

type ProfileStatRowProps = {
  stats: ProfileStat[];
};

export function ProfileStatRow({ stats }: ProfileStatRowProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="flex items-center gap-3.5 text-white">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-transparent">
              <Icon className="size-4 stroke-[1.75]" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                {stat.value}
              </p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
