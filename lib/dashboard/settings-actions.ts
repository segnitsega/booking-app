"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { getDashboardCoach } from "@/lib/dashboard/coach";
import {
  isUsernameAvailable,
  isValidUsername,
  updateCoachProfile,
  type CoachProfileInput,
} from "@/lib/dashboard/settings";
import { isKnownTimezone } from "@/lib/dashboard/timezones";

export type SettingsActionState = {
  ok?: boolean;
  error?: string;
  message?: string;
};

async function requireDashboardCoach() {
  const coach = await getDashboardCoach();
  if (!coach) {
    throw new Error("Coach not found.");
  }
  return coach;
}

function parseProfileForm(formData: FormData): {
  input?: CoachProfileInput;
  error?: string;
} {
  const name = String(formData.get("name") ?? "").trim();
  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();
  const bioRaw = String(formData.get("bio") ?? "").trim();
  const avatarRaw = String(formData.get("avatarUrl") ?? "").trim();
  const timezone = String(formData.get("timezone") ?? "").trim();

  if (!name || name.length < 2) {
    return { error: "Name must be at least 2 characters." };
  }
  if (name.length > 80) {
    return { error: "Name is too long." };
  }

  if (!isValidUsername(username)) {
    return {
      error:
        "Username must be 3+ characters: lowercase letters, numbers, and hyphens.",
    };
  }

  if (bioRaw.length > 600) {
    return { error: "Bio must be 600 characters or fewer." };
  }

  if (avatarRaw) {
    try {
      const url = new URL(avatarRaw);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return { error: "Avatar URL must start with http:// or https://." };
      }
    } catch {
      return { error: "Avatar URL looks invalid." };
    }
  }

  if (!timezone) {
    return { error: "Pick a valid timezone." };
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
  } catch {
    return { error: "Pick a valid timezone." };
  }

  // Prefer curated zones, but keep any valid IANA zone the coach already uses.
  if (!isKnownTimezone(timezone) && timezone.length > 64) {
    return { error: "Pick a valid timezone." };
  }

  return {
    input: {
      name,
      username,
      bio: bioRaw || null,
      avatarUrl: avatarRaw || null,
      timezone,
    },
  };
}

export async function updateCoachSettingsAction(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  try {
    const coach = await requireDashboardCoach();
    const previousUsername = coach.username;
    const parsed = parseProfileForm(formData);

    if (parsed.error || !parsed.input) {
      return { error: parsed.error ?? "Invalid form data." };
    }

    const available = await isUsernameAvailable(
      parsed.input.username,
      coach.id,
    );
    if (!available) {
      return { error: "That username is already taken." };
    }

    await updateCoachProfile(coach.id, parsed.input);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard/availability");
    revalidatePath(`/${previousUsername}`);
    if (parsed.input.username !== previousUsername) {
      revalidatePath(`/${parsed.input.username}`);
    }

    return { ok: true, message: "Profile settings saved." };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "That username is already taken." };
    }
    console.error(error);
    return { error: "Could not save settings." };
  }
}
