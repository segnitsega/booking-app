"use client";

import { useState } from "react";
import { CalendarDays, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Portfolio mock — UI only. Real Google Calendar OAuth can land later.
 */
export function GoogleCalendarConnectCard() {
  const [connected, setConnected] = useState(false);
  const [pending, setPending] = useState(false);

  function onConnect() {
    setPending(true);
    window.setTimeout(() => {
      setConnected(true);
      setPending(false);
    }, 700);
  }

  function onDisconnect() {
    setConnected(false);
  }

  return (
    <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-border sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CalendarDays className="size-4" aria-hidden />
        </span>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">
            Google Calendar
          </h2>
          <p className="mt-1 text-sm text-muted">
            Sync booked sessions to your calendar. Demo connection only — no
            OAuth yet.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-surface px-4 py-4">
        {connected ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <Check className="size-4 text-accent" aria-hidden />
              Connected as demo@brandelevate.co
            </p>
            <button
              type="button"
              onClick={onDisconnect}
              className="text-sm font-medium text-muted hover:text-red-600"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">Not connected</p>
            <Button
              type="button"
              variant="accent"
              showArrow={false}
              disabled={pending}
              onClick={onConnect}
              className="px-4 py-2 disabled:opacity-60"
            >
              {pending ? "Connecting..." : "Connect Google Calendar"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
