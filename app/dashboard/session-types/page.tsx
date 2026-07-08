import { notFound } from "next/navigation";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import { listCoachSessionTypes } from "@/lib/dashboard/session-types";
import { SessionTypesManager } from "@/components/dashboard/session-types-manager";

export default async function DashboardSessionTypesPage() {
  const coach = await getDashboardCoach();
  if (!coach) {
    notFound();
  }

  const sessions = await listCoachSessionTypes(coach.id);

  return (
    <div>
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        Dashboard
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        Session types
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Create and manage the offers guests can book on your public profile.
      </p>

      <div className="mt-8">
        <SessionTypesManager
          initialSessions={sessions}
          coachUsername={coach.username}
        />
      </div>
    </div>
  );
}
