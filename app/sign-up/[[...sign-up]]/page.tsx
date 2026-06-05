import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { clerkAuthAppearance } from "@/lib/clerk-appearance";

type SignUpPageProps = {
  searchParams: Promise<{ redirect_url?: string; intent?: string }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { redirect_url: redirectUrl, intent } = await searchParams;
  const safeRedirect =
    redirectUrl && redirectUrl.startsWith("/") ? redirectUrl : undefined;
  const role = intent === "coach" ? "coach" : "client";
  const isCoachIntent = role === "coach";
  const isBookingReturn = Boolean(
    safeRedirect &&
      safeRedirect !== "/dashboard" &&
      !safeRedirect.startsWith("/dashboard"),
  );

  const fallbackRedirect = isCoachIntent
    ? (safeRedirect ?? "/dashboard")
    : (safeRedirect ?? "/");

  return (
    <main className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#f7f5fc]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-glow),0.14),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
        <BrandLogo href="/" />
        <p className="mt-6 text-center text-sm text-muted">
          {isBookingReturn
            ? "Create an account to finish booking your session."
            : isCoachIntent
              ? "Create a coach account to manage sessions and availability."
              : "Create an account to book sessions with coaches."}
        </p>
        <div className="mt-8 w-full [&_.cl-cardBox]:shadow-none [&_.cl-card]:shadow-none">
          <SignUp
            forceRedirectUrl={safeRedirect}
            fallbackRedirectUrl={fallbackRedirect}
            unsafeMetadata={{ role }}
            appearance={clerkAuthAppearance}
          />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href={
              safeRedirect
                ? `/sign-in?redirect_url=${encodeURIComponent(safeRedirect)}`
                : isCoachIntent
                  ? "/sign-in?redirect_url=%2Fdashboard"
                  : "/sign-in"
            }
            className="font-medium text-accent hover:text-accent-dark"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
