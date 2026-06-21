"use client";

import { useEffect, useState } from "react";
import { format, parseISO, startOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import { BookingForm } from "@/components/booking/booking-form";
import { SlotPicker } from "@/components/booking/slot-picker";
import { TimezonePicker } from "@/components/booking/timezone-picker";
import type { AvailableSlot } from "@/lib/availability";

type BookingSchedulerProps = {
  coachId: string;
  sessionTypeId: string;
  coachTimezone: string;
  username: string;
  sessionSlug: string;
};

function toLocalDate(dateYmd: string): Date {
  return parseISO(`${dateYmd}T12:00:00`);
}

export function BookingScheduler({
  coachId,
  sessionTypeId,
  coachTimezone,
  username,
  sessionSlug,
}: BookingSchedulerProps) {
  const [step, setStep] = useState<"schedule" | "details">("schedule");
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [timezone, setTimezone] = useState(
    () =>
      (typeof Intl !== "undefined" &&
        Intl.DateTimeFormat().resolvedOptions().timeZone) ||
      coachTimezone,
  );
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDates() {
      setLoadingDates(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          coachId,
          sessionTypeId,
          clientTimezone: timezone,
          days: "60",
        });
        const response = await fetch(`/api/availability/dates?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load available dates.");
        }

        const data = (await response.json()) as { dates: string[] };
        setAvailableDates(data.dates.map(toLocalDate));
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError("Could not load availability. Please try again.");
        setAvailableDates([]);
      } finally {
        setLoadingDates(false);
      }
    }

    void loadDates();
    return () => controller.abort();
  }, [coachId, sessionTypeId, timezone]);

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    const controller = new AbortController();
    const dateYmd = format(selectedDate, "yyyy-MM-dd");

    async function loadSlots() {
      setLoadingSlots(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          coachId,
          sessionTypeId,
          date: dateYmd,
          clientTimezone: timezone,
        });
        const response = await fetch(`/api/availability/slots?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load slots.");
        }

        const data = (await response.json()) as { slots: AvailableSlot[] };
        setSlots(data.slots);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError("Could not load time slots. Please try again.");
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }

    void loadSlots();
    return () => controller.abort();
  }, [coachId, sessionTypeId, selectedDate, timezone]);

  const selectedDateLabel = selectedDate
    ? format(selectedDate, "EEE, MMM d")
    : null;

  if (step === "details" && selectedSlot && selectedDateLabel) {
    return (
      <BookingForm
        coachId={coachId}
        sessionTypeId={sessionTypeId}
        username={username}
        sessionSlug={sessionSlug}
        clientTimezone={timezone}
        selectedSlot={selectedSlot}
        selectedDateLabel={selectedDateLabel}
        onBack={() => setStep("schedule")}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[1.75rem] bg-white p-5 ring-1 ring-border sm:p-6">
        <TimezonePicker value={timezone} onChange={setTimezone} />
        <p className="mt-3 text-xs text-muted">
          Times are shown in your timezone. Coach timezone: {coachTimezone}.
        </p>
      </div>

      <BookingCalendar
        month={month}
        selectedDate={selectedDate}
        availableDates={availableDates}
        isLoading={loadingDates}
        onMonthChange={(next) => setMonth(startOfMonth(next))}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setSelectedSlot(null);
        }}
      />

      <SlotPicker
        selectedDateLabel={selectedDateLabel}
        slots={slots}
        selectedSlot={selectedSlot}
        isLoading={loadingSlots}
        onSelectSlot={setSelectedSlot}
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {selectedDate && selectedSlot
            ? `Selected ${selectedDateLabel} at ${selectedSlot.label} (${timezone})`
            : "Select a date and time to continue."}
        </p>
        <Button
          type="button"
          variant="accent"
          disabled={!selectedDate || !selectedSlot}
          className="disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setStep("details")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
