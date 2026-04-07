/**
 * Decorazioni Pasqua: attive fino a questa data (inclusa).
 * Dopo questa data il sito torna allo stile normale senza toccare il codice.
 * Per disattivare subito: imposta una data nel passato (es. "2024-01-01").
 */
export const EASTER_DECORATIONS_END = "2024-01-01"; // disattivate

export function isEasterSeason(): boolean {
  if (typeof process === "undefined") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(EASTER_DECORATIONS_END + "T23:59:59");
  return today <= end;
}
