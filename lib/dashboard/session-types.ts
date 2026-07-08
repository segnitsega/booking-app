import { prisma } from "@/lib/prisma";
import type {
  SessionTypeInput,
  SessionTypeListItem,
} from "@/lib/dashboard/session-type-fields";

export type { SessionTypeInput, SessionTypeListItem };
export {
  isValidSlug,
  slugifyTitle,
} from "@/lib/dashboard/session-type-fields";

export async function listCoachSessionTypes(
  coachId: string,
): Promise<SessionTypeListItem[]> {
  const rows = await prisma.sessionType.findMany({
    where: { coachId },
    orderBy: [{ isActive: "desc" }, { duration: "asc" }, { title: "asc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      duration: true,
      price: true,
      color: true,
      isActive: true,
      _count: { select: { bookings: true } },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    duration: row.duration,
    price: row.price,
    color: row.color,
    isActive: row.isActive,
    bookingCount: row._count.bookings,
  }));
}

export async function createCoachSessionType(
  coachId: string,
  input: SessionTypeInput,
) {
  return prisma.sessionType.create({
    data: {
      coachId,
      title: input.title,
      slug: input.slug,
      description: input.description,
      duration: input.duration,
      price: input.price,
      color: input.color,
      isActive: input.isActive,
    },
  });
}

export async function updateCoachSessionType(
  coachId: string,
  sessionTypeId: string,
  input: SessionTypeInput,
) {
  return prisma.sessionType.updateMany({
    where: { id: sessionTypeId, coachId },
    data: {
      title: input.title,
      slug: input.slug,
      description: input.description,
      duration: input.duration,
      price: input.price,
      color: input.color,
      isActive: input.isActive,
    },
  });
}

/**
 * Hard-delete when unused. Returns "deleted" | "has_bookings".
 * Callers should deactivate types that already have bookings.
 */
export async function deleteCoachSessionType(
  coachId: string,
  sessionTypeId: string,
): Promise<"deleted" | "has_bookings" | "not_found"> {
  const existing = await prisma.sessionType.findFirst({
    where: { id: sessionTypeId, coachId },
    select: {
      id: true,
      _count: { select: { bookings: true } },
    },
  });

  if (!existing) {
    return "not_found";
  }

  if (existing._count.bookings > 0) {
    return "has_bookings";
  }

  await prisma.sessionType.delete({ where: { id: sessionTypeId } });
  return "deleted";
}
