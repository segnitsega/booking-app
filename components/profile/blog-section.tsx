import Image from "next/image";
import { Button } from "@/components/ui/button";

const ARTICLES = [
  {
    date: "July 10, 2025",
    title: "Insights & Strategies for Building Your Personal Brand",
    excerpt:
      "A practical framework for clarifying your voice, audience, and content pillars without burning out.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    date: "August 2, 2025",
    title: "How to Turn Conversations Into Consistent Opportunities",
    excerpt:
      "Simple follow-up systems that keep your network warm and your calendar full of the right calls.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
  },
  {
    date: "September 14, 2025",
    title: "The Personal Brand Assets Every Coach Should Ship First",
    excerpt:
      "Profile, offer page, and proof — the minimum viable brand stack before you scale content.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="bg-accent-soft/50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-ink">Our Blog</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Insights & Strategies for Building Your{" "}
            <span className="text-accent">Personal Brand</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {ARTICLES.map((article) => (
            <article key={article.title} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="mt-4 text-sm text-muted">{article.date}</p>
              <h3 className="mt-2 text-lg font-extrabold tracking-tight text-ink">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {article.excerpt}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="#blog" variant="accent">
            See all articles
          </Button>
        </div>
      </div>
    </section>
  );
}
