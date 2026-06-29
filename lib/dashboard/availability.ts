import { addDays, format, parseISO } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";

export const WEEK_DAYS = [
  { dayOfWeek: 0, label: "Sunday" },
  { dayOfWeek: 1, label: "Monday" },
  { dayOfWeek: 2, label: "Tuesday" },
  { dayOfWeek: 3, label: "Wednesday" },
  { dayOfWeek: 4, label: "Thursday" },
  { dayOfWeek: 5, label: "Friday" },
  { dayOfWeek: 6, label: "Saturday" },
] as const;

export type WeeklyHourInput = {
  dayOfWeek: number;
  enabled: boolean;
  startTime: string;
  endTime: string;
};

export async function getCoachWeeklyAvailability(coachId: string) {
  return prisma.availability.findMany({
    where: { coachId },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    select: {
      id: true,
      dayOfWeek: true,
      startTime: true,
      endTime: true,
    },
  });
}

export async function getCoachDateOverrides(coachId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.dateOverride.findMany({
    where: {
      coachId,
      date: { gte: today },
    },
    orderBy: { date: "asc" },
    select: {
      id: true,
      date: true,
      isBlocked: true,
      startTime: true,
      endTime: true,
    },
  });
}

/** Replace the coach's weekly availability with the provided day rows. */
export async function saveCoachWeeklyAvailability(
  coachId: string,
  days: WeeklyHourInput[],
) {
  const rows = days
    .filter((day) => day.enabled)
    .map((day) => ({
      coachId,
      dayOfWeek: day.dayOfWeek,
      startTime: day.startTime,
      endTime: day.endTime,
    }));

  await prisma.$transaction([
    prisma.availability.deleteMany({ where: { coachId } }),
    ...(rows.length
      ? [prisma.availability.createMany({ data: rows })]
      : []),
  ]);
}

export type DateOverrideInput = {
  dateYmd: string;
  isBlocked: boolean;
  startTime?: string | null;
  endTime?: string | null;
};

export async function createCoachDateOverride(
  coachId: string,
  coachTimezone: string,
  input: DateOverrideInput,
) {
  // Store midnight in the coach timezone so slot matching (formatInTimeZone)
  // lands on the same civil date the coach picked.
  const date = fromZonedTime(`${input.dateYmd} 00:00:00`, coachTimezone);
  const nextYmd = format(addDays(parseISO(input.dateYmd), 1), "yyyy-MM-dd");
  const nextDate = fromZonedTime(`${nextYmd} 00:00:00`, coachTimezone);

  // One override per calendar day — upsert by deleting same-day rows first.
  await prisma.dateOverride.deleteMany({
    where: {
      coachId,
      date: {
        gte: date,
        lt: nextDate,
      },
    },
  });

  return prisma.dateOverride.create({
    data: {
      coachId,
      date,
      isBlocked: input.isBlocked,
      startTime: input.isBlocked ? null : input.startTime || null,
      endTime: input.isBlocked ? null : input.endTime || null,
    },
  });
}

export async function deleteCoachDateOverride(
  coachId: string,
  overrideId: string,
) {
  await prisma.dateOverride.deleteMany({
    where: { id: overrideId, coachId },
  });
}
