"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand/brand-logo";

const NAV_ITEMS: {
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
}[] = [
  { href: "/dashboard", label: "Home", exact: true },
  { href: "/dashboard/bookings", label: "Bookings" },
  { href: "/dashboard/availability", label: "Availability" },
  { href: "/dashboard/session-types", label: "Sessions" },
  { href: "/dashboard/settings", label: "Settings", disabled: true },
];

type DashboardNavProps = {
  coachName: string;
  coachUsername: string;
};

export function DashboardNav({ coachName, coachUsername }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-6">
          <BrandLogo href="/dashboard" />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              if (item.disabled) {
                return (
                  <span
                    key={item.href}
                    className="rounded-full px-3 py-1.5 text-sm text-muted/50"
                    title="Coming soon"
                  >
                    {item.label}
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:bg-surface hover:text-ink",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-ink">{coachName}</p>
          <Link
            href={`/${coachUsername}`}
            className="text-xs text-muted hover:text-accent"
          >
            View public profile
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 pb-3 md:hidden">
        {NAV_ITEMS.filter((item) => !item.disabled).map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                active ? "bg-accent-soft text-accent" : "bg-surface text-muted",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
