import {
  addDays,
  addMinutes,
  format,
  isBefore,
  isSameDay,
  setHours,
  setMinutes,
  startOfDay,
} from "date-fns";

/**
 * Mock availability for Step 3 UI work.
 * Real Availability + DateOverride + Booking logic lands in Step 4.
 */
export function getMockAvailableSlots(
  date: Date,
  durationMinutes: number,
): string[] {
  const day = date.getDay(); // 0 Sun ... 6 Sat
  if (day === 0 || day === 6) {
    return [];
  }

  const startHour = 9;
  const endHour = day === 5 ? 13 : 17;
  const now = new Date();
  const slots: string[] = [];

  let cursor = setMinutes(setHours(startOfDay(date), startHour), 0);
  const end = setMinutes(setHours(startOfDay(date), endHour), 0);

  while (isBefore(addMinutes(cursor, durationMinutes), addMinutes(end, 1))) {
    if (!(isSameDay(date, now) && isBefore(cursor, now))) {
      slots.push(format(cursor, "HH:mm"));
    }
    cursor = addMinutes(cursor, durationMinutes);
  }

  return slots;
}

export function getMockAvailableDates(
  from: Date,
  daysAhead = 60,
): Date[] {
  const dates: Date[] = [];

  for (let i = 0; i < daysAhead; i += 1) {
    const date = startOfDay(addDays(from, i));
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(date);
    }
  }

  return dates;
}
