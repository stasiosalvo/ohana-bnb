/** Importo comunale indicativo: €4,50 per persona per notte (verificare sempre delibera vigente). */
export const STAY_TAX_EUR_PER_PERSON_PER_NIGHT = 4.5;

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn + "T12:00:00");
  const b = new Date(checkOut + "T12:00:00");
  const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export function stayTaxEur(nights: number, guestCount: number): number {
  const n = Math.max(0, nights);
  const g = Math.max(1, Math.min(20, guestCount || 1));
  const raw = STAY_TAX_EUR_PER_PERSON_PER_NIGHT * n * g;
  return Math.round(raw * 100) / 100;
}
