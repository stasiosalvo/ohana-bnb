function toYmd(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseIcalDateValue(raw: string): Date | null {
  const v = raw.trim();
  // YYYYMMDD (all-day)
  if (/^\d{8}$/.test(v)) {
    const y = Number(v.slice(0, 4));
    const m = Number(v.slice(4, 6));
    const d = Number(v.slice(6, 8));
    return new Date(Date.UTC(y, m - 1, d));
  }
  // YYYYMMDDTHHmmssZ
  const z = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(v);
  if (z) {
    return new Date(
      Date.UTC(
        Number(z[1]),
        Number(z[2]) - 1,
        Number(z[3]),
        Number(z[4]),
        Number(z[5]),
        Number(z[6])
      )
    );
  }
  return null;
}

function unfoldIcalLines(icsBody: string): string[] {
  const raw = icsBody.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const out: string[] = [];
  for (const line of raw) {
    if (!line) continue;
    if ((line.startsWith(" ") || line.startsWith("\t")) && out.length > 0) {
      out[out.length - 1] += line.slice(1);
    } else {
      out.push(line);
    }
  }
  return out;
}

export type ParsedStay = { checkIn: string; checkOut: string; uid: string };

/**
 * Estrae soggiorni da un file iCal (es. export Booking.com).
 * checkIn/checkOut in YYYY-MM-DD come nel resto del sito (checkout = giorno di partenza).
 */
export function parseBookingIcsToStays(icsBody: string): ParsedStay[] {
  const out: ParsedStay[] = [];
  const lines = unfoldIcalLines(icsBody);
  let inEvent = false;
  let uid = "";
  let status = "";
  let dtStart = "";
  let dtEnd = "";

  const flush = () => {
    if (!inEvent) return;
    if (status.toUpperCase() === "CANCELLED") return;
    const start = parseIcalDateValue(dtStart);
    if (!start) return;
    let end = parseIcalDateValue(dtEnd);
    if (!end) {
      end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);
    }
    const checkIn = toYmd(start);
    let checkOut = toYmd(end);
    if (checkOut <= checkIn) {
      const next = new Date(start);
      next.setUTCDate(next.getUTCDate() + 1);
      checkOut = toYmd(next);
    }
    out.push({
      checkIn,
      checkOut,
      uid: uid || `evt_${checkIn}_${checkOut}_${out.length + 1}`,
    });
  };

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      uid = "";
      status = "";
      dtStart = "";
      dtEnd = "";
      continue;
    }
    if (line === "END:VEVENT") {
      flush();
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    if (line.startsWith("UID:")) uid = line.slice(4).trim();
    else if (line.startsWith("STATUS:")) status = line.slice(7).trim();
    else if (line.startsWith("DTSTART")) {
      const idx = line.indexOf(":");
      if (idx >= 0) dtStart = line.slice(idx + 1).trim();
    } else if (line.startsWith("DTEND")) {
      const idx = line.indexOf(":");
      if (idx >= 0) dtEnd = line.slice(idx + 1).trim();
    }
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
