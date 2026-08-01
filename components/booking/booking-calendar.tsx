"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BookingCalendarProps = {
  month: Date;
  selectedDate: Date | null;
  availableDates: Date[];
  isLoading?: boolean;
  onMonthChange: (month: Date) => void;
  onSelectDate: (date: Date) => void;
};

export function BookingCalendar({
  month,
  selectedDate,
  availableDates,
  isLoading = false,
  onMonthChange,
  onSelectDate,
}: BookingCalendarProps) {
  const today = startOfDay(new Date());
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  const isAvailable = (date: Date) =>
    availableDates.some((available) => isSameDay(available, date));

  return (
    <div className="rounded-[1.75rem] bg-white p-5 ring-1 ring-border sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-ink">
          {format(month, "MMMM yyyy")}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMonthChange(subMonths(month, 1))}
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(addMonths(month, 1))}
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium tracking-wide text-muted uppercase">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={`${day}-${index}`} className="py-2 sm:hidden">
                {day}
              </div>
            ))}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="hidden py-2 sm:block">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square animate-pulse rounded-2xl bg-surface"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium tracking-wide text-muted uppercase">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={`${day}-${index}`} className="py-2 sm:hidden">
                {day}
              </div>
            ))}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="hidden py-2 sm:block">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {days.map((day) => {
              const inMonth = isSameMonth(day, month);
              const available =
                inMonth && isAvailable(day) && !isBefore(day, today);
              const selected = selectedDate
                ? isSameDay(day, selectedDate)
                : false;

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={!available}
                  onClick={() => onSelectDate(day)}
                  className={[
                    "aspect-square rounded-2xl text-sm font-semibold transition-colors",
                    !inMonth ? "text-transparent" : "",
                    inMonth && !available ? "text-muted/40" : "",
                    available && !selected
                      ? "text-ink hover:bg-accent-soft hover:text-accent"
                      : "",
                    selected ? "bg-accent text-white" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {inMonth ? format(day, "d") : ""}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
