import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { addBlocked, type RoomId } from "@/lib/blocked";

export const runtime = "nodejs";

const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
const resendKey = process.env.RESEND_API_KEY?.trim();
const fromEmail =
  process.env.RESEND_FROM_EMAIL?.trim() ||
  "Ohana B&B Prenotazioni <onboarding@resend.dev>";
const notifyEmail =
  process.env.BOOKING_NOTIFY_EMAIL?.trim() ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  "ohanab.and.b@gmail.com";

function getStripe(): Stripe | null {
  if (!stripeSecret) return null;
  try {
    return new Stripe(stripeSecret, {
      apiVersion: "2023-10-16",
      typescript: true,
    });
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook non configurato (STRIPE_SECRET_KEY o STRIPE_WEBHOOK_SECRET mancanti)." },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Firma mancante." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verifica firma fallita.";
    console.error("Stripe webhook signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const roomId = session.metadata?.roomId ?? "";
  const checkIn = session.metadata?.checkIn ?? "";
  const checkOut = session.metadata?.checkOut ?? "";
  const guests = session.metadata?.guests ?? "1";
  const name = session.metadata?.name ?? "";
  const phone = session.metadata?.phone ?? "";
  const nights = session.metadata?.nights ?? "0";
  const customerEmail = session.customer_email ?? session.customer_details?.email ?? "";
  const amountTotal = session.amount_total != null ? session.amount_total / 100 : 0;

  // Blocca automaticamente le date della camera prenotata
  if (roomId && checkIn && checkOut && ["sun", "moon", "earth"].includes(roomId)) {
    try {
      await addBlocked(roomId as RoomId, checkIn, checkOut, "Prenotazione online");
    } catch (e) {
      console.error("Webhook: blocco date fallito", e);
    }
  }

  if (!resendKey) {
    console.warn("RESEND_API_KEY non impostata: email di notifica prenotazione non inviata.");
    return NextResponse.json({ received: true });
  }

  try {
    const resend = new Resend(resendKey);
    const subject = `Nuova prenotazione online – ${name} – Camera ${roomId.toUpperCase()}`;
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
      <p style="margin-top: 20px; color: #666; font-size: 12px;">Questa email è stata inviata automaticamente dopo il pagamento su Stripe.</p>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail.includes("<") ? fromEmail : `Ohana B&B Prenotazioni <${fromEmail}>`,
      to: notifyEmail,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error (notifica a te):", error);
    }

    // Email di conferma all'ospite
    if (customerEmail?.trim()) {
      const contactEmail =
        process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "ohanab.and.b@gmail.com";
      const contactPhone =
        process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "+39 376 297 9866";
      const guestSubject = `Conferma prenotazione – Ohana B&B`;
      const guestHtml = `
        <h2>Grazie per la tua prenotazione!</h2>
        <p>Ciao ${escapeHtml(name)},</p>
        <p>La tua prenotazione è stata confermata. Ecco il riepilogo:</p>
        <ul>
          <li><strong>Camera:</strong> ${escapeHtml(roomId.toUpperCase())}</li>
          <li><strong>Check-in:</strong> ${escapeHtml(checkIn)}</li>
          <li><strong>Check-out:</strong> ${escapeHtml(checkOut)}</li>
          <li><strong>Notti:</strong> ${escapeHtml(nights)}</li>
          <li><strong>Ospiti:</strong> ${escapeHtml(guests)}</li>
          <li><strong>Importo pagato:</strong> € ${amountTotal.toFixed(2)}</li>
        </ul>
        <p>Per modifiche o informazioni puoi contattarci:</p>
        <p>Email: <a href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a><br>
        Telefono: ${escapeHtml(contactPhone)}</p>
        <p>A presto,<br><strong>Ohana B&B</strong></p>
      `;
      const fromAddr = fromEmail.includes("<") ? fromEmail : `Ohana B&B Prenotazioni <${fromEmail}>`;
      const { error: guestError } = await resend.emails.send({
        from: fromAddr,
        to: customerEmail.trim(),
        subject: guestSubject,
        html: guestHtml,
      });
      if (guestError) {
        console.error("Resend error (conferma ospite):", guestError);
      }
    }
  } catch (err) {
    console.error("Errore invio email notifica prenotazione:", err);
  }

  return NextResponse.json({ received: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
