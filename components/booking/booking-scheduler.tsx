"use client";

import { useMemo, useState } from "react";
import { format, startOfDay, startOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import { SlotPicker } from "@/components/booking/slot-picker";
import { TimezonePicker } from "@/components/booking/timezone-picker";
import {
  getMockAvailableDates,
  getMockAvailableSlots,
} from "@/lib/mock-slots";

type BookingSchedulerProps = {
  durationMinutes: number;
  coachTimezone: string;
};

export function BookingScheduler({
  durationMinutes,
  coachTimezone,
}: BookingSchedulerProps) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [timezone, setTimezone] = useState(
    () =>
      (typeof Intl !== "undefined" &&
        Intl.DateTimeFormat().resolvedOptions().timeZone) ||
      coachTimezone,
  );

  const availableDates = useMemo(
    () => getMockAvailableDates(startOfDay(new Date()), 60),
    [],
  );

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return getMockAvailableSlots(selectedDate, durationMinutes);
  }, [selectedDate, durationMinutes]);

  const selectedDateLabel = selectedDate
    ? format(selectedDate, "EEE, MMM d")
    : null;

  return (
    <div className="space-y-5">
      <div className="rounded-[1.75rem] bg-white p-5 ring-1 ring-border sm:p-6">
        <TimezonePicker value={timezone} onChange={setTimezone} />
        <p className="mt-3 text-xs text-muted">
          Times are shown for your timezone. Coach timezone: {coachTimezone}.
        </p>
      </div>

      <BookingCalendar
        month={month}
        selectedDate={selectedDate}
        availableDates={availableDates}
        onMonthChange={(next) => {
          setMonth(startOfMonth(next));
        }}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setSelectedSlot(null);
        }}
      />

      <SlotPicker
        selectedDateLabel={selectedDateLabel}
        slots={slots}
        selectedSlot={selectedSlot}
        onSelectSlot={setSelectedSlot}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {selectedDate && selectedSlot
            ? `Selected ${selectedDateLabel} at ${selectedSlot} (${timezone})`
            : "Select a date and time to continue."}
        </p>
        <Button
          type="button"
          variant="accent"
          disabled={!selectedDate || !selectedSlot}
          className="disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
