"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { AvailableSlot } from "@/lib/availability";

type SlotPickerProps = {
  selectedDateLabel: string | null;
  slots: AvailableSlot[];
  selectedSlot: AvailableSlot | null;
  isLoading?: boolean;
  onSelectSlot: (slot: AvailableSlot) => void;
};

export function SlotPicker({
  selectedDateLabel,
  slots,
  selectedSlot,
  isLoading = false,
  onSelectSlot,
}: SlotPickerProps) {
  return (
    <div className="rounded-[1.75rem] bg-white p-5 ring-1 ring-border sm:p-6">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        {selectedDateLabel ? `Times for ${selectedDateLabel}` : "Select a day"}
      </h2>
      <p className="mt-1 text-sm text-muted">
        {selectedDateLabel
          ? "Pick a start time that works for you."
          : "Choose an available date on the calendar to see open slots."}
      </p>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-10 animate-pulse rounded-full bg-surface"
              />
            ))}
          </motion.div>
        ) : !selectedDateLabel ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-6 rounded-2xl bg-surface px-4 py-8 text-center text-sm text-muted"
          >
            No day selected yet.
          </motion.div>
        ) : slots.length === 0 ? (
          <motion.div
            key="none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-6 rounded-2xl bg-surface px-4 py-8 text-center text-sm text-muted"
          >
            No open slots on this day.
          </motion.div>
        ) : (
          <motion.div
            key={selectedDateLabel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mt-5 grid max-h-72 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3"
          >
            {slots.map((slot) => {
              const active = selectedSlot?.startUtc === slot.startUtc;
              return (
                <button
                  key={slot.startUtc}
                  type="button"
                  onClick={() => onSelectSlot(slot)}
                  className={[
                    "rounded-full px-3 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-accent text-white"
                      : "bg-surface text-ink hover:bg-accent-soft hover:text-accent",
                  ].join(" ")}
                >
                  {slot.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
