"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  createBookingAction,
  type CreateBookingState,
} from "@/lib/bookings/actions";
import type { AvailableSlot } from "@/lib/availability";

type BookingFormProps = {
  coachId: string;
  sessionTypeId: string;
  username: string;
  sessionSlug: string;
  clientTimezone: string;
  selectedSlot: AvailableSlot;
  selectedDateLabel: string;
  onBack: () => void;
};

const initialState: CreateBookingState = {};

export function BookingForm({
  coachId,
  sessionTypeId,
  username,
  sessionSlug,
  clientTimezone,
  selectedSlot,
  selectedDateLabel,
  onBack,
}: BookingFormProps) {
  const [state, formAction, pending] = useActionState(
    createBookingAction,
    initialState,
  );

  return (
    <div className="rounded-[1.75rem] bg-white p-5 ring-1 ring-border sm:p-6">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        ← Back to time selection
      </button>

      <h2 className="mt-5 text-xl font-bold tracking-tight text-ink">
        Your details
      </h2>
      <p className="mt-1 text-sm text-muted">
        Booking <span className="font-medium text-ink">{selectedDateLabel}</span>{" "}
        at <span className="font-medium text-ink">{selectedSlot.label}</span>
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <input type="hidden" name="coachId" value={coachId} />
        <input type="hidden" name="sessionTypeId" value={sessionTypeId} />
        <input type="hidden" name="startUtc" value={selectedSlot.startUtc} />
        <input type="hidden" name="clientTimezone" value={clientTimezone} />
        <input type="hidden" name="username" value={username} />
        <input type="hidden" name="sessionSlug" value={sessionSlug} />

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Full name</span>
          <input
            name="clientName"
            required
            minLength={2}
            placeholder="Alex Morgan"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Email</span>
          <input
            type="email"
            name="clientEmail"
            required
            placeholder="alex@email.com"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">
            Notes <span className="font-normal text-muted">(optional)</span>
          </span>
          <textarea
            name="clientNotes"
            rows={4}
            placeholder="Anything the coach should know before the session?"
            className="w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
          />
        </label>

        {state.error ? (
          <p className="text-sm text-red-600">{state.error}</p>
        ) : null}

        <Button
          type="submit"
          variant="accent"
          disabled={pending}
          className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {pending ? "Confirming..." : "Confirm booking"}
        </Button>
      </form>
    </div>
  );
}
