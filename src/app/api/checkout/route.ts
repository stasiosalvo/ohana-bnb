import { NextResponse } from "next/server";
import Stripe from "stripe";
import { applyDiscount } from "@/lib/discount";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim();
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function getStripe(): Stripe | null {
  if (!stripeSecretKey) return null;
  try {
    return new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
      timeout: 30000,
    });
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !baseUrl) {
    return NextResponse.json(
      {
        error:
          "Pagamento non configurato. Imposta STRIPE_SECRET_KEY e NEXT_PUBLIC_BASE_URL nelle variabili d'ambiente.",
      },
      { status: 500 }
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Richiesta non valida (body JSON mancante o errato)." },
        { status: 400 }
      );
    }

    const {
      roomId,
      checkIn,
      checkOut,
      guests,
      name,
      email,
      phone,
      nights,
      total,
      discountCode,
    } = body as {
      roomId?: string;
      checkIn?: string;
      checkOut?: string;
      guests?: number;
      name?: string;
      email?: string;
      phone?: string;
      nights?: number;
      total?: number;
      discountCode?: string;
    };

    if (!roomId || !checkIn || !checkOut || !name || !email || nights == null) {
      return NextResponse.json(
        { error: "Dati prenotazione mancanti o non validi." },
        { status: 400 }
      );
    }

    const totalNum = Number(total);
    const nightsNum = Number(nights);
    if (!Number.isFinite(totalNum) || totalNum < 0 || !Number.isFinite(nightsNum) || nightsNum < 1) {
      return NextResponse.json(
        { error: "Importo o numero di notti non validi." },
        { status: 400 }
      );
    }

    let totalToCharge = totalNum;
    if (discountCode?.trim()) {
      const discount = applyDiscount(discountCode.trim(), totalNum);
      if (!discount.valid) {
        return NextResponse.json(
          { error: "Codice sconto non valido o scaduto." },
          { status: 400 }
        );
      }
      totalToCharge = discount.discountedTotal;
    }

    const amount = Math.max(1, Math.round(totalToCharge * 100));

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      metadata: {
        roomId,
        checkIn,
        checkOut,
        guests: String(guests ?? 1),
        name,
        phone: phone ?? "",
        nights: String(nightsNum),
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amount,
            product_data: {
              name: `Soggiorno Ohana B&B – camera ${roomId.toUpperCase()}`,
              description: `${nightsNum} notte/i, ${guests ?? 1} ospite/i (${checkIn} → ${checkOut})`,
            },
          },
        },
      ],
      success_url: `${baseUrl}/prenotazione-completata?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/prenota/${roomId}`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    const message =
      error instanceof Error ? error.message : "Errore durante la creazione del pagamento.";
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? message
            : "Errore durante la creazione del pagamento. Riprova o contattaci.",
      },
      { status: 500 }
    );
  }
}
