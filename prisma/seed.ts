import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FEATURED_USERNAME = "home";
const DEMO_CLERK_USER_ID = "user_demo_slotwise_coach";

function hoursFromNow(hours: number) {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

async function main() {
  const existing = await prisma.coach.findUnique({
    where: { username: FEATURED_USERNAME },
    select: { id: true, clerkUserId: true },
  });

  const clerkUserId = existing?.clerkUserId ?? DEMO_CLERK_USER_ID;

  if (existing) {
    await prisma.booking.deleteMany({ where: { coachId: existing.id } });
    await prisma.dateOverride.deleteMany({ where: { coachId: existing.id } });
    await prisma.availability.deleteMany({ where: { coachId: existing.id } });
    await prisma.sessionType.deleteMany({ where: { coachId: existing.id } });
    await prisma.coach.delete({ where: { id: existing.id } });
  } else {
    await prisma.booking.deleteMany();
    await prisma.dateOverride.deleteMany();
    await prisma.availability.deleteMany();
    await prisma.sessionType.deleteMany();
    await prisma.coach.deleteMany({ where: { clerkUserId: DEMO_CLERK_USER_ID } });
  }

  const coach = await prisma.coach.create({
    data: {
      clerkUserId,
      name: "Alex Rivera",
      username: FEATURED_USERNAME,
      bio: "Business coach helping founders build personal brands and sustainable growth systems.",
      avatarUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      timezone: "America/New_York",
      sessionTypes: {
        create: [
          {
            title: "Discovery Call",
            slug: "discovery-call",
            description:
              "A focused intro session to clarify goals, challenges, and whether we are a fit to work together.",
            duration: 30,
            price: null,
            color: "#7B68C7",
            isActive: true,
          },
          {
            title: "Strategy Session",
            slug: "strategy-session",
            description:
              "A deep-dive working session to map priorities, messaging, and a 90-day action plan.",
            duration: 60,
            price: 15000,
            color: "#0B0B0F",
            isActive: true,
          },
        ],
      },
      availability: {
        create: [
          { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
          { dayOfWeek: 5, startTime: "09:00", endTime: "13:00" },
        ],
      },
      overrides: {
        create: [
          {
            // Block a day about two weeks out so the calendar has a day-off example.
            date: hoursFromNow(24 * 14),
            isBlocked: true,
          },
        ],
      },
    },
    include: {
      sessionTypes: true,
      availability: true,
    },
  });

  const discovery = coach.sessionTypes.find((s) => s.slug === "discovery-call");
  const strategy = coach.sessionTypes.find((s) => s.slug === "strategy-session");

  if (!discovery || !strategy) {
    throw new Error("Expected session types were not created.");
  }

  const bookings = [
    {
      sessionTypeId: discovery.id,
      clientName: "Morgan Ellis",
      clientEmail: "morgan.ellis@example.com",
      clientNotes: "Quick intro before committing to coaching.",
      startTime: hoursFromNow(24 * 3 + 2),
      endTime: hoursFromNow(24 * 3 + 2.5),
      status: "CONFIRMED" as const,
    },
    {
      sessionTypeId: strategy.id,
      clientName: "Jordan Lee",
      clientEmail: "jordan.lee@example.com",
      clientNotes: "Want to tighten messaging before a launch.",
      startTime: hoursFromNow(24 * 5 + 4),
      endTime: hoursFromNow(24 * 5 + 5),
      status: "CONFIRMED" as const,
    },
    {
      sessionTypeId: discovery.id,
      clientName: "Sam Patel",
      clientEmail: "sam.patel@example.com",
      clientNotes: "Cancelled after a scheduling conflict.",
      startTime: hoursFromNow(24 * 2 + 1),
      endTime: hoursFromNow(24 * 2 + 1.5),
      status: "CANCELLED" as const,
    },
    {
      sessionTypeId: strategy.id,
      clientName: "Casey Nguyen",
      clientEmail: "casey.nguyen@example.com",
      clientNotes: "Past strategy session.",
      startTime: hoursFromNow(-24 * 10),
      endTime: hoursFromNow(-24 * 10 + 1),
      status: "COMPLETED" as const,
    },
    {
      sessionTypeId: discovery.id,
      clientName: "Riley Brooks",
      clientEmail: "riley.brooks@example.com",
      clientNotes: null,
      startTime: hoursFromNow(-24 * 4),
      endTime: hoursFromNow(-24 * 4 + 0.5),
      status: "CONFIRMED" as const,
    },
  ];

  await prisma.booking.createMany({
    data: bookings.map((booking) => ({
      ...booking,
      coachId: coach.id,
    })),
  });

  console.log("Seeded coach:", {
    username: coach.username,
    clerkUserId: coach.clerkUserId,
    sessionTypes: coach.sessionTypes.map((s) => s.slug),
    availabilityDays: coach.availability.map((a) => a.dayOfWeek),
    bookings: bookings.map((b) => ({
      client: b.clientName,
      status: b.status,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
