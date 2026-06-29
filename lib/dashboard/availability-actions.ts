"use server";

import { revalidatePath } from "next/cache";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import {
  createCoachDateOverride,
  deleteCoachDateOverride,
  saveCoachWeeklyAvailability,
  type WeeklyHourInput,
} from "@/lib/dashboard/availability";
import { toMinutes } from "@/lib/availability/time";

export type AvailabilityActionState = {
  ok?: boolean;
  error?: string;
  message?: string;
};

function isHhMm(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

/** Normalize browser time inputs that may include seconds. */
function normalizeTime(value: string): string {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})/);
  if (!match) return value;
  return `${match[1].padStart(2, "0")}:${match[2]}`;
}

async function requireDashboardCoach() {
  const coach = await getDashboardCoach();
  if (!coach) {
    throw new Error("Coach not found.");
  }
  return coach;
}

export async function saveWeeklyAvailabilityAction(
  _prev: AvailabilityActionState,
  formData: FormData,
): Promise<AvailabilityActionState> {
  try {
    const coach = await requireDashboardCoach();
    const raw = String(formData.get("daysJson") ?? "[]");
    const days = JSON.parse(raw) as WeeklyHourInput[];

    if (!Array.isArray(days) || days.length !== 7) {
      return { error: "Invalid weekly availability payload." };
    }

    for (const day of days) {
      if (!day.enabled) continue;
      day.startTime = normalizeTime(day.startTime);
      day.endTime = normalizeTime(day.endTime);
      if (!isHhMm(day.startTime) || !isHhMm(day.endTime)) {
        return { error: "Use HH:mm times like 09:00." };
      }
      if (toMinutes(day.endTime) <= toMinutes(day.startTime)) {
        return { error: "End time must be after start time." };
      }
    }

    await saveCoachWeeklyAvailability(coach.id, days);
    revalidatePath("/dashboard/availability");

    return { ok: true, message: "Weekly hours saved." };
  } catch (error) {
    console.error(error);
    return { error: "Could not save weekly hours." };
  }
}

export async function createDateOverrideAction(
  _prev: AvailabilityActionState,
  formData: FormData,
): Promise<AvailabilityActionState> {
  try {
    const coach = await requireDashboardCoach();
    const dateYmd = String(formData.get("dateYmd") ?? "");
    const mode = String(formData.get("mode") ?? "blocked");
    const startTime = normalizeTime(
      String(formData.get("startTime") ?? "09:00"),
    );
    const endTime = normalizeTime(String(formData.get("endTime") ?? "17:00"));

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateYmd)) {
      return { error: "Pick a valid date." };
    }

    const isBlocked = mode !== "special";

    if (!isBlocked) {
      if (!isHhMm(startTime) || !isHhMm(endTime)) {
        return { error: "Use HH:mm times like 09:00." };
      }
      if (toMinutes(endTime) <= toMinutes(startTime)) {
        return { error: "End time must be after start time." };
      }
    }

    await createCoachDateOverride(coach.id, coach.timezone, {
      dateYmd,
      isBlocked,
      startTime: isBlocked ? null : startTime,
      endTime: isBlocked ? null : endTime,
    });

    revalidatePath("/dashboard/availability");
    return { ok: true, message: "Date override saved." };
  } catch (error) {
    console.error(error);
    return { error: "Could not save date override." };
  }
}

export async function deleteDateOverrideAction(
  overrideId: string,
): Promise<AvailabilityActionState> {
  try {
    const coach = await requireDashboardCoach();
    await deleteCoachDateOverride(coach.id, overrideId);
    revalidatePath("/dashboard/availability");
    return { ok: true, message: "Override removed." };
  } catch (error) {
    console.error(error);
    return { error: "Could not remove override." };
  }
}
