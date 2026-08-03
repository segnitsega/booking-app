import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { formatDuration, formatPrice } from "@/lib/format";

type SessionDetailsPanelProps = {
  coachName: string;
  coachUsername: string;
  coachAvatarUrl: string | null;
  title: string;
  description: string | null;
  duration: number;
  price: number | null;
};

export function SessionDetailsPanel({
  coachName,
  coachUsername,
  coachAvatarUrl,
  title,
  description,
  duration,
  price,
}: SessionDetailsPanelProps) {
  return (
    <aside className="rounded-[1.75rem] bg-white p-5 ring-1 ring-border sm:p-7 lg:p-8">
      <Link
        href={`/${coachUsername}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to profile
      </Link>

      <div className="mt-5 flex items-center gap-3 sm:mt-8">
        <div className="relative size-11 overflow-hidden rounded-full bg-accent-soft sm:size-12">
          {coachAvatarUrl ? (
            <Image
              src={coachAvatarUrl}
              alt={coachName}
              fill
              unoptimized
              className="object-cover object-top"
              sizes="48px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-bold text-accent">
              {coachName.slice(0, 1)}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-muted">Session with</p>
          <p className="font-semibold text-ink">{coachName}</p>
        </div>
      </div>

      <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink sm:mt-8 sm:text-3xl">
        {title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-medium text-ink sm:mt-5 sm:gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-accent">
          <Clock className="size-3.5" aria-hidden />
          {formatDuration(duration)}
        </span>
        <span className="rounded-full bg-surface px-3 py-1.5 text-ink">
          {formatPrice(price)}
        </span>
      </div>

      {description ? (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted sm:mt-6 sm:line-clamp-none">
          {description}
        </p>
      ) : null}
    </aside>
  );
}
