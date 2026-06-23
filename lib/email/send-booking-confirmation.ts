import { formatInTimeZone } from "date-fns-tz";
import {
  getEmailFromAddress,
  getResendClient,
} from "@/lib/email/resend";
import {
  renderBookingConfirmationEmail,
  type BookingConfirmationEmailContent,
} from "@/lib/email/booking-confirmation-template";

export type SendBookingConfirmationInput = BookingConfirmationEmailContent & {
  to: string;
  startUtc: Date;
  timezone: string;
};

/**
 * Sends the guest confirmation email.
 * Returns quietly if Resend isn't configured so local booking still works.
 */
export async function sendBookingConfirmationEmail(
  input: SendBookingConfirmationInput,
): Promise<{ sent: boolean; error?: string }> {
  const resend = getResendClient();

  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipped booking confirmation email.",
    );
    return { sent: false, error: "RESEND_API_KEY is not configured." };
  }

  const whenLabel =
    input.whenLabel ||
    `${formatInTimeZone(input.startUtc, input.timezone, "EEEE, MMM d · h:mm a")} (${input.timezone})`;

  const { subject, html, text } = renderBookingConfirmationEmail({
    ...input,
    whenLabel,
  });

  try {
    const { error } = await resend.emails.send({
      from: getEmailFromAddress(),
      to: input.to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend failed to send booking email:", error);
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (error) {
    console.error("Unexpected email send failure:", error);
    return {
      sent: false,
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}
