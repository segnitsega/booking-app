import { formatInTimeZone } from "date-fns-tz";

type BuildIcsArgs = {
  title: string;
  description?: string | null;
  startUtc: Date;
  endUtc: Date;
  organizerName: string;
  attendeeName: string;
  attendeeEmail: string;
};

function icsEscape(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function toIcsUtc(date: Date): string {
  return formatInTimeZone(date, "UTC", "yyyyMMdd'T'HHmmss'Z'");
}

/** Build a minimal .ics calendar invite for the confirmed booking. */
export function buildBookingIcs({
  title,
  description,
  startUtc,
  endUtc,
  organizerName,
  attendeeName,
  attendeeEmail,
}: BuildIcsArgs): string {
  const stamp = toIcsUtc(new Date());
  const uid = `${startUtc.getTime()}-${attendeeEmail}@brandelevate`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BrandElevate//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsUtc(startUtc)}`,
    `DTEND:${toIcsUtc(endUtc)}`,
    `SUMMARY:${icsEscape(title)}`,
    `DESCRIPTION:${icsEscape(description ?? `Session with ${organizerName}`)}`,
    `ORGANIZER;CN=${icsEscape(organizerName)}:MAILTO:noreply@brandelevate.app`,
    `ATTENDEE;CN=${icsEscape(attendeeName)}:MAILTO:${attendeeEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
