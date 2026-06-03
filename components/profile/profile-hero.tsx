import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ProfileStatRow,
  type ProfileStat,
} from "@/components/profile/stat-row";

type ProfileHeroProps = {
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  stats: ProfileStat[];
  primarySessionHref: string;
};

export function ProfileHero({
  name,
  bio,
  avatarUrl,
  stats,
  primarySessionHref,
}: ProfileHeroProps) {
  const firstName = name.split(" ")[0] ?? name;

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.35),transparent_45%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-medium tracking-[0.22em] text-accent uppercase">
            {name}
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Book a <span className="text-accent">Session</span> With {firstName}
          </h1>
          {bio ? (
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              {bio}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={primarySessionHref} variant="accent">
              Book a session
            </Button>
            <Button href="#sessions" variant="secondary">
              View sessions
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10">
            {avatarUrl ? (
              // Dicebear returns SVG; skip optimizer for remote vector avatars.
              <Image
                src={avatarUrl}
                alt={name}
                fill
                unoptimized
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/40 to-ink text-6xl font-extrabold">
                {firstName.slice(0, 1)}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute right-4 bottom-4 left-4">
              <p className="text-sm text-white/70">Coach profile</p>
              <p className="text-xl font-bold">{name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <ProfileStatRow stats={stats} />
        </div>
      </div>
    </section>
  );
}
