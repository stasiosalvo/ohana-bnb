/**
 * Dati di contatto del sito. Per cambiarli:
 * - Imposta NEXT_PUBLIC_CONTACT_EMAIL (e opzionale NEXT_PUBLIC_CONTACT_PHONE) in .env.local e su Vercel
 * - oppure modifica i valori di fallback qui sotto.
 */
export const CONTACT_EMAIL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
    ? process.env.NEXT_PUBLIC_CONTACT_EMAIL.trim()
    : "ohanab.and.b@gmail.com";

export const CONTACT_PHONE =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim()
    ? process.env.NEXT_PUBLIC_CONTACT_PHONE.trim()
    : "+39 376 297 9866";
