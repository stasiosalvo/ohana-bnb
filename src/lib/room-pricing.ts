import type { RoomId } from "@/lib/blocked";
import { nightsBetween } from "@/lib/tourist-tax";

/** Tariffe standard fuori da giugno, luglio e agosto */
const BASE_NIGHTLY_EUR: Record<RoomId, number> = {
  sun: 80,
  moon: 80,
  earth: 70,
};

/** Giugno e luglio: €80 in settimana (lun–ven), €90 sabato e domenica — tutte le camere */
const SUMMER_WEEKDAY_EUR = 80;
const SUMMER_WEEKEND_EUR = 90;

/** Agosto: €90 a notte; giorni del mese a €100 (tutte le camere) */
const AUGUST_DEFAULT_EUR = 90;
const AUGUST_PEAK_EUR = 100;
const AUGUST_PEAK_DAYS = new Set([
  1, 2, 7, 8, 9, 14, 15, 16, 21, 22, 23, 28, 29, 30,
]);

function isJuneOrJuly(d: Date): boolean {
  const m = d.getMonth();
  return m === 5 || m === 6;
}

function isAugust(d: Date): boolean {
  return d.getMonth() === 7;
}

function augustNightRateEur(d: Date): number {
  const dom = d.getDate();
  return AUGUST_PEAK_DAYS.has(dom) ? AUGUST_PEAK_EUR : AUGUST_DEFAULT_EUR;
}

/** Sabato o domenica (notte che cade in weekend) */
function isWeekendNight(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

/**
 * Prezzo di una notte per camera e data (mezzogiorno locale sulla data di check-in + offset).
 */
export function nightlyRateEur(roomId: RoomId, nightOffsetFromCheckIn: string, nightIndex: number): number {
  const start = new Date(nightOffsetFromCheckIn.slice(0, 10) + "T12:00:00");
  const d = new Date(start);
  d.setDate(d.getDate() + nightIndex);
  if (isJuneOrJuly(d)) {
    return isWeekendNight(d) ? SUMMER_WEEKEND_EUR : SUMMER_WEEKDAY_EUR;
  }
  if (isAugust(d)) {
    return augustNightRateEur(d);
  }
  return BASE_NIGHTLY_EUR[roomId];
}

export type NightlyBreakdownLine = {
  /** Data della notte (YYYY-MM-DD, locale mezzogiorno come il resto del pricing). */
  dateYmd: string;
  amountEur: number;
};

function nightDateYmd(checkIn: string, nightIndex: number): string {
  const start = new Date(checkIn.slice(0, 10) + "T12:00:00");
  const d = new Date(start);
  d.setDate(d.getDate() + nightIndex);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Una riga per ogni notte (per riepilogo / scontrino). */
export function roomNightlyBreakdown(
  roomId: RoomId,
  checkIn: string,
  checkOut: string
): NightlyBreakdownLine[] {
  const n = nightsBetween(checkIn, checkOut);
  const out: NightlyBreakdownLine[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      dateYmd: nightDateYmd(checkIn, i),
      amountEur: nightlyRateEur(roomId, checkIn, i),
    });
  }
  return out;
}

/** Totale soggiorno per una camera tra check-in e check-out (escluso). */
export function roomStaySubtotalEur(roomId: RoomId, checkIn: string, checkOut: string): number {
  const n = nightsBetween(checkIn, checkOut);
  if (n <= 0) return 0;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += nightlyRateEur(roomId, checkIn, i);
  }
  return Math.round(sum * 100) / 100;
}

/** Totale camere (prenotazione multipla). */
export function multiRoomStaySubtotalEur(
  roomIds: RoomId[],
  checkIn: string,
  checkOut: string
): number {
  let t = 0;
  for (const id of roomIds) {
    t += roomStaySubtotalEur(id, checkIn, checkOut);
  }
  return Math.round(t * 100) / 100;
}

/** Almeno una notte del soggiorno cade in giugno o luglio (tariffe estive). */
export function stayTouchesJuneOrJuly(checkIn: string, checkOut: string): boolean {
  const n = nightsBetween(checkIn, checkOut);
  for (let i = 0; i < n; i++) {
    const start = new Date(checkIn.slice(0, 10) + "T12:00:00");
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const m = d.getMonth();
    if (m === 5 || m === 6) return true;
  }
  return false;
}

/** Almeno una notte del soggiorno cade in agosto (tariffe dedicate). */
export function stayTouchesAugust(checkIn: string, checkOut: string): boolean {
  const n = nightsBetween(checkIn, checkOut);
  for (let i = 0; i < n; i++) {
    const start = new Date(checkIn.slice(0, 10) + "T12:00:00");
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    if (d.getMonth() === 7) return true;
  }
  return false;
}
