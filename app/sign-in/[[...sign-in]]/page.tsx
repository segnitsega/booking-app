import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { clerkAuthAppearance } from "@/lib/clerk-appearance";

type SignInPageProps = {
  searchParams: Promise<{ redirect_url?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { redirect_url: redirectUrl } = await searchParams;
  const safeRedirect =
    redirectUrl && redirectUrl.startsWith("/") ? redirectUrl : undefined;
  const isBookingReturn = Boolean(
    safeRedirect &&
      safeRedirect !== "/dashboard" &&
      !safeRedirect.startsWith("/dashboard"),
  );

  return (
    <main className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#f7f5fc]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-glow),0.14),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
        <BrandLogo href="/" />
        <p className="mt-6 text-center text-sm text-muted">
          {isBookingReturn
            ? "Sign in to confirm your session booking."
            : "Welcome back — sign in to open your coach dashboard."}
        </p>
        <div className="mt-8 w-full [&_.cl-cardBox]:shadow-none [&_.cl-card]:shadow-none">
          <SignIn
            forceRedirectUrl={safeRedirect}
            fallbackRedirectUrl={safeRedirect ?? "/dashboard"}
            appearance={clerkAuthAppearance}
          />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          New here?{" "}
          <Link
            href={
              safeRedirect
                ? `/sign-up?redirect_url=${encodeURIComponent(safeRedirect)}`
                : "/sign-up"
            }
            className="font-medium text-accent hover:text-accent-dark"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
