"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
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
  { href: "/dashboard/settings", label: "Settings" },
];

type DashboardNavProps = {
  coachName: string;
  coachUsername: string;
};

export function DashboardNav({ coachName, coachUsername }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="text-right">
            <p className="truncate text-sm font-semibold text-ink max-w-[7.5rem] sm:max-w-none">
              {coachName}
            </p>
            <Link
              href={`/${coachUsername}`}
              className="text-[11px] text-muted hover:text-accent sm:text-xs"
            >
              Public profile
            </Link>
          </div>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-9",
              },
            }}
          />
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:px-6 md:hidden [&::-webkit-scrollbar]:hidden">
        {NAV_ITEMS.filter((item) => !item.disabled).map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "shrink-0 rounded-full px-3.5 py-2 text-xs font-medium",
                active ? "bg-accent text-white" : "bg-surface text-muted",
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
