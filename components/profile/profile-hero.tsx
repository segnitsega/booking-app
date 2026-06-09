import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProfileNav } from "@/components/profile/profile-nav";
import {
  ProfileStatRow,
  type ProfileStat,
} from "@/components/profile/stat-row";

const HERO_IMAGE = "/hero-bg.jpg";

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
  return (
    <>
      <ProfileNav primarySessionHref={primarySessionHref} />

      <section
        id="home"
        className="relative isolate min-h-[100svh] overflow-hidden text-white"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-[70%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-40 pt-36 sm:px-8 lg:pb-44">
          <div className="max-w-4xl">
            <h1 className="text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              <span className="block sm:whitespace-nowrap">
                You&apos;re More Than a Brand.
              </span>
              <span className="block sm:whitespace-nowrap">
                You&apos;re a Movement.
              </span>
            </h1>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Button href={primarySessionHref} variant="light">
                Request a call
              </Button>
              <p className="max-w-xs text-sm leading-relaxed text-white/85 sm:text-base">
                {bio ??
                  "Helping you turn connections into opportunities through authentic branding."}
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
    </>
  );
}
