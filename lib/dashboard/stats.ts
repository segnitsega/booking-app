import { prisma } from "@/lib/prisma";

/** Lightweight stats for the dashboard home. */
export async function getCoachBookingStats(coachId: string) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [upcomingCount, monthBookings, cancelledCount] = await Promise.all([
    prisma.booking.count({
      where: {
        coachId,
        status: "CONFIRMED",
        startTime: { gte: now },
      },
    }),
    prisma.booking.findMany({
      where: {
        coachId,
        status: { in: ["CONFIRMED", "COMPLETED"] },
        startTime: { gte: monthStart },
      },
      select: {
        sessionType: { select: { price: true } },
      },
    }),
    prisma.booking.count({
      where: {
        coachId,
        status: "CANCELLED",
      },
    }),
  ]);

  const monthRevenueCents = monthBookings.reduce((total, booking) => {
    return total + (booking.sessionType.price ?? 0);
  }, 0);

  return {
    upcomingCount,
    monthBookingCount: monthBookings.length,
    monthRevenueCents,
    cancelledCount,
  };
}
