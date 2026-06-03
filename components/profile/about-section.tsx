import Image from "next/image";

type ProfileAboutProps = {
  name: string;
  bio: string | null;
  avatarUrl: string | null;
};

export function ProfileAbout({ name, bio, avatarUrl }: ProfileAboutProps) {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto h-[340px] w-full max-w-md">
          <div className="absolute top-0 left-0 h-56 w-44 overflow-hidden rounded-2xl bg-ink shadow-xl sm:h-64 sm:w-52">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt=""
                fill
                unoptimized
                className="object-cover object-top"
                sizes="208px"
              />
            ) : null}
          </div>
          <div className="absolute right-0 bottom-0 h-56 w-44 overflow-hidden rounded-2xl bg-accent/20 shadow-xl ring-4 ring-surface sm:h-64 sm:w-52">
            <Image
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
              alt="Coaching conversation"
              fill
              className="object-cover"
              sizes="208px"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg">
            1:1
          </div>
        </div>

        <div>
          <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
            About
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Personal <span className="text-accent">Branding</span> That Compounds
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {bio ??
              `${name} helps clients turn unclear goals into a practical coaching plan they can actually follow.`}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Sessions are focused, timezone-aware, and built around outcomes —
            not vague advice. Pick a session type below to see live availability.
          </p>
        </div>
      </div>
    </section>
  );
}
