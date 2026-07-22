import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-accent-soft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-glow),0.16),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
        <BrandLogo href="/" />
        <p className="mt-6 text-center text-sm text-muted">
          Sign in to open your coach dashboard.
        </p>
        <div className="mt-8 w-full">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none ring-1 ring-border",
              },
            }}
          />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          New here?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-accent hover:text-accent-dark"
          >
            Create a coach account
          </Link>
        </p>
      </div>
    </main>
  );
}
