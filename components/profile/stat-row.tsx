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
    <div className="grid gap-6 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-3xl font-extrabold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/60">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
