import Link from "next/link";
import { notFound } from "next/navigation";
import { formatInTimeZone } from "date-fns-tz";
import { CalendarDays, CircleDollarSign, Clock3 } from "lucide-react";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import { getCoachBookingStats } from "@/lib/dashboard/stats";
import { listCoachBookings } from "@/lib/bookings/list-coach-bookings";
import { formatPrice } from "@/lib/format";

export default async function DashboardHomePage() {
  const coach = await getDashboardCoach();
  if (!coach) {
    notFound();
  }

  const [stats, upcoming] = await Promise.all([
    getCoachBookingStats(coach.id),
    listCoachBookings({ coachId: coach.id, filter: "upcoming" }),
  ]);

  const nextSessions = upcoming.slice(0, 5);

  const cards = [
    {
      label: "Upcoming",
      value: String(stats.upcomingCount),
      icon: Clock3,
    },
    {
      label: "This month",
      value: String(stats.monthBookingCount),
      icon: CalendarDays,
    },
    {
      label: "Month revenue",
      value: formatPrice(stats.monthRevenueCents),
      icon: CircleDollarSign,
    },
  ];

  return (
    <div>
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        Welcome back
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        {coach.name.split(" ")[0]}&apos;s dashboard
      </h1>
      <p className="mt-2 text-sm text-muted">
        A quick look at what&apos;s coming up. Full history lives in Bookings.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-[1.35rem] bg-white p-5 ring-1 ring-border"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-muted">{card.label}</p>
                  <p className="text-2xl font-bold tracking-tight text-ink">
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[1.5rem] bg-white ring-1 ring-border">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-ink">Upcoming sessions</h2>
          <Link
            href="/dashboard/bookings"
            className="text-sm font-medium text-accent hover:text-accent-dark"
          >
            View all
          </Link>
        </div>

        {nextSessions.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-muted">
            No upcoming bookings yet. Share your public profile to get started.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {nextSessions.map((booking) => (
              <li
                key={booking.id}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div>
                  <p className="font-semibold text-ink">
                    {booking.sessionType.title}
                  </p>
                  <p className="text-sm text-muted">{booking.clientName}</p>
                </div>
                <p className="text-sm font-medium text-ink">
                  {formatInTimeZone(
                    booking.startTime,
                    coach.timezone,
                    "EEE, MMM d · h:mm a",
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
