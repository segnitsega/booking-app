import Image from "next/image";

type ProfileAboutProps = {
  name: string;
  bio: string | null;
  avatarUrl: string | null;
};

export function ProfileAbout({ name, bio, avatarUrl }: ProfileAboutProps) {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--accent-glow),0.12),transparent_45%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="flex items-center gap-3 text-sm font-medium tracking-[0.18em] text-muted uppercase">
            <span className="h-px w-8 bg-muted/50" aria-hidden />
            About me
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Meet {name} Your Personal{" "}
            <span className="text-accent">Branding Coach</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {bio ??
              `${name} helps founders and operators turn unclear goals into a personal brand system that compounds.`}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Sessions are focused, timezone-aware, and built around outcomes —
            clarity, positioning, and a plan you can actually ship.
          </p>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-md">
          <div className="absolute top-0 left-0 h-[320px] w-[240px] overflow-hidden rounded-[1.5rem] bg-surface shadow-xl sm:h-[360px] sm:w-[270px]">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                fill
                unoptimized
                className="object-cover object-top"
                sizes="270px"
              />
            ) : (
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt={name}
                fill
                className="object-cover"
                sizes="270px"
              />
            )}
          </div>

          <div className="absolute right-0 bottom-2 h-[200px] w-[170px] overflow-hidden rounded-[1.35rem] bg-white shadow-xl ring-4 ring-white sm:h-[220px] sm:w-[190px]">
            <Image
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=700&q=80"
              alt="Studio workspace"
              fill
              className="object-cover"
              sizes="190px"
            />
          </div>

          <div className="absolute top-8 right-0 max-w-[150px] text-right text-xs leading-relaxed text-muted sm:top-10">
            <span className="mb-2 inline-block size-2 rounded-full bg-accent" />
            <p>With over 8 years helping clients build brands that feel like them.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
