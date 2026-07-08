"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { formatDuration, formatPrice } from "@/lib/format";
import {
  createSessionTypeAction,
  deleteSessionTypeAction,
  updateSessionTypeAction,
  type SessionTypeActionState,
} from "@/lib/dashboard/session-types-actions";
import {
  slugifyTitle,
  type SessionTypeListItem,
} from "@/lib/dashboard/session-type-fields";

type SessionTypesManagerProps = {
  initialSessions: SessionTypeListItem[];
  coachUsername: string;
};

type FormMode = { kind: "create" } | { kind: "edit"; session: SessionTypeListItem };

const emptyState: SessionTypeActionState = {};

const PRESET_COLORS = ["#7B68C7", "#0B0B0F", "#2F6FED", "#C45C26", "#1F7A5C"];

export function SessionTypesManager({
  initialSessions,
  coachUsername,
}: SessionTypesManagerProps) {
  const [mode, setMode] = useState<FormMode | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isPendingDelete, startDelete] = useTransition();

  function onDelete(session: SessionTypeListItem) {
    setDeleteError(null);
    startDelete(async () => {
      const result = await deleteSessionTypeAction(session.id);
      if (result.error) {
        setDeleteError(result.error);
      } else if (mode?.kind === "edit" && mode.session.id === session.id) {
        setMode(null);
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-border sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-ink">
              Your sessions
            </h2>
            <p className="mt-1 text-sm text-muted">
              Active types appear on your public profile and booking links.
            </p>
          </div>
          <Button
            type="button"
            variant="accent"
            showArrow={false}
            onClick={() => setMode({ kind: "create" })}
            className="shrink-0 px-4 py-2"
          >
            New session
          </Button>
        </div>

        {deleteError ? (
          <p className="mt-4 text-sm text-red-600">{deleteError}</p>
        ) : null}

        {initialSessions.length === 0 ? (
          <p className="mt-8 text-sm text-muted">
            No session types yet. Create your first offer to start taking
            bookings.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-border rounded-2xl ring-1 ring-border">
            {initialSessions.map((session) => (
              <li
                key={session.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className="mt-1 size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: session.color }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-ink">{session.title}</p>
                      <span
                        className={[
                          "rounded-full px-2 py-0.5 text-[11px] font-medium",
                          session.isActive
                            ? "bg-accent-soft text-accent"
                            : "bg-surface text-muted",
                        ].join(" ")}
                      >
                        {session.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {formatDuration(session.duration)} ·{" "}
                      {formatPrice(session.price)} · /{coachUsername}/
                      {session.slug}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setMode({ kind: "edit", session })}
                    className="text-sm font-medium text-accent hover:text-accent-dark"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={isPendingDelete}
                    onClick={() => onDelete(session)}
                    className="text-sm font-medium text-muted hover:text-red-600 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {mode ? (
        <SessionTypeForm
          key={mode.kind === "edit" ? mode.session.id : "create"}
          mode={mode}
          onClose={() => setMode(null)}
        />
      ) : (
        <aside className="rounded-[1.5rem] bg-surface p-5 ring-1 ring-border sm:p-6">
          <h2 className="text-lg font-bold text-ink">Editor</h2>
          <p className="mt-2 text-sm text-muted">
            Select a session to edit, or create a new one. Slugs power public
            booking URLs.
          </p>
        </aside>
      )}
    </div>
  );
}

function SessionTypeForm({
  mode,
  onClose,
}: {
  mode: FormMode;
  onClose: () => void;
}) {
  const isEdit = mode.kind === "edit";
  const session = isEdit ? mode.session : null;
  const action = isEdit ? updateSessionTypeAction : createSessionTypeAction;
  const [state, formAction, pending] = useActionState(action, emptyState);

  const [title, setTitle] = useState(session?.title ?? "");
  const [slug, setSlug] = useState(session?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(session));
  const [color, setColor] = useState(session?.color ?? "#7B68C7");

  useEffect(() => {
    if (state.ok) {
      onClose();
    }
  }, [state.ok, onClose]);

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugifyTitle(value));
    }
  }

  const priceDefault =
    session?.price != null ? (session.price / 100).toFixed(2) : "";

  return (
    <section className="rounded-[1.5rem] bg-white p-5 ring-1 ring-border sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">
            {isEdit ? "Edit session" : "New session"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {isEdit
              ? "Updates apply to new bookings right away."
              : "Fill in the details guests will see on your profile."}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-muted hover:text-ink"
        >
          Close
        </button>
      </div>

      <form action={formAction} className="mt-6 space-y-4">
        {isEdit ? (
          <input type="hidden" name="sessionTypeId" value={session!.id} />
        ) : null}

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Title</span>
          <input
            name="title"
            required
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Strategy Session"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Slug</span>
          <input
            name="slug"
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value.toLowerCase());
            }}
            placeholder="strategy-session"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3 font-mono text-sm outline-none focus:border-accent"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Description</span>
          <textarea
            name="description"
            rows={3}
            defaultValue={session?.description ?? ""}
            placeholder="What guests can expect from this session."
            className="w-full resize-y rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink">
              Duration (minutes)
            </span>
            <input
              name="duration"
              type="number"
              min={5}
              max={480}
              step={5}
              required
              defaultValue={session?.duration ?? 30}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink">
              Price (USD, blank = free)
            </span>
            <input
              name="price"
              type="number"
              min={0}
              step={0.01}
              defaultValue={priceDefault}
              placeholder="0"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
            />
          </label>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink">Color</span>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setColor(preset)}
                className={[
                  "size-8 rounded-full ring-2 ring-offset-2",
                  color === preset ? "ring-accent" : "ring-transparent",
                ].join(" ")}
                style={{ backgroundColor: preset }}
                aria-label={`Use color ${preset}`}
              />
            ))}
            <input
              name="color"
              type="text"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              className="min-w-[7.5rem] flex-1 rounded-2xl border border-border px-3 py-2 font-mono text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={session?.isActive ?? true}
            className="size-4 rounded border-border"
          />
          Active on public profile
        </label>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {state.error ? (
              <span className="text-red-600">{state.error}</span>
            ) : state.message ? (
              <span className="text-accent">{state.message}</span>
            ) : (
              " "
            )}
          </p>
          <Button
            type="submit"
            variant="accent"
            disabled={pending}
            className="disabled:opacity-60"
          >
            {pending
              ? "Saving..."
              : isEdit
                ? "Save changes"
                : "Create session"}
          </Button>
        </div>
      </form>
    </section>
  );
}
