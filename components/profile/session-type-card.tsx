import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatDuration, formatPrice } from "@/lib/format";

type SessionTypeCardProps = {
  username: string;
  title: string;
  slug: string;
  description: string | null;
  duration: number;
  price: number | null;
  featured?: boolean;
};

export function SessionTypeCard({
  username,
  title,
  slug,
  description,
  duration,
  price,
  featured = false,
}: SessionTypeCardProps) {
  const href = `/${username}/${slug}`;

  if (featured) {
    return (
      <Link
        href={href}
        className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl bg-accent p-8 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
            Most popular
          </p>
          <h3 className="mt-4 text-3xl font-extrabold tracking-tight">{title}</h3>
          {description ? (
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm font-medium text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              {formatDuration(duration)}
            </span>
            <span>{formatPrice(price)}</span>
          </div>
          <span className="flex size-10 items-center justify-center rounded-full bg-white text-accent transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-1 flex-col p-8">
        <h3 className="text-2xl font-extrabold tracking-tight text-ink">
          {title}
        </h3>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <div className="flex items-center gap-4 text-sm font-medium text-ink">
            <span className="inline-flex items-center gap-1.5 text-muted">
              <Clock className="size-4" aria-hidden />
              {formatDuration(duration)}
            </span>
            <span>{formatPrice(price)}</span>
          </div>
          <span className="flex size-10 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>

      <div
        className="h-28 bg-gradient-to-br from-ink via-ink to-accent/80"
        aria-hidden
      />
    </Link>
  );
}
