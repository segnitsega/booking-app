import { prisma } from "@/lib/prisma";

/**
 * Temporary coach resolver for the dashboard until Clerk lands (Step 10).
 * Uses DEMO_COACH_USERNAME or falls back to the seeded "alex" coach.
 */
export async function getDashboardCoach() {
  const username = process.env.DEMO_COACH_USERNAME ?? "alex";

  return prisma.coach.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      timezone: true,
      avatarUrl: true,
      bio: true,
    },
  });
}

export type DashboardCoach = NonNullable<
  Awaited<ReturnType<typeof getDashboardCoach>>
>;
