"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import {
  createCoachSessionType,
  deleteCoachSessionType,
  updateCoachSessionType,
} from "@/lib/dashboard/session-types";
import {
  isValidSlug,
  slugifyTitle,
  type SessionTypeInput,
} from "@/lib/dashboard/session-type-fields";

export type SessionTypeActionState = {
  ok?: boolean;
  error?: string;
  message?: string;
};

const HEX_COLOR = /^#([0-9a-fA-F]{6})$/;

async function requireDashboardCoach() {
  const coach = await getDashboardCoach();
  if (!coach) {
    throw new Error("Coach not found.");
  }
  return coach;
}

function revalidateSessionTypePaths(username: string, slug?: string) {
  revalidatePath("/dashboard/session-types");
  revalidatePath(`/${username}`);
  if (slug) {
    revalidatePath(`/${username}/${slug}`);
  }
}

function parseSessionTypeForm(formData: FormData): {
  input?: SessionTypeInput;
  error?: string;
} {
  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const descriptionRaw = String(formData.get("description") ?? "").trim();
  const durationRaw = String(formData.get("duration") ?? "");
  const priceRaw = String(formData.get("price") ?? "").trim();
  const color = String(formData.get("color") ?? "#7B68C7").trim();
  const isActive = formData.get("isActive") === "on";

  if (!title) {
    return { error: "Title is required." };
  }

  if (!slug) {
    slug = slugifyTitle(title);
  }

  if (!isValidSlug(slug)) {
    return {
      error: "Slug must be lowercase letters, numbers, and hyphens only.",
    };
  }

  const duration = Number.parseInt(durationRaw, 10);
  if (!Number.isFinite(duration) || duration < 5 || duration > 480) {
    return { error: "Duration must be between 5 and 480 minutes." };
  }

  let price: number | null = null;
  if (priceRaw !== "") {
    const dollars = Number.parseFloat(priceRaw);
    if (!Number.isFinite(dollars) || dollars < 0) {
      return { error: "Price must be a non-negative dollar amount." };
    }
    price = Math.round(dollars * 100);
  }

  if (!HEX_COLOR.test(color)) {
    return { error: "Color must be a hex value like #7B68C7." };
  }

  return {
    input: {
      title,
      slug,
      description: descriptionRaw || null,
      duration,
      price,
      color,
      isActive,
    },
  };
}

export async function createSessionTypeAction(
  _prev: SessionTypeActionState,
  formData: FormData,
): Promise<SessionTypeActionState> {
  try {
    const coach = await requireDashboardCoach();
    const parsed = parseSessionTypeForm(formData);
    if (parsed.error || !parsed.input) {
      return { error: parsed.error ?? "Invalid form data." };
    }

    await createCoachSessionType(coach.id, parsed.input);
    revalidateSessionTypePaths(coach.username, parsed.input.slug);
    return { ok: true, message: "Session type created." };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "That slug is already in use. Pick another." };
    }
    console.error(error);
    return { error: "Could not create session type." };
  }
}

export async function updateSessionTypeAction(
  _prev: SessionTypeActionState,
  formData: FormData,
): Promise<SessionTypeActionState> {
  try {
    const coach = await requireDashboardCoach();
    const sessionTypeId = String(formData.get("sessionTypeId") ?? "");
    if (!sessionTypeId) {
      return { error: "Missing session type id." };
    }

    const parsed = parseSessionTypeForm(formData);
    if (parsed.error || !parsed.input) {
      return { error: parsed.error ?? "Invalid form data." };
    }

    const result = await updateCoachSessionType(
      coach.id,
      sessionTypeId,
      parsed.input,
    );
    if (result.count === 0) {
      return { error: "Session type not found." };
    }

    revalidateSessionTypePaths(coach.username, parsed.input.slug);
    return { ok: true, message: "Session type updated." };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "That slug is already in use. Pick another." };
    }
    console.error(error);
    return { error: "Could not update session type." };
  }
}

export async function deleteSessionTypeAction(
  sessionTypeId: string,
): Promise<SessionTypeActionState> {
  try {
    const coach = await requireDashboardCoach();
    const result = await deleteCoachSessionType(coach.id, sessionTypeId);

    if (result === "not_found") {
      return { error: "Session type not found." };
    }
    if (result === "has_bookings") {
      return {
        error:
          "This session has bookings. Deactivate it instead of deleting.",
      };
    }

    revalidateSessionTypePaths(coach.username);
    return { ok: true, message: "Session type deleted." };
  } catch (error) {
    console.error(error);
    return { error: "Could not delete session type." };
  }
}
