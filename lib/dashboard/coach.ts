import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { slugifyTitle } from "@/lib/dashboard/session-type-fields";
import { getRoleFromUser } from "@/lib/auth/roles";

const coachSelect = {
  id: true,
  name: true,
  username: true,
  timezone: true,
  avatarUrl: true,
  bio: true,
} as const;

async function uniqueUsername(base: string): Promise<string> {
  const cleaned = slugifyTitle(base) || "coach";
  let candidate = cleaned.slice(0, 40);
  let attempt = 0;

  while (attempt < 20) {
    const existing = await prisma.coach.findUnique({
      where: { username: candidate },
      select: { id: true },
    });
    if (!existing) {
      return candidate;
    }
    attempt += 1;
    candidate = `${cleaned.slice(0, 32)}-${attempt}`;
  }

  return `${cleaned.slice(0, 24)}-${Date.now().toString(36)}`;
}

async function ensureCoachPublicMetadata(userId: string) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: "coach" },
  });
}

/**
 * Resolve the signed-in Clerk user to a Coach row.
 * Only users with the coach role may access / create a coach profile.
 * Clients never receive a Coach row from this path.
 */
export async function getDashboardCoach() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const role = getRoleFromUser(user);
  if (role !== "coach") {
    return null;
  }

  // Persist role on publicMetadata so client components can read it.
  if (user.publicMetadata?.role !== "coach") {
    await ensureCoachPublicMetadata(userId);
  }

  const existing = await prisma.coach.findUnique({
    where: { clerkUserId: userId },
    select: coachSelect,
  });
  if (existing) {
    return existing;
  }

  const claimUsername = process.env.DEMO_CLAIM_USERNAME?.trim();
  if (claimUsername) {
    const demo = await prisma.coach.findUnique({
      where: { username: claimUsername },
      select: { id: true, clerkUserId: true },
    });

    if (demo?.clerkUserId.startsWith("user_demo")) {
      return prisma.coach.update({
        where: { id: demo.id },
        data: { clerkUserId: userId },
        select: coachSelect,
      });
    }
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.username ||
    user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Coach";

  const emailLocal =
    user.primaryEmailAddress?.emailAddress?.split("@")[0] ??
    user.username ??
    fullName;

  const username = await uniqueUsername(emailLocal);
  const avatarUrl = user.imageUrl || null;

  return prisma.coach.create({
    data: {
      clerkUserId: userId,
      name: fullName,
      username,
      avatarUrl,
      timezone: "America/New_York",
      availability: {
        create: [
          { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 5, startTime: "09:00", endTime: "13:00" },
        ],
      },
    },
    select: coachSelect,
  });
}

export type DashboardCoach = NonNullable<
  Awaited<ReturnType<typeof getDashboardCoach>>
>;
