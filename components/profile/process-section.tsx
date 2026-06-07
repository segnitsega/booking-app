"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    title: "Understand your goals, values & uniqueness",
    body: "We start by mapping what you stand for, who you serve, and the outcomes that matter most.",
  },
  {
    title: "Craft your positioning and messaging",
    body: "Together we sharpen your story so every profile, pitch, and post sounds unmistakably like you.",
  },
  {
    title: "Develop",
    body: "We turn clarity into assets — offers, content pillars, and a personal brand system you can run weekly.",
  },
  {
    title: "Launch your authentic personal brand",
    body: "Finally we ship in public with a cadence that builds trust, visibility, and inbound opportunities.",
  },
];

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="text-accent">My Coaching Process,</span>{" "}
            <span className="text-ink">Simplified</span>
          </h2>
          <Button href="#services" variant="accent">
            Learn more
          </Button>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ul className="space-y-3">
            {STEPS.map((step, index) => {
              const active = index === activeIndex;

              return (
                <li key={step.title}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "flex w-full items-start justify-between gap-4 rounded-[1.35rem] text-left transition-colors",
                      active
                        ? "bg-ink p-6 text-white"
                        : "bg-transparent px-2 py-4 text-ink hover:bg-white/70",
                    ].join(" ")}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className={[
                          "text-base font-semibold sm:text-lg",
                          active ? "text-white" : "text-ink",
                        ].join(" ")}
                      >
                        {step.title}
                      </p>
                      {active ? (
                        <p className="mt-3 text-sm leading-relaxed text-white/75">
                          {step.body}
                        </p>
                      ) : null}
                    </div>
                    <span
                      className={[
                        "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
                        active
                          ? "bg-white text-ink"
                          : "border border-border bg-white text-ink",
                      ].join(" ")}
                    >
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-white shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80"
              alt="Coaching conversation in studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
