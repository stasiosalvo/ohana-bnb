"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, use, useState } from "react";

type RoomId = "sun" | "moon" | "earth";

const ROOMS: Record<
  RoomId,
  {
    name: string;
    short: string;
    pricePerNight: number;
    sizeM2: number;
    minGuests: number;
    maxGuests: number;
  }
> = {
  sun: {
    name: "Sun",
    short: "Calda, luminosa, con dettagli dorati.",
    pricePerNight: 80,
    sizeM2: 20,
    minGuests: 1,
    maxGuests: 2,
  },
  moon: {
    name: "Moon",
    short: "Silenziosa e morbida, perfetta per chi ama rallentare.",
    pricePerNight: 80,
    sizeM2: 20,
    minGuests: 1,
    maxGuests: 2,
  },
  earth: {
    name: "Earth",
    short: "Spaziosa e naturale, ideale per soggiorni lunghi.",
    pricePerNight: 80,
    sizeM2: 20,
    minGuests: 2,
    maxGuests: 2,
  },
};

type Props = {
  params: Promise<{ roomId: string }>;
};

export default function PrenotaRoomPage({ params }: Props) {
  const resolvedParams = use(params);
  const roomKey = (resolvedParams.roomId || "sun") as RoomId;
  const room = ROOMS[roomKey] ?? ROOMS.sun;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    discountedTotal: number;
    discountEur: number;
    label: string;
  } | null>(null);
  const [applyingCode, setApplyingCode] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [availabilityOk, setAvailabilityOk] = useState<boolean | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    const current = Number(guests) || room.minGuests;
    const clamped = Math.min(
      room.maxGuests,
      Math.max(room.minGuests, current)
    );
    if (current !== clamped) setGuests(String(clamped));
  }, [roomKey]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffMs = outDate.getTime() - inDate.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [checkIn, checkOut]);

  const total = nights * room.pricePerNight;

  useEffect(() => {
    setAppliedDiscount(null);
    setDiscountError(null);
  }, [total]);

  useEffect(() => {
    if (!checkIn || !checkOut || nights <= 0) {
      setAvailabilityOk(null);
      return;
    }
    let cancelled = false;
    setCheckingAvailability(true);
    setAvailabilityOk(null);
    fetch(
      `/api/availability/check?roomId=${encodeURIComponent(roomKey)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`
    )
      .then((r) => r.json())
      .then((data: { available?: boolean }) => {
        if (!cancelled) setAvailabilityOk(data.available ?? true);
      })
      .catch(() => {
        if (!cancelled) setAvailabilityOk(true);
      })
      .finally(() => {
        if (!cancelled) setCheckingAvailability(false);
      });
    return () => {
      cancelled = true;
    };
  }, [roomKey, checkIn, checkOut, nights]);

  const displayTotal = appliedDiscount ? appliedDiscount.discountedTotal : total;

  async function handleApplyCode() {
    if (!discountCode.trim() || total <= 0) return;
    setDiscountError(null);
    setApplyingCode(true);
    try {
      const res = await fetch(
        `/api/checkout/validate?code=${encodeURIComponent(discountCode.trim())}&total=${total}`
      );
      const data = (await res.json()) as {
        valid?: boolean;
        discountedTotal?: number;
        discountEur?: number;
        label?: string;
      };
      if (data.valid && data.discountedTotal != null && data.discountEur != null && data.label) {
        setAppliedDiscount({
          discountedTotal: data.discountedTotal,
          discountEur: data.discountEur,
          label: data.label,
        });
      } else {
        setAppliedDiscount(null);
        setDiscountError("Codice non valido o non applicabile.");
      }
    } catch {
      setAppliedDiscount(null);
      setDiscountError("Impossibile verificare il codice. Riprova.");
    } finally {
      setApplyingCode(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!checkIn || !checkOut || !name || !email) {
      setError("Compila almeno le date, il nome e l'email per procedere.");
      return;
    }

    if (nights <= 0) {
      setError("La data di partenza deve essere successiva alla data di arrivo.");
      return;
    }

    if (availabilityOk === false) {
      setError(
        "Queste date non sono disponibili per questa camera. Scegli altre date o un'altra camera."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: roomKey,
          checkIn,
          checkOut,
          guests: Number(guests),
          name,
          email,
          phone,
          notes,
          nights,
          total,
          discountCode: appliedDiscount ? discountCode.trim() : undefined,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Impossibile avviare il pagamento, riprova tra poco.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Risposta inattesa dal server di pagamento.");
      }
    } catch (err) {
      console.error(err);
      setError(
        "C'è stato un problema con il pagamento online. Puoi riprovare più tardi oppure contattarci via email o WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-shell">
      <div className="page-inner">
        <header className="topbar">
          <Link href="/" className="brand">
            <Image
              src="/ohana-logo.png"
              alt="Ohana Bed & Breakfast"
              width={180}
              height={56}
              className="brand-logo"
              unoptimized
            />
          </Link>
          <div className="topbar-right">
            <Link href="/" className="chip">
              Torna alla homepage
            </Link>
          </div>
        </header>

        <main>
          <section className="booking-layout" aria-label="Prenotazione camera">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Prenotazione camera</span>
              </div>
              <h1 className="booking-header-title">
                Camera {room.name}
              </h1>
              <p className="hero-subtitle">{room.short}</p>

              <div style={{ marginTop: 10, fontSize: 13, color: "#7d7166" }}>
                <span className="booking-room-pill">
                  <span>
                    {room.minGuests === room.maxGuests
                      ? room.maxGuests
                      : `${room.minGuests}-${room.maxGuests}`}{" "}
                    ospiti · {room.sizeM2} m² · bagno privato
                  </span>
                </span>{" "}
                <span style={{ marginLeft: 6 }}>
                  Da €{room.pricePerNight} / notte, coupon bar incluso.
                </span>
              </div>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="field">
                  <label className="field-label" htmlFor="checkIn">
                    Arrivo
                  </label>
                  <input
                    id="checkIn"
                    type="date"
                    className="field-input"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="checkOut">
                    Partenza
                  </label>
                  <input
                    id="checkOut"
                    type="date"
                    className="field-input"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>

                {checkIn && checkOut && nights > 0 && (
                  <div className="field" style={{ gridColumn: "1 / -1" }}>
                    {checkingAvailability && (
                      <span style={{ fontSize: 12, color: "var(--color-muted)" }}>
                        Verifica disponibilità...
                      </span>
                    )}
                    {!checkingAvailability && availabilityOk === false && (
                      <span style={{ fontSize: 12, color: "#a43131" }}>
                        Queste date non sono disponibili per questa camera. Scegli altre date o un&apos;altra camera.
                      </span>
                    )}
                  </div>
                )}

                <div className="field">
                  <label className="field-label" htmlFor="guests">
                    Ospiti
                  </label>
                  <select
                    id="guests"
                    className="field-select"
                    value={
                      Math.min(
                        room.maxGuests,
                        Math.max(room.minGuests, Number(guests) || room.minGuests)
                      ) || room.minGuests
                    }
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    {Array.from(
                      { length: room.maxGuests - room.minGuests + 1 },
                      (_, i) => room.minGuests + i
                    ).map((g) => (
                      <option key={g} value={g}>
                        {g} {g === 1 ? "ospite" : "ospiti"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="name">
                    Nome e cognome
                  </label>
                  <input
                    id="name"
                    className="field-input"
                    placeholder="Mario Rossi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="field-input"
                    placeholder="nome@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="phone">
                    Telefono (opzionale)
                  </label>
                  <input
                    id="phone"
                    className="field-input"
                    placeholder="+39 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label className="field-label" htmlFor="notes">
                    Richieste particolari
                  </label>
                  <textarea
                    id="notes"
                    className="field-textarea"
                    placeholder="Intolleranze alimentari, orari di arrivo, occasioni speciali..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <p className="field-note">
                    Ti risponderemo via email per confermare la disponibilità e
                    i dettagli prima dell&apos;arrivo.
                  </p>
                </div>

                {error && (
                  <div
                    className="field"
                    style={{ gridColumn: "1 / -1", color: "#a43131" }}
                  >
                    <span style={{ fontSize: 12 }}>{error}</span>
                  </div>
                )}

                <div
                  className="field"
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <span className="field-label">
                    Metodo di pagamento sicuro
                  </span>
                  <span className="badge-small">
                    Carta di credito, debito, Apple Pay, Google Pay (Stripe)
                  </span>
                </div>

                <div
                  style={{
                    gridColumn: "1 / -1",
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: 10,
                    alignItems: "center",
                    marginTop: 4,
                  }}
                >
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting || checkingAvailability || availabilityOk === false}
                  >
                    {isSubmitting
                      ? "Reindirizzamento in corso..."
                      : checkingAvailability
                        ? "Verifica disponibilità..."
                        : availabilityOk === false
                          ? "Date non disponibili"
                          : "Procedi al pagamento"}
                  </button>
                  <span className="text-muted">
                    La prenotazione è confermata solo dopo l&apos;email di
                    conferma.
                  </span>
                </div>
              </form>
            </div>

            <aside className="booking-summary" aria-label="Riepilogo prenotazione">
              <div className="hero-card-top">
                <div>
                  <div className="hero-card-title">
                    Riepilogo soggiorno
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>
                    Camera {room.name} · Ohana B&B
                  </div>
                </div>
                <span className="hero-card-chip">
                  Pagamento sicuro Stripe
                </span>
              </div>

              <div className="booking-summary-row">
                <span className="booking-summary-label">Date</span>
                <span>
                  {checkIn && checkOut
                    ? `${checkIn} → ${checkOut}`
                    : "Seleziona le date"}
                </span>
              </div>

              <div className="booking-summary-row">
                <span className="booking-summary-label">Notti</span>
                <span>{nights || "-"}</span>
              </div>

              <div className="booking-summary-row">
                <span className="booking-summary-label">Ospiti</span>
                <span>
                  {guests} {Number(guests) === 1 ? "ospite" : "ospiti"}
                </span>
              </div>

              <div
                style={{
                  height: 1,
                  margin: "4px 0 6px",
                  background: "rgba(255,255,255,0.65)",
                }}
              />

              <div className="booking-summary-row">
                <span className="booking-summary-label">Totale stimato</span>
                <span className="booking-summary-value-strong">
                  {nights > 0 ? (
                    <>
                      €{total.toFixed(0)}{" "}
                      <span style={{ fontWeight: 400, fontSize: 11 }}>
                        (tasse incluse)
                      </span>
                    </>
                  ) : (
                    "—"
                  )}
                </span>
              </div>

              <div className="discount-block">
                <label className="field-label" htmlFor="discount-code">
                  Codice sconto
                </label>
                <div className="discount-row">
                  <input
                    id="discount-code"
                    type="text"
                    className="field-input discount-input"
                    placeholder="Es. ESTATE25"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value);
                      setDiscountError(null);
                    }}
                    disabled={nights <= 0}
                  />
                  <button
                    type="button"
                    className="btn-ghost discount-btn"
                    onClick={handleApplyCode}
                    disabled={nights <= 0 || applyingCode || !discountCode.trim()}
                  >
                    {applyingCode ? "..." : "Applica"}
                  </button>
                </div>
                {discountError && (
                  <p className="discount-error" role="alert">
                    {discountError}
                  </p>
                )}
                {appliedDiscount && (
                  <p className="discount-success">
                    {appliedDiscount.label} applicato. Totale: €{appliedDiscount.discountedTotal.toFixed(0)}
                  </p>
                )}
              </div>

              <p className="text-muted">
                Il totale è indicativo e potrebbe variare in base a promozioni
                o periodi di alta stagione. Vedrai l&apos;importo esatto prima
                di confermare il pagamento su Stripe.
              </p>

              <div className="booking-actions">
                <span className="badge-small">
                  Puoi sempre scriverci per modificare o cancellare la
                  prenotazione in anticipo.
                </span>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
