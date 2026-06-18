import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";

/**
 * GET /api/availability/slots
 * ?coachId=&sessionTypeId=&date=yyyy-MM-dd&clientTimezone=
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coachId = searchParams.get("coachId");
  const sessionTypeId = searchParams.get("sessionTypeId");
  const dateYmd = searchParams.get("date");
  const clientTimezone = searchParams.get("clientTimezone") ?? "UTC";

  if (!coachId || !sessionTypeId || !dateYmd) {
    return NextResponse.json(
      { error: "coachId, sessionTypeId, and date are required." },
      { status: 400 },
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateYmd)) {
    return NextResponse.json(
      { error: "date must be yyyy-MM-dd." },
      { status: 400 },
    );
  }

  try {
    const slots = await getAvailableSlots({
      coachId,
      sessionTypeId,
      dateYmd,
      clientTimezone,
    });

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Failed to load slots", error);
    return NextResponse.json(
      { error: "Unable to load available slots." },
      { status: 500 },
    );
  }
}
