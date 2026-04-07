import ical from "node-ical";

function toYmd(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getJsDate(v: unknown): Date | null {
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v;
  if (
    v &&
    typeof v === "object" &&
    "toJSDate" in v &&
    typeof (v as { toJSDate?: () => Date }).toJSDate === "function"
  ) {
    const d = (v as { toJSDate: () => Date }).toJSDate();
    return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
  }
  return null;
}

export type ParsedStay = { checkIn: string; checkOut: string; uid: string };

/**
 * Estrae soggiorni da un file iCal (es. export Booking.com).
 * checkIn/checkOut in YYYY-MM-DD come nel resto del sito (checkout = giorno di partenza).
 */
export function parseBookingIcsToStays(icsBody: string): ParsedStay[] {
  const cal = ical.parseICS(icsBody);
  const out: ParsedStay[] = [];

  for (const k of Object.keys(cal)) {
    const comp = cal[k] as { type?: string };
    if (comp?.type !== "VEVENT") continue;
    const ev = comp as {
      type: string;
      status?: string;
      start?: unknown;
      end?: unknown;
      uid?: string;
    };
    if (ev.status === "CANCELLED") continue;

    const start = getJsDate(ev.start);
    if (!start) continue;

    let end = getJsDate(ev.end);
    if (!end) {
      const next = new Date(start);
      next.setUTCDate(next.getUTCDate() + 1);
      end = next;
    }

    const checkIn = toYmd(start);
    let checkOut = toYmd(end);

    // iCal DATE all-day: spesso DTEND è il giorno dopo l’ultima notte (checkout mattina)
    if (checkOut <= checkIn) {
      const next = new Date(start);
      next.setUTCDate(next.getUTCDate() + 1);
      checkOut = toYmd(next);
    }

    const uid = typeof ev.uid === "string" ? ev.uid : `evt_${checkIn}_${checkOut}`;
    out.push({ checkIn, checkOut, uid });
  }

  return out;
}

export async function fetchIcsText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { Accept: "text/calendar, text/plain, */*" },
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error(`iCal HTTP ${res.status}`);
  }
  return res.text();
}
