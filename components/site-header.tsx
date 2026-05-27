"use client";

import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";

const COACH_SIGN_IN = "/sign-in?redirect_url=%2Fdashboard";
const COACH_SIGN_UP = "/sign-up?redirect_url=%2Fdashboard";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-border/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <BrandLogo href="/" />

        <div className="flex items-center gap-2 sm:gap-3">
          <Show when="signed-out">
            <Link
              href={COACH_SIGN_IN}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              Coach sign in
            </Link>
            <Button
              href={COACH_SIGN_UP}
              variant="accent"
              showArrow={false}
              className="px-4 py-2 text-xs sm:text-sm"
            >
              Start coaching
            </Button>
          </Show>

          <Show when="signed-in">
            <Button
              href="/dashboard"
              variant="accent"
              showArrow={false}
              className="px-4 py-2 text-xs sm:text-sm"
            >
              Open dashboard
            </Button>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-9",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
}
