import { formatDuration, formatPrice } from "@/lib/format";

export type BookingConfirmationEmailContent = {
  clientName: string;
  coachName: string;
  sessionTitle: string;
  whenLabel: string;
  durationMinutes: number;
  priceInCents: number | null;
  notes?: string | null;
  manageUrl?: string;
};

/** Plain HTML confirmation email — no extra templating dependency. */
export function renderBookingConfirmationEmail({
  clientName,
  coachName,
  sessionTitle,
  whenLabel,
  durationMinutes,
  priceInCents,
  notes,
  manageUrl,
}: BookingConfirmationEmailContent): { subject: string; html: string; text: string } {
  const firstName = clientName.split(" ")[0] ?? clientName;
  const subject = `Confirmed: ${sessionTitle} with ${coachName}`;
  const duration = formatDuration(durationMinutes);
  const price = formatPrice(priceInCents);

  const text = [
    `Hi ${firstName},`,
    "",
    `Your booking is confirmed.`,
    "",
    `Session: ${sessionTitle}`,
    `Coach: ${coachName}`,
    `When: ${whenLabel}`,
    `Duration: ${duration}`,
    `Price: ${price}`,
    notes ? `Notes: ${notes}` : null,
    manageUrl ? `Details: ${manageUrl}` : null,
    "",
    "See you soon,",
    "BrandElevate",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f7f5fc;font-family:Manrope,Helvetica,Arial,sans-serif;color:#17171c;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f5fc;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #ebe7f5;">
            <tr>
              <td>
                <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#7b68c7;font-weight:600;">BrandElevate</p>
                <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;font-weight:800;">You're booked, ${escapeHtml(firstName)}</h1>
                <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#6b7280;">
                  Your <strong style="color:#17171c;">${escapeHtml(sessionTitle)}</strong> with
                  <strong style="color:#17171c;">${escapeHtml(coachName)}</strong> is confirmed.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;background:#f7f5fc;border-radius:18px;">
                  <tr>
                    <td style="padding:18px 20px;font-size:14px;line-height:1.7;">
                      <div><span style="color:#6b7280;">When</span><br /><strong>${escapeHtml(whenLabel)}</strong></div>
                      <div style="margin-top:12px;"><span style="color:#6b7280;">Duration</span><br /><strong>${escapeHtml(duration)}</strong></div>
                      <div style="margin-top:12px;"><span style="color:#6b7280;">Price</span><br /><strong>${escapeHtml(price)}</strong></div>
                      ${
                        notes
                          ? `<div style="margin-top:12px;"><span style="color:#6b7280;">Notes</span><br /><strong>${escapeHtml(notes)}</strong></div>`
                          : ""
                      }
                    </td>
                  </tr>
                </table>

                ${
                  manageUrl
                    ? `<p style="margin:24px 0 0;">
                        <a href="${escapeHtml(manageUrl)}" style="display:inline-block;background:#7b68c7;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-size:14px;font-weight:600;">
                          View confirmation
                        </a>
                      </p>`
                    : ""
                }

                <p style="margin:28px 0 0;font-size:13px;color:#6b7280;">
                  If you need to make a change, reply to this email and we'll help.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

  return { subject, html, text };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
