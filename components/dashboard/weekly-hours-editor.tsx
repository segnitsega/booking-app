"use client";

import { useActionState, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  saveWeeklyAvailabilityAction,
  type AvailabilityActionState,
} from "@/lib/dashboard/availability-actions";
import {
  WEEK_DAYS,
  type WeeklyHourInput,
} from "@/lib/dashboard/availability";

type DayState = WeeklyHourInput;

type WeeklyHoursEditorProps = {
  initialDays: DayState[];
};

const initialActionState: AvailabilityActionState = {};

export function WeeklyHoursEditor({ initialDays }: WeeklyHoursEditorProps) {
  const [days, setDays] = useState<DayState[]>(initialDays);
  const [activeDay, setActiveDay] = useState<number | null>(
    initialDays.find((day) => day.enabled)?.dayOfWeek ?? 1,
  );
  const [state, formAction, pending] = useActionState(
    saveWeeklyAvailabilityAction,
    initialActionState,
  );

  const daysJson = useMemo(() => JSON.stringify(days), [days]);

  function updateDay(dayOfWeek: number, patch: Partial<DayState>) {
    setDays((current) =>
      current.map((day) =>
        day.dayOfWeek === dayOfWeek ? { ...day, ...patch } : day,
      ),
    );
  }

  return (
    <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-border sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">
            Weekly hours
          </h2>
          <p className="mt-1 text-sm text-muted">
            Expand a day to set hours. Disabled days stay closed.
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {WEEK_DAYS.map((meta) => {
          const day = days.find((item) => item.dayOfWeek === meta.dayOfWeek)!;
          const active = activeDay === meta.dayOfWeek;

          return (
            <li key={meta.dayOfWeek}>
              <button
                type="button"
                onClick={() =>
                  setActiveDay(active ? null : meta.dayOfWeek)
                }
                className={[
                  "flex w-full items-center justify-between gap-3 rounded-[1.25rem] px-4 py-3 text-left transition-colors",
                  active
                    ? "bg-accent text-white"
                    : "bg-surface text-ink hover:bg-accent-soft/70",
                ].join(" ")}
              >
                <div>
                  <p className="font-semibold">{meta.label}</p>
                  <p
                    className={[
                      "mt-0.5 text-sm",
                      active ? "text-white/75" : "text-muted",
                    ].join(" ")}
                  >
                    {day.enabled
                      ? `${day.startTime} – ${day.endTime}`
                      : "Unavailable"}
                  </p>
                </div>
                <span
                  className={[
                    "flex size-9 items-center justify-center rounded-full",
                    active ? "bg-white text-accent" : "bg-white text-ink",
                  ].join(" ")}
                >
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </button>

              {active ? (
                <div className="mt-2 rounded-[1.25rem] bg-accent p-4 text-white">
                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={day.enabled}
                      onChange={(event) =>
                        updateDay(meta.dayOfWeek, {
                          enabled: event.target.checked,
                          startTime: day.startTime || "09:00",
                          endTime: day.endTime || "17:00",
                        })
                      }
                      className="size-4 rounded border-white/30"
                    />
                    Available on {meta.label}
                  </label>

                  {day.enabled ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="text-sm">
                        <span className="mb-1.5 block text-white/75">
                          Start
                        </span>
                        <input
                          type="time"
                          value={day.startTime}
                          onChange={(event) =>
                            updateDay(meta.dayOfWeek, {
                              startTime: event.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-white outline-none"
                        />
                      </label>
                      <label className="text-sm">
                        <span className="mb-1.5 block text-white/75">End</span>
                        <input
                          type="time"
                          value={day.endTime}
                          onChange={(event) =>
                            updateDay(meta.dayOfWeek, {
                              endTime: event.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-white outline-none"
                        />
                      </label>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <form action={formAction} className="mt-6">
        <input type="hidden" name="daysJson" value={daysJson} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {state.error ? (
              <span className="text-red-600">{state.error}</span>
            ) : state.message ? (
              <span className="text-accent">{state.message}</span>
            ) : (
              "Changes apply to new bookings immediately."
            )}
          </p>
          <Button
            type="submit"
            variant="accent"
            disabled={pending}
            className="disabled:opacity-60"
          >
            {pending ? "Saving..." : "Save weekly hours"}
          </Button>
        </div>
      </form>
    </section>
  );
}
