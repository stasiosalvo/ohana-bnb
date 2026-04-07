import { NextResponse } from "next/server";
import {
  applyBookingIcalSync,
  type RoomId,
} from "@/lib/blocked";
import { fetchIcsText, parseBookingIcsToStays } from "@/lib/booking-ical";

export const runtime = "nodejs";

function authOk(request: Request): boolean {
  const secret =
    process.env.CRON_SECRET?.trim() || process.env.BOOKING_SYNC_SECRET?.trim();
  if (!secret) return false;
  const auth = request.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (bearer === secret) return true;
  const q = new URL(request.url).searchParams.get("token");
  return q === secret;
}

const ROOM_ENV: Record<RoomId, string> = {
  sun: "BOOKING_ICAL_URL_SUN",
  moon: "BOOKING_ICAL_URL_MOON",
  earth: "BOOKING_ICAL_URL_EARTH",
};

/**
 * Sincronizza i calendari iCal esportati da Booking.com → blocchi Redis (bk_ical_*).
 *
 * Variabili (Vercel / .env):
 * - BOOKING_ICAL_URL_SUN | MOON | EARTH — URL “ical” dalla Extranet Booking (una per camera/listing)
 * - CRON_SECRET o BOOKING_SYNC_SECRET — per chiamare questo endpoint (Bearer o ?token=)
 *
 * Pianificazione: Vercel Cron o servizio esterno ogni 15–60 min.
 */
export async function GET(request: Request) {
  if (!authOk(request)) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  const byRoom: Partial<
    Record<RoomId, { checkIn: string; checkOut: string; uid: string }[]>
  > = {};
  const errors: string[] = [];

  for (const roomId of ["sun", "moon", "earth"] as RoomId[]) {
    const envName = ROOM_ENV[roomId];
    const url = process.env[envName]?.trim();
    if (!url) continue;

    try {
      const ics = await fetchIcsText(url);
      const stays = parseBookingIcsToStays(ics);
      byRoom[roomId] = stays;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`${roomId}: ${msg}`);
      // non impostiamo byRoom[roomId]: applyBookingIcalSync mantiene i vecchi bk_ical per quella camera
    }
  }

  if (Object.keys(byRoom).length === 0) {
    return NextResponse.json({
      ok: true,
      message:
        "Nessun BOOKING_ICAL_URL_* configurato: nessun aggiornamento (blocchi Booking precedenti invariati).",
      synced: {},
    });
  }

  await applyBookingIcalSync(byRoom);

  return NextResponse.json({
    ok: errors.length === 0,
    synced: Object.fromEntries(
      Object.entries(byRoom).map(([k, v]) => [k, v?.length ?? 0])
    ),
    warnings: errors.length ? errors : undefined,
  });
}
