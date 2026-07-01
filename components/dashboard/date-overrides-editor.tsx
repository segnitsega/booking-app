"use client";

import { useActionState, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  createDateOverrideAction,
  deleteDateOverrideAction,
  type AvailabilityActionState,
} from "@/lib/dashboard/availability-actions";

type OverrideItem = {
  id: string;
  dateLabel: string;
  isBlocked: boolean;
  startTime: string | null;
  endTime: string | null;
};

type DateOverridesEditorProps = {
  initialOverrides: OverrideItem[];
};

const initialActionState: AvailabilityActionState = {};

export function DateOverridesEditor({
  initialOverrides,
}: DateOverridesEditorProps) {
  const [mode, setMode] = useState<"blocked" | "special">("blocked");
  const [state, formAction, pending] = useActionState(
    createDateOverrideAction,
    initialActionState,
  );
  const [isPendingDelete, startDeleteTransition] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function onDelete(overrideId: string) {
    setDeleteError(null);
    startDeleteTransition(async () => {
      const result = await deleteDateOverrideAction(overrideId);
      if (result.error) {
        setDeleteError(result.error);
      }
    });
  }

  return (
    <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-border sm:p-6">
      <h2 className="text-xl font-bold tracking-tight text-ink">
        Date overrides
      </h2>
      <p className="mt-1 text-sm text-muted">
        Block a day off or set special hours for a specific date.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Date</span>
          <input
            type="date"
            name="dateYmd"
            required
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>

        <div className="flex gap-2 rounded-full bg-surface p-1">
          <button
            type="button"
            onClick={() => setMode("blocked")}
            className={[
              "flex-1 rounded-full px-3 py-2 text-sm font-medium",
              mode === "blocked"
                ? "bg-accent text-white"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            Day off
          </button>
          <button
            type="button"
            onClick={() => setMode("special")}
            className={[
              "flex-1 rounded-full px-3 py-2 text-sm font-medium",
              mode === "special"
                ? "bg-accent text-white"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            Special hours
          </button>
        </div>
        <input type="hidden" name="mode" value={mode} />

        {mode === "special" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1.5 block font-medium text-ink">Start</span>
              <input
                type="time"
                name="startTime"
                defaultValue="10:00"
                className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-accent"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1.5 block font-medium text-ink">End</span>
              <input
                type="time"
                name="endTime"
                defaultValue="14:00"
                className="w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-accent"
              />
            </label>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {state.error ? (
              <span className="text-red-600">{state.error}</span>
            ) : state.message ? (
              <span className="text-accent">{state.message}</span>
            ) : (
              "Overrides replace weekly hours for that date."
            )}
          </p>
          <Button
            type="submit"
            variant="accent"
            disabled={pending}
            className="disabled:opacity-60"
          >
            {pending ? "Saving..." : "Add override"}
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-ink">Upcoming overrides</h3>
        {deleteError ? (
          <p className="mt-2 text-sm text-red-600">{deleteError}</p>
        ) : null}

        {initialOverrides.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No upcoming overrides.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border rounded-2xl ring-1 ring-border">
            {initialOverrides.map((override) => (
              <li
                key={override.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">
                    {override.dateLabel}
                  </p>
                  <p className="text-xs text-muted">
                    {override.isBlocked
                      ? "Day off"
                      : `Special hours · ${override.startTime} – ${override.endTime}`}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isPendingDelete}
                  onClick={() => onDelete(override.id)}
                  className="text-sm font-medium text-muted hover:text-red-600 disabled:opacity-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
