"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  updateCoachSettingsAction,
  type SettingsActionState,
} from "@/lib/dashboard/settings-actions";
import { timezoneOptionsFor } from "@/lib/dashboard/timezones";

type ProfileSettingsFormProps = {
  initial: {
    name: string;
    username: string;
    bio: string | null;
    avatarUrl: string | null;
    timezone: string;
  };
};

const emptyState: SettingsActionState = {};

export function ProfileSettingsForm({ initial }: ProfileSettingsFormProps) {
  const [state, formAction, pending] = useActionState(
    updateCoachSettingsAction,
    emptyState,
  );
  const [username, setUsername] = useState(initial.username);
  const zones = timezoneOptionsFor(initial.timezone);

  return (
    <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-border sm:p-6">
      <h2 className="text-xl font-bold tracking-tight text-ink">
        Public profile
      </h2>
      <p className="mt-1 text-sm text-muted">
        These fields power your booking page and confirmation emails.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Display name</span>
          <input
            name="name"
            required
            defaultValue={initial.name}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Username</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">/</span>
            <input
              name="username"
              required
              value={username}
              onChange={(event) =>
                setUsername(event.target.value.toLowerCase())
              }
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 font-mono text-sm outline-none focus:border-accent"
            />
          </div>
          <span className="mt-1.5 block text-xs text-muted">
            Public URL: /{username || "…"}
          </span>
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Bio</span>
          <textarea
            name="bio"
            rows={4}
            defaultValue={initial.bio ?? ""}
            placeholder="A short intro guests see on your profile."
            className="w-full resize-y rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Avatar URL</span>
          <input
            name="avatarUrl"
            type="url"
            defaultValue={initial.avatarUrl ?? ""}
            placeholder="https://…"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Timezone</span>
          <select
            name="timezone"
            defaultValue={initial.timezone}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
          >
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <span className="mt-1.5 block text-xs text-muted">
            Working hours and booking slots use this timezone.
          </span>
        </label>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {state.error ? (
              <span className="text-red-600">{state.error}</span>
            ) : state.message ? (
              <span className="text-accent">{state.message}</span>
            ) : (
              "Changes show on your public profile immediately."
            )}
          </p>
          <Button
            type="submit"
            variant="accent"
            disabled={pending}
            className="disabled:opacity-60"
          >
            {pending ? "Saving..." : "Save settings"}
          </Button>
        </div>
      </form>
    </section>
  );
}
