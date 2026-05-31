import { prisma } from "@/lib/prisma";

export async function getCoachByUsername(username: string) {
  return prisma.coach.findUnique({
    where: { username },
    include: {
      sessionTypes: {
        where: { isActive: true },
        orderBy: { duration: "asc" },
      },
    },
  });
}

export type CoachProfile = NonNullable<
  Awaited<ReturnType<typeof getCoachByUsername>>
>;
