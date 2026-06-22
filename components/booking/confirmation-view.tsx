"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDuration, formatPrice } from "@/lib/format";

type ConfirmationViewProps = {
  coachName: string;
  coachUsername: string;
  sessionTitle: string;
  duration: number;
  price: number | null;
  whenLabel: string;
  clientName: string;
  icsHref: string;
};

export function ConfirmationView({
  coachName,
  coachUsername,
  sessionTitle,
  duration,
  price,
  whenLabel,
  clientName,
  icsHref,
}: ConfirmationViewProps) {
  return (
    <div className="mx-auto max-w-lg rounded-[1.75rem] bg-ink px-7 py-10 text-white sm:px-10">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent"
      >
        <Check className="size-7" strokeWidth={2.5} aria-hidden />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
          Confirmed
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
          You&apos;re booked, {clientName.split(" ")[0]}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          {sessionTitle} with {coachName}
        </p>
      </motion.div>

      <div className="mt-8 space-y-3 rounded-[1.35rem] bg-white/5 px-5 py-5 text-sm ring-1 ring-white/10">
        <div className="flex items-start justify-between gap-4">
          <span className="text-white/60">When</span>
          <span className="text-right font-medium">{whenLabel}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-white/60">Duration</span>
          <span className="font-medium">{formatDuration(duration)}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-white/60">Price</span>
          <span className="font-medium">{formatPrice(price)}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href={icsHref} variant="light" className="justify-center">
          Add to calendar
        </Button>
        <Button
          href={`/${coachUsername}`}
          variant="ghost"
          showArrow={false}
          className="justify-center"
        >
          Back to profile
        </Button>
      </div>
    </div>
  );
}
