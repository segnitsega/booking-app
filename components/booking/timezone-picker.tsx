"use client";

import { useEffect, useMemo, useState } from "react";

const FALLBACK_ZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "UTC",
];

type TimezonePickerProps = {
  value: string;
  onChange: (timezone: string) => void;
};

export function TimezonePicker({ value, onChange }: TimezonePickerProps) {
  const [zones, setZones] = useState<string[]>(FALLBACK_ZONES);

  useEffect(() => {
    const supported =
      typeof Intl !== "undefined" && "supportedValuesOf" in Intl
        ? (
            Intl as typeof Intl & {
              supportedValuesOf: (key: string) => string[];
            }
          ).supportedValuesOf("timeZone")
        : FALLBACK_ZONES;

    const browserZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const next = Array.from(new Set([browserZone, ...supported])).slice(0, 80);
    setZones(next);

    if (!value) {
      onChange(browserZone);
    }
  }, [onChange, value]);

  const label = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: value,
        timeZoneName: "short",
      })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName")?.value;
    } catch {
      return null;
    }
  }, [value]);

  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-ink">
        Timezone{label ? ` (${label})` : ""}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-full border border-border bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
      >
        {zones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </label>
  );
}
