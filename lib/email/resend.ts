import { Resend } from "resend";

let resendClient: Resend | null = null;

/** Lazy Resend client — only created when an API key is configured. */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function getEmailFromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ??
    "BrandElevate <onboarding@resend.dev>"
  );
}
