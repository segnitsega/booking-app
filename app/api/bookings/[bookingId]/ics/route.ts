import { NextResponse } from "next/server";
import { getBookingById } from "@/lib/bookings/get-booking";
import { buildBookingIcs } from "@/lib/bookings/ics";

type RouteContext = {
  params: Promise<{ bookingId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { bookingId } = await context.params;
  const booking = await getBookingById(bookingId);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const ics = buildBookingIcs({
    title: `${booking.sessionType.title} with ${booking.coach.name}`,
    description: booking.sessionType.description,
    startUtc: booking.startTime,
    endUtc: booking.endTime,
    organizerName: booking.coach.name,
    attendeeName: booking.clientName,
    attendeeEmail: booking.clientEmail,
  });

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="brandelevate-${booking.id}.ics"`,
    },
  });
}
