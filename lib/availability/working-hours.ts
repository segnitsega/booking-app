import type {
  DateOverrideInput,
  TimeRange,
  WeeklyAvailability,
} from "@/lib/availability/types";
import { formatInTimeZone } from "date-fns-tz";

/**
 * Decide the working hours for one civil date.
 * Priority: date override (blocked / special hours) → weekly availability → closed.
 */
export function resolveWorkingHours(args: {
  dateYmd: string;
  dayOfWeek: number;
  weekly: WeeklyAvailability[];
  overrides: DateOverrideInput[];
  coachTimezone: string;
}): TimeRange | null {
  const override = args.overrides.find((entry) => {
    const overrideYmd = formatInTimeZone(
      entry.date,
      args.coachTimezone,
      "yyyy-MM-dd",
    );
    return overrideYmd === args.dateYmd;
  });

  if (override) {
    if (override.isBlocked) {
      return null;
    }

    if (override.startTime && override.endTime) {
      return {
        startTime: override.startTime,
        endTime: override.endTime,
      };
    }

    return null;
  }

  const matches = args.weekly.filter((row) => row.dayOfWeek === args.dayOfWeek);
  if (matches.length === 0) {
    return null;
  }

  // If a coach ever has multiple windows for one day, use the earliest→latest span.
  // (Good enough for v1; split windows can be added later without changing callers.)
  const startTime = matches
    .map((row) => row.startTime)
    .sort()[0];
  const endTime = matches
    .map((row) => row.endTime)
    .sort()
    .at(-1);

  if (!startTime || !endTime) {
    return null;
  }

  return { startTime, endTime };
}
