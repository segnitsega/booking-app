import Image from "next/image";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import {
  ProfileStatRow,
  type ProfileStat,
} from "@/components/profile/stat-row";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=2400&q=80";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#success-stories", label: "Success Stories" },
  { href: "#blog", label: "Blog" },
] as const;

type ProfileHeroProps = {
  name: string;
  bio: string | null;
  stats: ProfileStat[];
  primarySessionHref: string;
};

export function ProfileHero({
  name,
  bio,
  stats,
  primarySessionHref,
}: ProfileHeroProps) {
  const firstName = name.split(" ")[0] ?? name;

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/18 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      <header className="absolute inset-x-0 top-0 z-20 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-2 shadow-lg backdrop-blur-md sm:px-5">
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

          <Button
            href={primarySessionHref}
            variant="ghost"
            showArrow={false}
            className="shrink-0 px-3 py-2 text-xs sm:px-4 sm:text-sm"
          >
            Book a consultation
          </Button>
        </div>

        {/* Mobile nav links */}
        <nav className="mx-auto mt-3 flex max-w-6xl gap-2 overflow-x-auto pb-1 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-md"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-40 pt-36 sm:px-8 lg:pb-44">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            You&apos;re More Than a Brand.
            <br />
            You&apos;re a Movement.
          </h1>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Button href={primarySessionHref} variant="light">
              Request a call
            </Button>
            <p className="max-w-xs text-sm leading-relaxed text-white/85 sm:text-base">
              {bio ??
                `Helping you turn connections into opportunities with ${firstName}.`}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-black/25 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-6 sm:px-8">
          <ProfileStatRow stats={stats} />
        </div>
      </div>
    </section>
  );
}
