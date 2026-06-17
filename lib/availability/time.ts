/**
 * Tiny time helpers shared by availability logic.
 * Kept free of Prisma so the slot math stays easy to test.
 */

export function parseHhMm(value: string): { hours: number; minutes: number } {
  const [hours, minutes] = value.split(":").map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(`Invalid time string: ${value}`);
  }

  return { hours, minutes };
}

export function toMinutes(value: string): number {
  const { hours, minutes } = parseHhMm(value);
  return hours * 60 + minutes;
}

/** Inclusive-start / exclusive-end style overlap check for date ranges. */
export function rangesOverlap(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date,
): boolean {
  return startA < endB && startB < endA;
}
