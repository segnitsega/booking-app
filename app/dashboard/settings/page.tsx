import { notFound } from "next/navigation";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import { ProfileSettingsForm } from "@/components/dashboard/profile-settings-form";
import { GoogleCalendarConnectCard } from "@/components/dashboard/google-calendar-connect";

export default async function DashboardSettingsPage() {
  const coach = await getDashboardCoach();
  if (!coach) {
    notFound();
  }

  return (
    <div>
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        Dashboard
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        Settings
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Update how you appear publicly and how SlotWise interprets your
        working hours.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ProfileSettingsForm
          initial={{
            name: coach.name,
            username: coach.username,
            bio: coach.bio,
            avatarUrl: coach.avatarUrl,
            timezone: coach.timezone,
          }}
        />
        <GoogleCalendarConnectCard />
      </div>
    </div>
  );
}
