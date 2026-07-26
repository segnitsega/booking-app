import { prisma } from "@/lib/prisma";
import { isValidSlug } from "@/lib/dashboard/session-type-fields";

export type CoachProfileInput = {
  name: string;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  timezone: string;
};

export function isValidUsername(username: string): boolean {
  return isValidSlug(username) && username.length >= 3;
}

export async function isUsernameAvailable(
  username: string,
  coachId: string,
): Promise<boolean> {
  const clash = await prisma.coach.findFirst({
    where: {
      username,
      NOT: { id: coachId },
    },
    select: { id: true },
  });
  return !clash;
}

export async function updateCoachProfile(
  coachId: string,
  input: CoachProfileInput,
) {
  return prisma.coach.update({
    where: { id: coachId },
    data: {
      name: input.name,
      username: input.username,
      bio: input.bio,
      avatarUrl: input.avatarUrl,
      timezone: input.timezone,
    },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      avatarUrl: true,
      timezone: true,
    },
  });
}
