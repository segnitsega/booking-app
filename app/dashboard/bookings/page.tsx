import { notFound } from "next/navigation";
import { BookingsList } from "@/components/dashboard/bookings-list";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import {
  listCoachBookings,
  type BookingListFilter,
} from "@/lib/bookings/list-coach-bookings";

type BookingsPageProps = {
  searchParams: Promise<{ filter?: string }>;
};

function parseFilter(value?: string): BookingListFilter {
  if (value === "past" || value === "cancelled") {
    return value;
  }
  return "upcoming";
}

export default async function DashboardBookingsPage({
  searchParams,
}: BookingsPageProps) {
  const coach = await getDashboardCoach();
  if (!coach) {
    notFound();
  }

  const { filter: filterParam } = await searchParams;
  const filter = parseFilter(filterParam);
  const bookings = await listCoachBookings({
    coachId: coach.id,
    filter,
  });

  return (
    <BookingsList
      bookings={bookings}
      filter={filter}
      coachTimezone={coach.timezone}
      coachUsername={coach.username}
    />
  );
}
