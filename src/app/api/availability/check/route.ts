import { NextResponse } from "next/server";
import { isPeriodBlocked, type RoomId } from "@/lib/blocked";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId") as RoomId | null;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  if (
    !roomId ||
    !checkIn ||
    !checkOut ||
    !["sun", "moon", "earth"].includes(roomId)
  ) {
    return NextResponse.json(
      { error: "Parametri roomId, checkIn, checkOut richiesti (roomId: sun|moon|earth)." },
      { status: 400 }
    );
  }

  try {
    const blocked = await isPeriodBlocked(roomId, checkIn, checkOut);
    return NextResponse.json({ available: !blocked });
  } catch (e) {
    console.error("GET /api/availability/check", e);
    return NextResponse.json({ available: true });
  }
}
