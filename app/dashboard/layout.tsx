import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import { getRoleFromUser } from "@/lib/auth/roles";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  const user = await currentUser();
  const role = getRoleFromUser(user);

  if (role !== "coach") {
    redirect("/access-denied");
  }

  const coach = await getDashboardCoach();

  if (!coach) {
    redirect("/access-denied");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface">
      <DashboardNav coachName={coach.name} coachUsername={coach.username} />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}
