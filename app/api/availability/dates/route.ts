import { NextResponse } from "next/server";
import { getAvailableDates } from "@/lib/availability";

/**
 * GET /api/availability/dates
 * ?coachId=&sessionTypeId=&clientTimezone=&from=yyyy-MM-dd&days=60
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coachId = searchParams.get("coachId");
  const sessionTypeId = searchParams.get("sessionTypeId");
  const clientTimezone = searchParams.get("clientTimezone") ?? "UTC";
  const fromYmd = searchParams.get("from") ?? undefined;
  const daysParam = searchParams.get("days");
  const daysAhead = daysParam ? Number(daysParam) : 60;

  if (!coachId || !sessionTypeId) {
    return NextResponse.json(
      { error: "coachId and sessionTypeId are required." },
      { status: 400 },
    );
  }

  if (!Number.isFinite(daysAhead) || daysAhead < 1 || daysAhead > 90) {
    return NextResponse.json(
      { error: "days must be a number between 1 and 90." },
      { status: 400 },
    );
  }

  try {
    const dates = await getAvailableDates({
      coachId,
      sessionTypeId,
      clientTimezone,
      fromYmd,
      daysAhead,
    });

    return NextResponse.json({ dates });
  } catch (error) {
    console.error("Failed to load available dates", error);
    return NextResponse.json(
      { error: "Unable to load available dates." },
      { status: 500 },
    );
  }
}
