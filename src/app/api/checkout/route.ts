import { NextResponse } from "next/server";
import Stripe from "stripe";
import { applyDiscount, canUseDiscountCode } from "@/lib/discount";
import { isPeriodBlocked, type RoomId } from "@/lib/blocked";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.replace(/\s+/g, "").trim() || undefined;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();

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

    const bodyTyped = body as {
      roomId?: string;
      rooms?: Array<{ roomId: string; pricePerNight: number; nights: number }>;
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

    const {
      roomId: singleRoomId,
      rooms: roomsPayload,
      checkIn,
      checkOut,
      guests,
      name,
      email,
      phone,
      nights,
      total,
      discountCode,
    } = bodyTyped;

    // Supporto prenotazione singola (roomId) o multipla (rooms)
    const rooms: Array<{ roomId: RoomId; pricePerNight: number; nights: number }> = roomsPayload?.length
      ? roomsPayload
          .filter((r) => r.roomId && ["sun", "moon", "earth"].includes(r.roomId))
          .map((r) => ({ roomId: r.roomId as RoomId, pricePerNight: Number(r.pricePerNight) || 0, nights: Number(r.nights) || 0 }))
          .filter((r) => r.nights >= 1 && r.pricePerNight > 0)
      : singleRoomId && ["sun", "moon", "earth"].includes(singleRoomId)
        ? [{ roomId: singleRoomId as RoomId, pricePerNight: 0, nights: Number(nights) || 0 }];

    if (!rooms.length || !checkIn || !checkOut || !name || !email) {
      return NextResponse.json(
        { error: "Dati prenotazione mancanti. Seleziona almeno una camera, date, nome e email." },
        { status: 400 }
      );
    }

    const nightsNum = rooms[0].nights;
    if (nightsNum < 1) {
      return NextResponse.json(
        { error: "Numero di notti non valido." },
        { status: 400 }
      );
    }

    for (const r of rooms) {
      const blocked = await isPeriodBlocked(r.roomId, checkIn, checkOut);
      if (blocked) {
        return NextResponse.json(
          {
            error: `Le date scelte non sono disponibili per la camera ${r.roomId.toUpperCase()}. Scegli altre date o rimuovi la camera.`,
          },
          { status: 400 }
        );
      }
    }

    const totalNum = Number(total);
    if (!Number.isFinite(totalNum) || totalNum < 0) {
      return NextResponse.json(
        { error: "Importo non valido." },
        { status: 400 }
      );
    }

    let totalToCharge = totalNum;
    const codeUsed = discountCode?.trim();
    if (codeUsed) {
      const discount = applyDiscount(codeUsed, totalNum);
      if (!discount.valid) {
        return NextResponse.json(
          { error: "Codice sconto non valido o scaduto." },
          { status: 400 }
        );
      }
      const allowed = await canUseDiscountCode(codeUsed);
      if (!allowed) {
        return NextResponse.json(
          { error: "Questo codice sconto ha raggiunto il numero massimo di utilizzi." },
          { status: 400 }
        );
      }
      totalToCharge = discount.discountedTotal;
    }

    const roomIds = rooms.map((r) => r.roomId).join(",");
    const cancelUrl = rooms.length === 1 ? `${baseUrl}/prenota/${rooms[0].roomId}` : `${baseUrl}/prenota/sun`;

    const line_items: Stripe.Checkout.SessionCreateParams["line_items"] = [];

    if (roomsPayload?.length) {
      for (const r of rooms) {
        const unitAmount = r.pricePerNight * r.nights;
        if (unitAmount <= 0) continue;
        line_items.push({
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.max(1, Math.round(unitAmount * 100)),
            product_data: {
              name: `Ohana B&B – Camera ${r.roomId.toUpperCase()}`,
              description: `${r.nights} notte/i (${checkIn} → ${checkOut})`,
            },
          },
        });
      }
      if (codeUsed && totalToCharge < totalNum) {
        const discountEur = totalNum - totalToCharge;
        line_items.push({
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: -Math.round(discountEur * 100),
            product_data: {
              name: `Sconto ${codeUsed.toUpperCase()}`,
              description: "Codice promozionale applicato",
            },
          },
        });
      }
    } else {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.max(1, Math.round(totalToCharge * 100)),
          product_data: {
            name: `Ohana B&B – Camera ${rooms[0].roomId.toUpperCase()}`,
            description: `${nightsNum} notte/i, ${guests ?? 1} ospite/i (${checkIn} → ${checkOut})`,
          },
        },
      });
    }

    const amountTotal = Math.max(1, Math.round(totalToCharge * 100));

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      metadata: {
        roomIds,
        checkIn,
        checkOut,
        guests: String(guests ?? 1),
        name,
        phone: phone ?? "",
        nights: String(nightsNum),
        ...(codeUsed ? { discountCode: codeUsed.toUpperCase() } : {}),
      },
      line_items,
      success_url: `${baseUrl}/prenotazione-completata?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const err = error as { message?: string; type?: string; code?: string };
    const message = err?.message ?? "Errore durante la creazione del pagamento.";
    const type = err?.type;
    console.error("Stripe checkout error", { message, type, code: err?.code }, error);
    // Mostra sempre l'errore reale così puoi capire la causa (es. Invalid API Key)
    return NextResponse.json(
      {
        error: message,
        ...(type ? { errorType: type } : {}),
      },
      { status: 500 }
    );
  }
}
