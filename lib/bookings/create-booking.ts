import { addMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { getAvailableSlots } from "@/lib/availability";

export type CreateBookingInput = {
  coachId: string;
  sessionTypeId: string;
  startUtc: string;
  clientTimezone: string;
  clientName: string;
  clientEmail: string;
  clientNotes?: string;
};

export type CreateBookingResult =
  | { ok: true; bookingId: string }
  | { ok: false; error: string };

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Create a booking after re-checking that the requested slot is still free.
 */
export async function createBooking(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  const clientName = input.clientName.trim();
  const clientEmail = input.clientEmail.trim().toLowerCase();
  const clientNotes = input.clientNotes?.trim() || null;

  if (clientName.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }

  if (!isValidEmail(clientEmail)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const startTime = new Date(input.startUtc);
  if (Number.isNaN(startTime.getTime())) {
    return { ok: false, error: "That time slot looks invalid." };
  }

  if (startTime <= new Date()) {
    return { ok: false, error: "That time slot is already in the past." };
  }

  const [coach, sessionType] = await Promise.all([
    prisma.coach.findUnique({
      where: { id: input.coachId },
      select: { id: true, timezone: true },
    }),
    prisma.sessionType.findFirst({
      where: {
        id: input.sessionTypeId,
        coachId: input.coachId,
        isActive: true,
      },
      select: { id: true, duration: true },
    }),
  ]);

  if (!coach || !sessionType) {
    return { ok: false, error: "This session is no longer available." };
  }

  const endTime = addMinutes(startTime, sessionType.duration);
  const coachDateYmd = formatInTimeZone(
    startTime,
    coach.timezone,
    "yyyy-MM-dd",
  );

  const openSlots = await getAvailableSlots({
    coachId: coach.id,
    sessionTypeId: sessionType.id,
    dateYmd: coachDateYmd,
    clientTimezone: input.clientTimezone,
  });

  const stillOpen = openSlots.some(
    (slot) => new Date(slot.startUtc).getTime() === startTime.getTime(),
  );

  if (!stillOpen) {
    return {
      ok: false,
      error: "That time was just taken. Please pick another slot.",
    };
  }

  const conflict = await prisma.booking.findFirst({
    where: {
      coachId: coach.id,
      status: "CONFIRMED",
      startTime: { lt: endTime },
      endTime: { gt: startTime },
    },
    select: { id: true },
  });

  if (conflict) {
    return {
      ok: false,
      error: "That time was just taken. Please pick another slot.",
    };
  }

  const booking = await prisma.booking.create({
    data: {
      coachId: coach.id,
      sessionTypeId: sessionType.id,
      clientName,
      clientEmail,
      clientNotes,
      startTime,
      endTime,
      status: "CONFIRMED",
    },
    select: { id: true },
  });

  return { ok: true, bookingId: booking.id };
}
