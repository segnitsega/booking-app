import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { getDashboardCoach } from "@/lib/dashboard/coach";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Belt-and-suspenders with proxy.ts route protection.
  await auth.protect();

  const coach = await getDashboardCoach();

  if (!coach) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface">
      <DashboardNav coachName={coach.name} coachUsername={coach.username} />
      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">{children}</div>
    </div>
  );
}
