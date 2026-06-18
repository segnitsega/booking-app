"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createBooking } from "@/lib/bookings/create-booking";

export type CreateBookingState = {
  error?: string;
};

export async function createBookingAction(
  _prevState: CreateBookingState,
  formData: FormData,
): Promise<CreateBookingState> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Please sign in to book this session." };
  }

  const coachId = String(formData.get("coachId") ?? "");
  const sessionTypeId = String(formData.get("sessionTypeId") ?? "");
  const startUtc = String(formData.get("startUtc") ?? "");
  const clientTimezone = String(formData.get("clientTimezone") ?? "UTC");
  const clientName = String(formData.get("clientName") ?? "");
  const clientEmail = String(formData.get("clientEmail") ?? "");
  const clientNotes = String(formData.get("clientNotes") ?? "");
  const username = String(formData.get("username") ?? "");
  const sessionSlug = String(formData.get("sessionSlug") ?? "");

  const result = await createBooking({
    coachId,
    sessionTypeId,
    startUtc,
    clientTimezone,
    clientName,
    clientEmail,
    clientNotes,
  });

  if (!result.ok) {
    return { error: result.error };
  }

  redirect(
    `/${username}/${sessionSlug}/confirmed?bookingId=${result.bookingId}`,
  );
}
