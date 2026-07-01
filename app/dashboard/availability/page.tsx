import { notFound } from "next/navigation";
import { formatInTimeZone } from "date-fns-tz";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import {
  getCoachDateOverrides,
  getCoachWeeklyAvailability,
  WEEK_DAYS,
  type WeeklyHourInput,
} from "@/lib/dashboard/availability";
import { WeeklyHoursEditor } from "@/components/dashboard/weekly-hours-editor";
import { DateOverridesEditor } from "@/components/dashboard/date-overrides-editor";

function buildInitialDays(
  rows: Awaited<ReturnType<typeof getCoachWeeklyAvailability>>,
): WeeklyHourInput[] {
  return WEEK_DAYS.map((day) => {
    const match = rows.find((row) => row.dayOfWeek === day.dayOfWeek);
    return {
      dayOfWeek: day.dayOfWeek,
      enabled: Boolean(match),
      startTime: match?.startTime ?? "09:00",
      endTime: match?.endTime ?? "17:00",
    };
  });
}

export default async function DashboardAvailabilityPage() {
  const coach = await getDashboardCoach();
  if (!coach) {
    notFound();
  }

  const [weekly, overrides] = await Promise.all([
    getCoachWeeklyAvailability(coach.id),
    getCoachDateOverrides(coach.id),
  ]);

  return (
    <div>
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        Dashboard
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        Availability
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Set your recurring weekly hours and one-off overrides. Times are stored
        in your coach timezone ({coach.timezone}).
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <WeeklyHoursEditor initialDays={buildInitialDays(weekly)} />
        <DateOverridesEditor
          initialOverrides={overrides.map((override) => ({
            id: override.id,
            dateLabel: formatInTimeZone(
              override.date,
              coach.timezone,
              "EEE, MMM d yyyy",
            ),
            isBlocked: override.isBlocked,
            startTime: override.startTime,
            endTime: override.endTime,
          }))}
        />
      </div>
    </div>
  );
}
