import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatInTimeZone } from "date-fns-tz";
import { getBookingById } from "@/lib/bookings/get-booking";
import { ConfirmationView } from "@/components/booking/confirmation-view";

type ConfirmedPageProps = {
  params: Promise<{ username: string; "session-slug": string }>;
  searchParams: Promise<{ bookingId?: string }>;
};

export async function generateMetadata({
  searchParams,
}: ConfirmedPageProps): Promise<Metadata> {
  const { bookingId } = await searchParams;
  if (!bookingId) {
    return { title: "Booking confirmed | BrandElevate" };
  }

  const booking = await getBookingById(bookingId);
  if (!booking) {
    return { title: "Booking not found | BrandElevate" };
  }

  return {
    title: `Booked: ${booking.sessionType.title} | BrandElevate`,
    description: `Your ${booking.sessionType.title} with ${booking.coach.name} is confirmed.`,
  };
}

export default async function ConfirmedBookingPage({
  params,
  searchParams,
}: ConfirmedPageProps) {
  const { username, "session-slug": sessionSlug } = await params;
  const { bookingId } = await searchParams;

  if (!bookingId) {
    notFound();
  }

  const booking = await getBookingById(bookingId);

  if (
    !booking ||
    booking.coach.username !== username ||
    booking.sessionType.slug !== sessionSlug
  ) {
    notFound();
  }

  const whenLabel = `${formatInTimeZone(
    booking.startTime,
    booking.coach.timezone,
    "EEEE, MMM d · h:mm a",
  )} (${booking.coach.timezone})`;

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f7f5fc] px-6 py-16">
      <ConfirmationView
        coachName={booking.coach.name}
        coachUsername={booking.coach.username}
        sessionTitle={booking.sessionType.title}
        duration={booking.sessionType.duration}
        price={booking.sessionType.price}
        whenLabel={whenLabel}
        clientName={booking.clientName}
        icsHref={`/api/bookings/${booking.id}/ics`}
      />
    </main>
  );
}
