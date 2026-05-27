import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const demoClerkUserId = "user_demo_slotwise_coach";

  await prisma.booking.deleteMany();
  await prisma.dateOverride.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.sessionType.deleteMany();
  await prisma.coach.deleteMany({ where: { clerkUserId: demoClerkUserId } });

  const coach = await prisma.coach.create({
    data: {
      clerkUserId: demoClerkUserId,
      name: "Alex Rivera",
      username: "alex",
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
    },
    include: {
      sessionTypes: true,
      availability: true,
    },
  });

  console.log("Seeded coach:", {
    username: coach.username,
    sessionTypes: coach.sessionTypes.map((s) => s.slug),
    availabilityDays: coach.availability.map((a) => a.dayOfWeek),
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
