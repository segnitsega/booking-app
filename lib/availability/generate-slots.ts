import { addMinutes } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { rangesOverlap, toMinutes } from "@/lib/availability/time";
import type {
  AvailableSlot,
  ExistingBooking,
  TimeRange,
} from "@/lib/availability/types";

type BuildSlotsArgs = {
  dateYmd: string;
  workingHours: TimeRange;
  durationMinutes: number;
  coachTimezone: string;
  clientTimezone: string;
  bookings: ExistingBooking[];
  now?: Date;
};

/**
 * Build bookable start times for one day.
 * Working hours are interpreted in the coach timezone, then labeled in the client timezone.
 */
export function buildSlotsForDay({
  dateYmd,
  workingHours,
  durationMinutes,
  coachTimezone,
  clientTimezone,
  bookings,
  now = new Date(),
}: BuildSlotsArgs): AvailableSlot[] {
  const windowStart = fromZonedTime(
    `${dateYmd} ${workingHours.startTime}:00`,
    coachTimezone,
  );
  const windowEnd = fromZonedTime(
    `${dateYmd} ${workingHours.endTime}:00`,
    coachTimezone,
  );

  const startMinutes = toMinutes(workingHours.startTime);
  const endMinutes = toMinutes(workingHours.endTime);

  if (endMinutes - startMinutes < durationMinutes) {
    return [];
  }

  const slots: AvailableSlot[] = [];

  for (
    let minutes = startMinutes;
    minutes + durationMinutes <= endMinutes;
    minutes += durationMinutes
  ) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hhmm = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

    const startUtc = fromZonedTime(`${dateYmd} ${hhmm}:00`, coachTimezone);
    const endUtc = addMinutes(startUtc, durationMinutes);

    // Slot must fit inside the working window.
    if (endUtc > windowEnd || startUtc < windowStart) {
      continue;
    }

    // Skip anything that already started.
    if (startUtc <= now) {
      continue;
    }

    const overlapsBooking = bookings.some((booking) =>
      rangesOverlap(startUtc, endUtc, booking.startTime, booking.endTime),
    );

    if (overlapsBooking) {
      continue;
    }

    slots.push({
      startUtc: startUtc.toISOString(),
      label: formatInTimeZone(startUtc, clientTimezone, "HH:mm"),
    });
  }

  return slots;
}

/** Day-of-week for a civil YYYY-MM-DD date (timezone-independent). */
export function dayOfWeekFromYmd(dateYmd: string): number {
  const [year, month, day] = dateYmd.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}
