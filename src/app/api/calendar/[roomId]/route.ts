import { NextResponse } from "next/server";
import { getAllBlocked, type RoomId } from "@/lib/blocked";

export const runtime = "nodejs";

function toICalDate(ymd: string): string {
  return ymd.replace(/-/g, "");
}

function formatUtcStamp(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${day}T${hh}${mm}${ss}Z`;
}

/**
 * Feed iCal del sito per **import in Booking.com** (Calendario → importa calendario esterno).
 * Include tutti i blocchi per quella camera (prenotazioni sito, manuali, sync Booking).
 *
 * URL da incollare in Booking (con dominio di produzione):
 *   https://TUO-DOMINIO/api/calendar/sun?token=CALENDAR_EXPORT_TOKEN
 *
 * Variabile: CALENDAR_EXPORT_TOKEN (stesso token in query `token`)
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ roomId: string }> }
) {
  const token = process.env.CALENDAR_EXPORT_TOKEN?.trim();
  if (!token) {
    return NextResponse.json(
      { error: "CALENDAR_EXPORT_TOKEN non configurato sul server." },
      { status: 503 }
    );
  }

  const url = new URL(request.url);
  if (url.searchParams.get("token") !== token) {
    return NextResponse.json({ error: "Token non valido." }, { status: 401 });
  }

  const { roomId: raw } = await context.params;
  const roomId = raw?.toLowerCase() as RoomId;
  if (!raw || !["sun", "moon", "earth"].includes(roomId)) {
    return NextResponse.json({ error: "roomId: sun | moon | earth" }, { status: 400 });
  }

  const all = await getAllBlocked();
  const forRoom = all.filter((b) => b.roomId === roomId);

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ohana B&B//Site availability//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  const now = new Date();
  for (const p of forRoom) {
    const safeUid = `site-${p.id.replace(/[^a-zA-Z0-9-]/g, "")}@ohana-bnb.local`;
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${safeUid}`);
    lines.push(`DTSTAMP:${formatUtcStamp(now)}`);
    lines.push(`DTSTART;VALUE=DATE:${toICalDate(p.checkIn)}`);
    lines.push(`DTEND;VALUE=DATE:${toICalDate(p.checkOut)}`);
    lines.push(
      `SUMMARY:Non disponibile (sito)`
    );
    lines.push("TRANSP:OPAQUE");
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  const body = lines.join("\r\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Cache-Control": "private, max-age=300",
    },
  });
}
