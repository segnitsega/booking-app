import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";

export default function SignUpPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-accent-soft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--accent-glow),0.16),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16">
        <BrandLogo href="/" />
        <p className="mt-6 text-center text-sm text-muted">
          Create an account to manage sessions and availability.
        </p>
        <div className="mt-8 w-full">
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none ring-1 ring-border",
              },
            }}
          />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Already coaching here?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-accent hover:text-accent-dark"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
