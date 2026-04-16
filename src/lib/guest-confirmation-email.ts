/** Lingua email di conferma ospite: IT se prefisso telefono principale Italia (+39), altrimenti EN. */

export type GuestEmailLang = "it" | "en";

export function guestEmailLangFromPhone(
  phonePrefixMeta: string | undefined,
  phone: string
): GuestEmailLang {
  const prefix = (phonePrefixMeta ?? "").trim();
  if (prefix === "+39") return "it";
  const compact = phone.replace(/\s+/g, "");
  if (/^\+39\d/.test(compact) || compact.startsWith("0039")) return "it";
  return "en";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface GuestConfirmationEmailParams {
  lang: GuestEmailLang;
  name: string;
  roomsLabel: string;
  checkIn: string;
  checkOut: string;
  nights: string;
  guests: string;
  amountTotal: number;
  touristTaxEur: number;
  payTouristTaxOnSite: boolean;
  pdfMapUrl: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
}

export function buildGuestConfirmationEmail(p: GuestConfirmationEmailParams): {
  subject: string;
  html: string;
} {
  const fullAddressIt = "Via Lavinaio 19, 80142 Napoli, Campania, Italia";
  const fullAddressEn = "Via Lavinaio 19, 80142 Naples, Campania, Italy";

  if (p.lang === "it") {
    return {
      subject: "Conferma prenotazione – Ohana B&B",
      html: `
        <h2>Grazie per la tua prenotazione!</h2>
        <p>Ciao ${escapeHtml(p.name)},</p>
        <p>La tua prenotazione è stata confermata. Ecco il riepilogo:</p>
        <ul>
          <li><strong>Camera/e:</strong> ${escapeHtml(p.roomsLabel)}</li>
          <li><strong>Check-in:</strong> ${escapeHtml(p.checkIn)}</li>
          <li><strong>Check-out:</strong> ${escapeHtml(p.checkOut)}</li>
          <li><strong>Notti:</strong> ${escapeHtml(p.nights)}</li>
          <li><strong>Ospiti:</strong> ${escapeHtml(p.guests)}</li>
          <li><strong>Indirizzo B&amp;B:</strong> ${escapeHtml(fullAddressIt)}</li>
          <li><strong>Importo pagato online:</strong> € ${p.amountTotal.toFixed(2)}</li>
          <li><strong>Tassa di soggiorno (€4,50/persona/notte):</strong> € ${p.touristTaxEur.toFixed(2)} — ${
            p.payTouristTaxOnSite
              ? "da pagare in contanti in struttura all'arrivo."
              : "già inclusa nel pagamento con carta."
          }</li>
        </ul>
        <p>Qui sotto trovi anche una mappa PDF scaricabile da usare durante il viaggio:</p>
        <p><a href="${escapeHtml(p.pdfMapUrl)}">Scarica la mappa PDF di Napoli e dell'area Ohana B&amp;B</a></p>
        <p>Per modifiche o informazioni puoi contattarci:</p>
        <p>Email: <a href="mailto:${escapeHtml(p.contactEmail)}">${escapeHtml(p.contactEmail)}</a><br>
        Telefono: ${escapeHtml(p.contactPhone)}</p>
        <p>A presto,<br><strong>Ohana B&amp;B</strong></p>
        <p style="margin-top:22px;margin-bottom:0;line-height:0;">
          <img src="${escapeHtml(p.logoUrl)}" alt="${escapeHtml("Ohana B&B")}" width="120" style="display:block;max-width:120px;height:auto;border:0;outline:none;text-decoration:none;" />
        </p>
      `,
    };
  }

  return {
    subject: "Booking confirmation – Ohana B&B",
    html: `
      <h2>Thank you for your booking!</h2>
      <p>Hi ${escapeHtml(p.name)},</p>
      <p>Your booking has been confirmed. Here is the summary:</p>
      <ul>
        <li><strong>Room(s):</strong> ${escapeHtml(p.roomsLabel)}</li>
        <li><strong>Check-in:</strong> ${escapeHtml(p.checkIn)}</li>
        <li><strong>Check-out:</strong> ${escapeHtml(p.checkOut)}</li>
        <li><strong>Nights:</strong> ${escapeHtml(p.nights)}</li>
        <li><strong>Guest(s):</strong> ${escapeHtml(p.guests)}</li>
        <li><strong>B&amp;B address:</strong> ${escapeHtml(fullAddressEn)}</li>
        <li><strong>Amount paid online:</strong> € ${p.amountTotal.toFixed(2)}</li>
        <li><strong>Tourist tax (€4.50 per person per night):</strong> € ${p.touristTaxEur.toFixed(2)} — ${
          p.payTouristTaxOnSite
            ? "to be paid in cash at check-in."
            : "already included in your card payment."
        }</li>
      </ul>
      <p>Below you will also find a downloadable PDF map to use during your trip:</p>
      <p><a href="${escapeHtml(p.pdfMapUrl)}">Download the PDF map of Naples and the Ohana B&amp;B area</a></p>
      <p>For changes or further information you can contact us:</p>
      <p>Email: <a href="mailto:${escapeHtml(p.contactEmail)}">${escapeHtml(p.contactEmail)}</a><br>
      Phone: ${escapeHtml(p.contactPhone)}</p>
      <p>See you soon,<br><strong>Ohana B&amp;B</strong></p>
      <p style="margin-top:22px;margin-bottom:0;line-height:0;">
        <img src="${escapeHtml(p.logoUrl)}" alt="${escapeHtml("Ohana B&B")}" width="120" style="display:block;max-width:120px;height:auto;border:0;outline:none;text-decoration:none;" />
      </p>
    `,
  };
}
