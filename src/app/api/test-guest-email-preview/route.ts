import {
  buildGuestConfirmationEmail,
  guestEmailLangFromPhone,
  type GuestEmailLang,
} from "@/lib/guest-confirmation-email";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name")?.trim() || "Ospite di Test";
  const roomsLabel = searchParams.get("rooms")?.trim() || "SUN, MOON";
  const checkIn = searchParams.get("checkIn")?.trim() || "2026-06-10";
  const checkOut = searchParams.get("checkOut")?.trim() || "2026-06-13";
  const nights = searchParams.get("nights")?.trim() || "3";
  const guests = searchParams.get("guests")?.trim() || "2";
  const amountTotal = Number(searchParams.get("amount") || "324");
  const touristTaxEur = Number(searchParams.get("tax") || "27");
  const payTouristTaxOnSite = searchParams.get("payOnSite") === "1";

  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "ohanab.and.b@gmail.com";
  const contactPhone =
    process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "+39 376 297 9866";
  const siteBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.trim() || "http://127.0.0.1:3000";
  const siteUrlClean = siteBaseUrl.replace(/\/$/, "");
  const pdfMapUrl = `${siteUrlClean}/mappa-napoli-ohana.pdf`;
  const logoUrl = `${siteUrlClean}/ohana-logo.png`;

  const langParam = searchParams.get("lang")?.trim().toLowerCase();
  let lang: GuestEmailLang;
  if (langParam === "en") {
    lang = "en";
  } else if (langParam === "it") {
    lang = "it";
  } else {
    const phonePrefix = searchParams.get("phonePrefix")?.trim() ?? "+39";
    const phoneSample =
      searchParams.get("phone")?.trim() ?? `${phonePrefix} 340 1234567`;
    lang = guestEmailLangFromPhone(phonePrefix, phoneSample);
  }

  const safeAmount = Number.isFinite(amountTotal) ? amountTotal : 0;
  const safeTax = Number.isFinite(touristTaxEur) ? touristTaxEur : 0;

  const { subject, html: guestHtml } = buildGuestConfirmationEmail({
    lang,
    name,
    roomsLabel,
    checkIn,
    checkOut,
    nights,
    guests,
    amountTotal: safeAmount,
    touristTaxEur: safeTax,
    payTouristTaxOnSite,
    pdfMapUrl,
    logoUrl,
    contactEmail,
    contactPhone,
  });

  const body = `<!-- Oggetto email (preview): ${subject} | lingua: ${lang} -->\n${guestHtml}`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
