import Image from "next/image";

const STORIES = [
  {
    name: "Maya Chen",
    role: "Founder, Northline",
    quote:
      "I finally sound like myself online. In six weeks I went from posting randomly to a clear brand that brings warm intros every week.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Jordan Ellis",
    role: "Product Lead",
    quote:
      "The positioning work alone was worth it. Recruiters and clients now understand what I do without a long explanation.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sam Rivera",
    role: "Creator & Consultant",
    quote:
      "Practical, sharp, and encouraging. My LinkedIn now feels like a landing page — and booked calls doubled.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];

export function SuccessStoriesSection() {
  return (
    <section id="success-stories" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted uppercase">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            What <span className="text-accent">My Clients</span> Are Saying
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Hear from professionals who&apos;ve transformed their careers and
            confidence through personal branding.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STORIES.map((story) => (
            <article
              key={story.name}
              className="rounded-[1.5rem] border border-border bg-surface p-7 shadow-sm"
            >
              <p className="text-base leading-relaxed text-ink/90">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="relative size-11 overflow-hidden rounded-full bg-white">
                  <Image
                    src={story.avatar}
                    alt={story.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">{story.name}</p>
                  <p className="text-xs text-muted">{story.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
