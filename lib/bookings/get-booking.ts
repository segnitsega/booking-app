import { prisma } from "@/lib/prisma";

export async function getBookingById(bookingId: string) {
  return prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      coach: {
        select: {
          id: true,
          name: true,
          username: true,
          timezone: true,
          avatarUrl: true,
        },
      },
      sessionType: {
        select: {
          id: true,
          title: true,
          slug: true,
          duration: true,
          price: true,
          description: true,
        },
      },
    },
  });
}

export type BookingDetails = NonNullable<
  Awaited<ReturnType<typeof getBookingById>>
>;
