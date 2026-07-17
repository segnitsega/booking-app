/**
 * Curated IANA timezones for coach settings.
 * Keeps the selector scannable while covering common coaching markets.
 */
export const COACH_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Amsterdam",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Africa/Nairobi",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;

export type CoachTimezone = (typeof COACH_TIMEZONES)[number];

export function isKnownTimezone(value: string): boolean {
  return (COACH_TIMEZONES as readonly string[]).includes(value);
}

/** Ensure the coach's current zone appears even if outside the curated list. */
export function timezoneOptionsFor(current: string): string[] {
  if (!current || isKnownTimezone(current)) {
    return [...COACH_TIMEZONES];
  }
  return [current, ...COACH_TIMEZONES];
}
