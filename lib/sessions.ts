import { prisma } from "@/lib/prisma";

export async function getSessionForBooking(
  username: string,
  sessionSlug: string,
) {
  const coach = await prisma.coach.findUnique({
    where: { username },
    include: {
      sessionTypes: {
        where: {
          slug: sessionSlug,
          isActive: true,
        },
      },
    },
  });

  if (!coach || coach.sessionTypes.length === 0) {
    return null;
  }

  return {
    coach: {
      id: coach.id,
      name: coach.name,
      username: coach.username,
      avatarUrl: coach.avatarUrl,
      timezone: coach.timezone,
      bio: coach.bio,
    },
    session: coach.sessionTypes[0],
  };
}

export type BookingSessionPayload = NonNullable<
  Awaited<ReturnType<typeof getSessionForBooking>>
>;
