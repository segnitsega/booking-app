"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Show, useUser } from "@clerk/nextjs";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#success-stories", label: "Success Stories" },
  { href: "#blog", label: "Blog" },
] as const;

type ProfileNavProps = {
  primarySessionHref: string;
};

export function ProfileNav({ primarySessionHref }: ProfileNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();
  const isCoach = user?.publicMetadata?.role === "coach";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={[
          "pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300 sm:px-5",
          scrolled
            ? "border-white/15 bg-ink/80 shadow-xl shadow-black/20 backdrop-blur-xl"
            : "border-white/20 bg-white/10 shadow-lg backdrop-blur-md",
        ].join(" ")}
      >
        <BrandLogo light href="#home" />

        <nav className="hidden items-center gap-5 text-sm font-medium text-white/90 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Show when="signed-out">
            <Link
              href="/sign-in?redirect_url=%2Fdashboard"
              className="hidden rounded-full px-3 py-2 text-xs font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              Coach login
            </Link>
          </Show>
          <Show when="signed-in">
            {isCoach ? (
              <Link
                href="/dashboard"
                className="hidden rounded-full px-3 py-2 text-xs font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
              >
                Dashboard
              </Link>
            ) : null}
          </Show>
          <Button
            href={primarySessionHref}
            variant="ghost"
            showArrow={false}
            className="shrink-0 px-3 py-2 text-xs sm:px-4 sm:text-sm"
          >
            Book a consultation
          </Button>
        </div>
      </div>

      <nav className="pointer-events-auto mx-auto mt-3 flex max-w-6xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={[
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors",
              scrolled
                ? "border-white/15 bg-ink/80"
                : "border-white/20 bg-white/10",
            ].join(" ")}
          >
            {link.label}
          </a>
        ))}
        <Link
          href="/sign-in?redirect_url=%2Fdashboard"
          className={[
            "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors",
            scrolled
              ? "border-white/15 bg-ink/80"
              : "border-white/20 bg-white/10",
          ].join(" ")}
        >
          Coach login
        </Link>
      </nav>
    </header>
  );
}
