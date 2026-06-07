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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="flex items-center gap-3 text-white">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
              <Icon className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-xl font-bold tracking-tight sm:text-2xl">
                {stat.value}
              </p>
              <p className="text-xs text-white/75 sm:text-sm">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
