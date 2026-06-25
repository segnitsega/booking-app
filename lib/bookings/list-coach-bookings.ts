import { prisma } from "@/lib/prisma";
import type { BookingStatus } from "@prisma/client";

export type BookingListFilter = "upcoming" | "past" | "cancelled";

type ListCoachBookingsArgs = {
  coachId: string;
  filter?: BookingListFilter;
};

export async function listCoachBookings({
  coachId,
  filter = "upcoming",
}: ListCoachBookingsArgs) {
  const now = new Date();

  const where =
    filter === "cancelled"
      ? { coachId, status: "CANCELLED" as BookingStatus }
      : filter === "past"
        ? {
            coachId,
            status: { in: ["CONFIRMED", "COMPLETED"] as BookingStatus[] },
            endTime: { lt: now },
          }
        : {
            coachId,
            status: "CONFIRMED" as BookingStatus,
            startTime: { gte: now },
          };

  return prisma.booking.findMany({
    where,
    include: {
      sessionType: {
        select: {
          id: true,
          title: true,
          slug: true,
          duration: true,
          price: true,
        },
      },
    },
    orderBy: {
      startTime: filter === "past" ? "desc" : "asc",
    },
  });
}

export type CoachBookingListItem = Awaited<
  ReturnType<typeof listCoachBookings>
>[number];
