import Link from "next/link";
import { formatInTimeZone } from "date-fns-tz";
import { formatDuration, formatPrice } from "@/lib/format";
import type { CoachBookingListItem } from "@/lib/bookings/list-coach-bookings";
import type { BookingListFilter } from "@/lib/bookings/list-coach-bookings";

const FILTERS: { value: BookingListFilter; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "cancelled", label: "Cancelled" },
];

type BookingsListProps = {
  bookings: CoachBookingListItem[];
  filter: BookingListFilter;
  coachTimezone: string;
  coachUsername: string;
};

export function BookingsList({
  bookings,
  filter,
  coachTimezone,
  coachUsername,
}: BookingsListProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
            Bookings
          </h1>
          <p className="mt-2 text-sm text-muted">
            Read-only view of your sessions. Cancel actions come later.
          </p>
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:overflow-visible sm:rounded-full sm:bg-white sm:p-1 sm:ring-1 sm:ring-border sm:pb-1">
          {FILTERS.map((item) => {
            const active = item.value === filter;
            return (
              <Link
                key={item.value}
                href={`/dashboard/bookings?filter=${item.value}`}
                className={[
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-white"
                    : "bg-white text-muted ring-1 ring-border hover:text-ink sm:bg-transparent sm:ring-0",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-border">
        {bookings.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-base font-semibold text-ink">No bookings here</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              {filter === "upcoming"
                ? "When clients book, upcoming sessions will show up in this list."
                : filter === "past"
                  ? "Completed and past sessions will appear here."
                  : "Cancelled sessions will appear here."}
            </p>
            {filter === "upcoming" ? (
              <Link
                href={`/${coachUsername}`}
                className="mt-5 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                Share your booking page
              </Link>
            ) : null}
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-ink">
                    {booking.sessionType.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {booking.clientName} · {booking.clientEmail}
                  </p>
                  {booking.clientNotes ? (
                    <p className="mt-1 line-clamp-1 text-sm text-muted/80">
                      Note: {booking.clientNotes}
                    </p>
                  ) : null}
                </div>

                <div className="shrink-0 text-sm sm:text-right">
                  <p className="font-medium text-ink">
                    {formatInTimeZone(
                      booking.startTime,
                      coachTimezone,
                      "EEE, MMM d · h:mm a",
                    )}
                  </p>
                  <p className="mt-1 text-muted">
                    {formatDuration(booking.sessionType.duration)} ·{" "}
                    {formatPrice(booking.sessionType.price)} ·{" "}
                    <span className="capitalize">
                      {booking.status.toLowerCase()}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
