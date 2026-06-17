import { addDays, format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import {
  buildSlotsForDay,
  dayOfWeekFromYmd,
} from "@/lib/availability/generate-slots";
import { resolveWorkingHours } from "@/lib/availability/working-hours";
import type { AvailableSlot } from "@/lib/availability/types";

type GetAvailableSlotsArgs = {
  coachId: string;
  sessionTypeId: string;
  /** Civil date the guest selected, e.g. "2026-06-20" */
  dateYmd: string;
  clientTimezone: string;
};

type GetAvailableDatesArgs = {
  coachId: string;
  sessionTypeId: string;
  clientTimezone: string;
  fromYmd?: string;
  daysAhead?: number;
};

type AvailabilityContext = NonNullable<
  Awaited<ReturnType<typeof loadAvailabilityContext>>
>;

async function loadAvailabilityContext(
  coachId: string,
  sessionTypeId: string,
  rangeStart: Date,
  rangeEnd: Date,
) {
  const [coach, sessionType, weekly, overrides, bookings] = await Promise.all([
    prisma.coach.findUnique({
      where: { id: coachId },
      select: { id: true, timezone: true },
    }),
    prisma.sessionType.findFirst({
      where: { id: sessionTypeId, coachId, isActive: true },
      select: { id: true, duration: true },
    }),
    prisma.availability.findMany({
      where: { coachId },
      select: { dayOfWeek: true, startTime: true, endTime: true },
    }),
    prisma.dateOverride.findMany({
      where: {
        coachId,
        date: {
          gte: rangeStart,
          lt: rangeEnd,
        },
      },
      select: {
        date: true,
        isBlocked: true,
        startTime: true,
        endTime: true,
      },
    }),
    prisma.booking.findMany({
      where: {
        coachId,
        status: "CONFIRMED",
        startTime: { lt: rangeEnd },
        endTime: { gt: rangeStart },
      },
      select: { startTime: true, endTime: true },
    }),
  ]);

  if (!coach || !sessionType) {
    return null;
  }

  return { coach, sessionType, weekly, overrides, bookings };
}

function slotsForDate(
  context: AvailabilityContext,
  dateYmd: string,
  clientTimezone: string,
): AvailableSlot[] {
  const workingHours = resolveWorkingHours({
    dateYmd,
    dayOfWeek: dayOfWeekFromYmd(dateYmd),
    weekly: context.weekly,
    overrides: context.overrides,
    coachTimezone: context.coach.timezone,
  });

  if (!workingHours) {
    return [];
  }

  return buildSlotsForDay({
    dateYmd,
    workingHours,
    durationMinutes: context.sessionType.duration,
    coachTimezone: context.coach.timezone,
    clientTimezone,
    bookings: context.bookings,
  });
}

/**
 * Public entry point: available start times for one coach + session + day.
 */
export async function getAvailableSlots({
  coachId,
  sessionTypeId,
  dateYmd,
  clientTimezone,
}: GetAvailableSlotsArgs): Promise<AvailableSlot[]> {
  const dayStart = fromZonedTime(`${dateYmd} 00:00:00`, "UTC");
  const rangeStart = addDays(dayStart, -1);
  const rangeEnd = addDays(dayStart, 2);

  const context = await loadAvailabilityContext(
    coachId,
    sessionTypeId,
    rangeStart,
    rangeEnd,
  );

  if (!context) {
    return [];
  }

  return slotsForDate(context, dateYmd, clientTimezone);
}

/**
 * Returns civil dates (yyyy-MM-dd) that still have at least one open slot.
 * Loads coach data once, then evaluates each day in memory.
 */
export async function getAvailableDates({
  coachId,
  sessionTypeId,
  clientTimezone,
  fromYmd,
  daysAhead = 60,
}: GetAvailableDatesArgs): Promise<string[]> {
  const from = fromYmd ?? format(new Date(), "yyyy-MM-dd");
  const rangeStart = addDays(new Date(`${from}T00:00:00Z`), -1);
  const rangeEnd = addDays(new Date(`${from}T00:00:00Z`), daysAhead + 1);

  const context = await loadAvailabilityContext(
    coachId,
    sessionTypeId,
    rangeStart,
    rangeEnd,
  );

  if (!context) {
    return [];
  }

  const openDates: string[] = [];

  for (let i = 0; i < daysAhead; i += 1) {
    const dateYmd = format(
      addDays(new Date(`${from}T00:00:00Z`), i),
      "yyyy-MM-dd",
    );
    const slots = slotsForDate(context, dateYmd, clientTimezone);
    if (slots.length > 0) {
      openDates.push(dateYmd);
    }
  }

  return openDates;
}
