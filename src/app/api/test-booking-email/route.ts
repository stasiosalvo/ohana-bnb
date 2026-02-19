import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendKey = process.env.RESEND_API_KEY?.trim();
const notifyEmail =
  process.env.BOOKING_NOTIFY_EMAIL?.trim() ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  "ohanab.and.b@gmail.com";
const adminSecret = process.env.REVIEW_ADMIN_SECRET?.trim();

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Endpoint di test: invia l'email di notifica prenotazione SENZA passare da Stripe.
 * Solo per verificare che Resend e BOOKING_NOTIFY_EMAIL funzionino.
 *
 * In sviluppo (npm run dev): chiama senza secret.
 * In produzione: passa la password admin in Authorization: Bearer <REVIEW_ADMIN_SECRET>
 *   oppure in body: { "secret": "<REVIEW_ADMIN_SECRET>" }
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const isDev = process.env.NODE_ENV === "development";
  const allowed = isDev || (adminSecret && (secret === adminSecret || request.headers.get("authorization") === `Bearer ${adminSecret}`));

  if (!allowed) {
    return NextResponse.json({ error: "Non autorizzato. In produzione usa ?secret=REVIEW_ADMIN_SECRET o Authorization: Bearer REVIEW_ADMIN_SECRET." }, { status: 401 });
  }

  if (!resendKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY non impostata su Vercel. Aggiungila in Environment Variables." },
      { status: 500 }
    );
  }

  const name = "Test Ospite";
  const customerEmail = "test@example.com";
  const phone = "+39 333 1234567";
  const roomId = "sun";
  const checkIn = "2026-03-01";
  const checkOut = "2026-03-03";
  const nights = "2";
  const guests = "2";
  const amountTotal = 150;

  try {
    const resend = new Resend(resendKey);
    const subject = `[TEST] Nuova prenotazione online – ${name} – Camera ${roomId.toUpperCase()}`;
    const html = `
      <h2>Nuova prenotazione ricevuta dal sito</h2>
      <p><strong>Ospite:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(customerEmail)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(phone) || "—"}</p>
      <p><strong>Camera:</strong> ${escapeHtml(roomId.toUpperCase())}</p>
      <p><strong>Arrivo:</strong> ${escapeHtml(checkIn)}</p>
      <p><strong>Partenza:</strong> ${escapeHtml(checkOut)}</p>
      <p><strong>Notti:</strong> ${escapeHtml(nights)}</p>
      <p><strong>Ospiti:</strong> ${escapeHtml(guests)}</p>
      <p><strong>Importo pagato:</strong> € ${amountTotal.toFixed(2)}</p>
      <p style="margin-top: 20px; color: #999; font-size: 12px;">Questa è un’email di TEST (nessun pagamento reale).</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "Ohana B&B Prenotazioni <onboarding@resend.dev>",
      to: notifyEmail,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({
      ok: true,
      message: `Email di test inviata a ${notifyEmail}. Controlla la casella (e lo spam).`,
      id: data?.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: { secret?: string } = {};
  try {
    body = await request.json();
  } catch {
    // ignore
  }
  const secret = body.secret ?? request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const isDev = process.env.NODE_ENV === "development";
  const allowed = isDev || (adminSecret && secret === adminSecret);

  if (!allowed) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  if (!resendKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY non impostata." },
      { status: 500 }
    );
  }

  const name = "Test Ospite";
  const customerEmail = "test@example.com";
  const phone = "+39 333 1234567";
  const roomId = "sun";
  const checkIn = "2026-03-01";
  const checkOut = "2026-03-03";
  const nights = "2";
  const guests = "2";
  const amountTotal = 150;

  try {
    const resend = new Resend(resendKey);
    const subject = `[TEST] Nuova prenotazione online – ${name} – Camera ${roomId.toUpperCase()}`;
    const html = `
      <h2>Nuova prenotazione ricevuta dal sito</h2>
      <p><strong>Ospite:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(customerEmail)}</p>
      <p><strong>Telefono:</strong> ${escapeHtml(phone) || "—"}</p>
      <p><strong>Camera:</strong> ${escapeHtml(roomId.toUpperCase())}</p>
      <p><strong>Arrivo:</strong> ${escapeHtml(checkIn)}</p>
      <p><strong>Partenza:</strong> ${escapeHtml(checkOut)}</p>
      <p><strong>Notti:</strong> ${escapeHtml(nights)}</p>
      <p><strong>Ospiti:</strong> ${escapeHtml(guests)}</p>
      <p><strong>Importo pagato:</strong> € ${amountTotal.toFixed(2)}</p>
      <p style="margin-top: 20px; color: #999; font-size: 12px;">Questa è un’email di TEST (nessun pagamento reale).</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "Ohana B&B Prenotazioni <onboarding@resend.dev>",
      to: notifyEmail,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({
      ok: true,
      message: `Email di test inviata a ${notifyEmail}. Controlla la casella (e lo spam).`,
      id: data?.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
