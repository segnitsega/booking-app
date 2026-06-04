import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Sparkles, Users } from "lucide-react";
import { getCoachByUsername } from "@/lib/coaches";
import { ProfileHero } from "@/components/profile/profile-hero";
import { ProfileAbout } from "@/components/profile/about-section";
import { SessionTypeCard } from "@/components/profile/session-type-card";

type CoachProfilePageProps = PageProps<"/[username]">;

export async function generateMetadata({
  params,
}: CoachProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const coach = await getCoachByUsername(username);

  if (!coach) {
    return {
      title: "Coach not found | SlotWise",
    };
  }

  return {
    title: `${coach.name} | SlotWise`,
    description:
      coach.bio ?? `Book a coaching session with ${coach.name} on SlotWise.`,
  };
}

export default async function CoachProfilePage({
  params,
}: CoachProfilePageProps) {
  const { username } = await params;
  const coach = await getCoachByUsername(username);

  if (!coach) {
    notFound();
  }

  const primarySession = coach.sessionTypes[0];
  const featuredSlug =
    coach.sessionTypes.find((session) => session.price !== null)?.slug ??
    primarySession?.slug;

  const stats = [
    {
      label: "Sessions completed",
      value: "120+",
      icon: CalendarDays,
    },
    {
      label: "Years coaching",
      value: "8",
      icon: Sparkles,
    },
    {
      label: "Clients coached",
      value: "45",
      icon: Users,
    },
  ];

  return (
    <main className="flex-1 bg-background">
      <ProfileHero
        name={coach.name}
        bio={coach.bio}
        avatarUrl={coach.avatarUrl}
        stats={stats}
        primarySessionHref={
          primarySession
            ? `/${coach.username}/${primarySession.slug}`
            : "#sessions"
        }
      />

      <ProfileAbout
        name={coach.name}
        bio={coach.bio}
        avatarUrl={coach.avatarUrl}
      />

      <section id="sessions" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.2em] text-accent uppercase">
              Sessions
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Choose the <span className="text-accent">Format</span> That Fits
            </h2>
            <p className="mt-4 text-base text-muted">
              Every session type below is live from the seeded coach profile —
              pick one to continue into booking.
            </p>
          </div>

          {coach.sessionTypes.length === 0 ? (
            <p className="mt-10 rounded-2xl border border-border bg-surface px-6 py-10 text-muted">
              No active sessions yet. Check back soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {coach.sessionTypes.map((session) => (
                <SessionTypeCard
                  key={session.id}
                  username={coach.username}
                  title={session.title}
                  slug={session.slug}
                  description={session.description}
                  duration={session.duration}
                  price={session.price}
                  featured={session.slug === featuredSlug}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
