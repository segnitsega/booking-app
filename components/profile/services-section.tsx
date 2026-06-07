import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatDuration, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export type ServiceCardData = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  duration: number;
  price: number | null;
  imageUrl: string;
  featured?: boolean;
};

type ServicesSectionProps = {
  username: string;
  services: ServiceCardData[];
  primarySessionHref: string;
};

export function ServicesSection({
  username,
  services,
  primarySessionHref,
}: ServicesSectionProps) {
  return (
    <section id="services" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-sm font-medium tracking-[0.18em] text-muted uppercase">
              <span className="h-px w-8 bg-muted/50" aria-hidden />
              Our Services
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Personal <span className="text-accent">Branding</span> Services
              Tailored for You
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted lg:text-right">
            A range of 1:1 and group coaching packages to help you{" "}
            <span className="font-semibold text-ink">elevate your</span> personal
            brand.
          </p>
        </div>

        {services.length === 0 ? (
          <p className="mt-12 rounded-2xl bg-surface px-6 py-10 text-muted">
            No active sessions yet. Check back soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                username={username}
                service={service}
              />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Button href={primarySessionHref} variant="accent">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  username,
  service,
}: {
  username: string;
  service: ServiceCardData;
}) {
  const href = `/${username}/${service.slug}`;
  const featured = Boolean(service.featured);

  return (
    <Link
      href={href}
      className={[
        "group flex min-h-[420px] flex-col overflow-hidden rounded-[1.5rem] p-5 transition-transform duration-300 hover:-translate-y-1",
        featured ? "bg-accent text-white" : "bg-surface text-ink",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={[
            "rounded-full px-3 py-1 text-[11px] font-medium",
            featured ? "bg-white/15 text-white" : "border border-border bg-white text-muted",
          ].join(" ")}
        >
          {formatDuration(service.duration)} · {formatPrice(service.price)}
        </span>
        <span
          className={[
            "flex size-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5",
            featured ? "bg-white text-accent" : "bg-white text-ink shadow-sm",
          ].join(" ")}
        >
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>

      <div className="mt-8 flex-1">
        <h3 className="text-xl font-extrabold tracking-tight">{service.title}</h3>
        {service.description ? (
          <p
            className={[
              "mt-3 text-sm leading-relaxed",
              featured ? "text-white/80" : "text-muted",
            ].join(" ")}
          >
            {service.description}
          </p>
        ) : null}
      </div>

      <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={service.imageUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1280px) 50vw, 25vw"
        />
      </div>
    </Link>
  );
}
