import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSessionForBooking } from "@/lib/sessions";
import { SessionDetailsPanel } from "@/components/booking/session-details-panel";
import { BookingScheduler } from "@/components/booking/booking-scheduler";

type BookingPageProps = {
  params: Promise<{ username: string; "session-slug": string }>;
};

export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const { username, "session-slug": sessionSlug } = await params;
  const data = await getSessionForBooking(username, sessionSlug);

  if (!data) {
    return { title: "Session not found | BrandElevate" };
  }

  return {
    title: `Book ${data.session.title} with ${data.coach.name} | BrandElevate`,
    description:
      data.session.description ??
      `Book a ${data.session.title} session with ${data.coach.name}.`,
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { username, "session-slug": sessionSlug } = await params;
  const data = await getSessionForBooking(username, sessionSlug);

  if (!data) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#f7f5fc]">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:py-14">
        <SessionDetailsPanel
          coachName={data.coach.name}
          coachUsername={data.coach.username}
          coachAvatarUrl={data.coach.avatarUrl}
          title={data.session.title}
          description={data.session.description}
          duration={data.session.duration}
          price={data.session.price}
        />

        <BookingScheduler
          durationMinutes={data.session.duration}
          coachTimezone={data.coach.timezone}
        />
      </div>
    </main>
  );
}
