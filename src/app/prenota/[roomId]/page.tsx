"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, use, useState } from "react";
import { bookingTouristTaxCopy } from "@/lib/booking-i18n";
import { prenotaPageCopy } from "@/lib/i18n/prenota-page";
import { useSiteLang } from "@/lib/site-language";
import {
  nightsBetween,
  STAY_TAX_EUR_PER_PERSON_PER_NIGHT,
  stayTaxEur,
} from "@/lib/tourist-tax";

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
    pricePerNight: 70,
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

  const [selectedRooms, setSelectedRooms] = useState<RoomId[]>([roomKey]);
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
  const [payTouristTaxOnSite, setPayTouristTaxOnSite] = useState(false);
  const { lang, setLang } = useSiteLang();
  const tax = bookingTouristTaxCopy[lang];
  const p = prenotaPageCopy[lang];

  const toggleRoom = (id: RoomId) => {
    setSelectedRooms((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter((r) => r !== id);
      }
      return [...prev, id];
    });
  };

  useEffect(() => {
    if (!selectedRooms.includes(roomKey)) setSelectedRooms((prev) => [...prev, roomKey]);
  }, [roomKey]);

  const maxGuests = Math.max(...selectedRooms.map((id) => ROOMS[id].maxGuests), 2);
  const minGuests = Math.min(...selectedRooms.map((id) => ROOMS[id].minGuests), 1);

  useEffect(() => {
    const current = Number(guests) || minGuests;
    const clamped = Math.min(maxGuests, Math.max(minGuests, current));
    if (current !== clamped) setGuests(String(clamped));
  }, [selectedRooms, minGuests, maxGuests]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return nightsBetween(checkIn, checkOut);
  }, [checkIn, checkOut]);

  const total = useMemo(
    () => selectedRooms.reduce((sum, id) => sum + ROOMS[id].pricePerNight * nights, 0),
    [selectedRooms, nights]
  );

  useEffect(() => {
    setAppliedDiscount(null);
    setDiscountError(null);
  }, [total]);

  useEffect(() => {
    if (!checkIn || !checkOut || nights <= 0 || selectedRooms.length === 0) {
      setAvailabilityOk(null);
      return;
    }
    let cancelled = false;
    setCheckingAvailability(true);
    setAvailabilityOk(null);
    Promise.all(
      selectedRooms.map((roomId) =>
        fetch(
          `/api/availability/check?roomId=${encodeURIComponent(roomId)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`
        ).then((r) => r.json())
      )
    )
      .then((results: { available?: boolean }[]) => {
        if (cancelled) return;
        const allOk = results.every((data) => data.available !== false);
        setAvailabilityOk(allOk);
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
  }, [selectedRooms, checkIn, checkOut, nights]);

  const displayTotal = appliedDiscount ? appliedDiscount.discountedTotal : total;

  const guestCount = useMemo(() => {
    const n = Number(guests) || minGuests;
    return Math.min(maxGuests, Math.max(minGuests, n));
  }, [guests, minGuests, maxGuests]);

  const touristTax = useMemo(
    () => (nights > 0 ? stayTaxEur(nights, guestCount) : 0),
    [nights, guestCount]
  );

  const totalToPayOnline = displayTotal + (payTouristTaxOnSite ? 0 : touristTax);

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
        setDiscountError(p.discountInvalid);
      }
    } catch {
      setAppliedDiscount(null);
      setDiscountError(p.discountVerifyFail);
    } finally {
      setApplyingCode(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!checkIn || !checkOut || !name || !email) {
      setError(p.errorFillFields);
      return;
    }

    if (nights <= 0) {
      setError(p.errorCheckoutDates);
      return;
    }

    if (availabilityOk === false) {
      setError(
        selectedRooms.length > 1 ? p.datesUnavailableMulti : p.datesUnavailableSingle
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const payload =
        selectedRooms.length > 1
          ? {
              rooms: selectedRooms.map((id) => ({
                roomId: id,
                pricePerNight: ROOMS[id].pricePerNight,
                nights,
              })),
              checkIn,
              checkOut,
              guests: Number(guests),
              name,
              email,
              phone,
              notes,
              nights,
              total,
              payTouristTaxOnSite,
              discountCode: appliedDiscount ? discountCode.trim() : undefined,
            }
          : {
              roomId: selectedRooms[0],
              checkIn,
              checkOut,
              guests: Number(guests),
              name,
              email,
              phone,
              notes,
              nights,
              total,
              payTouristTaxOnSite,
              discountCode: appliedDiscount ? discountCode.trim() : undefined,
            };
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error || p.paymentStartFail);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(p.paymentUnexpected);
      }
    } catch (err) {
      console.error(err);
      setError(p.paymentCatch);
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
            <div className="lang-switch" aria-label={tax.langSwitchAria}>
              <button
                type="button"
                className={`lang-pill ${lang === "it" ? "lang-pill--active" : ""}`}
                onClick={() => setLang("it")}
              >
                IT
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === "en" ? "lang-pill--active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === "fr" ? "lang-pill--active" : ""}`}
                onClick={() => setLang("fr")}
              >
                FR
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === "es" ? "lang-pill--active" : ""}`}
                onClick={() => setLang("es")}
              >
                ES
              </button>
            </div>
            <Link href="/" className="chip">
              {tax.backHome}
            </Link>
          </div>
        </header>

        <main>
          <section className="booking-layout" aria-label={p.layoutAria}>
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>{p.eyebrow}</span>
              </div>
              <h1 className="booking-header-title">
                {selectedRooms.length > 1
                  ? p.titleMulti.replace("{n}", String(selectedRooms.length))
                  : `${p.titleSinglePrefix} ${room.name}`}
              </h1>
              <p className="hero-subtitle">
                {selectedRooms.length > 1
                  ? p.subtitleMulti
                  : p.roomShort[roomKey]}
              </p>

              <div className="booking-room-selector">
                <span className="booking-room-selector-label">{p.roomSelectorLabel}</span>
                <div className="booking-room-cards" role="group" aria-label={p.roomCardsAria}>
                  <button
                    type="button"
                    onClick={() => toggleRoom("sun")}
                    className={`booking-room-card ${selectedRooms.includes("sun") ? "booking-room-card--active" : ""}`}
                    aria-pressed={selectedRooms.includes("sun")}
                    aria-label={`Sun €80${p.perNight}`}
                  >
                    <span className="booking-room-card-check">{selectedRooms.includes("sun") ? "✓" : ""}</span>
                    <span className="booking-room-card-name">Sun</span>
                    <span className="booking-room-card-price">€80{p.perNight}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleRoom("moon")}
                    className={`booking-room-card ${selectedRooms.includes("moon") ? "booking-room-card--active" : ""}`}
                    aria-pressed={selectedRooms.includes("moon")}
                    aria-label={`Moon €80${p.perNight}`}
                  >
                    <span className="booking-room-card-check">{selectedRooms.includes("moon") ? "✓" : ""}</span>
                    <span className="booking-room-card-name">Moon</span>
                    <span className="booking-room-card-price">€80{p.perNight}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleRoom("earth")}
                    className={`booking-room-card ${selectedRooms.includes("earth") ? "booking-room-card--active" : ""}`}
                    aria-pressed={selectedRooms.includes("earth")}
                    aria-label={`Earth €70${p.perNight}`}
                  >
                    <span className="booking-room-card-check">{selectedRooms.includes("earth") ? "✓" : ""}</span>
                    <span className="booking-room-card-name">Earth</span>
                    <span className="booking-room-card-price">€70{p.perNight}</span>
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 14, fontSize: 13, color: "#7d7166" }}>
                <span className="booking-room-pill">
                  <span>
                    {minGuests === maxGuests ? maxGuests : `${minGuests}-${maxGuests}`} {p.pillGuests}
                    {selectedRooms.length > 1
                      ? ` · ${selectedRooms.length} ${p.pillRooms}`
                      : ` · ${room.sizeM2} ${p.pillSingleSuffix}`}
                  </span>
                </span>{" "}
                <span style={{ marginLeft: 6 }}>
                  {selectedRooms.length > 1
                    ? `${selectedRooms.map((id) => ROOMS[id].name).join(" + ")}: ${p.totalLineMulti
                        .replace("{total}", String(total))
                        .replace("{nights}", String(nights))}`
                    : p.singleRoomPriceLine
                        .replace("{name}", `${p.summaryCamera} ${room.name}`)
                        .replace("{price}", String(room.pricePerNight))}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="field">
                  <label className="field-label" htmlFor="checkIn">
                    {p.arrival}
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
                    {p.departure}
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
                        {p.checkingAvailability}
                      </span>
                    )}
                    {!checkingAvailability && availabilityOk === false && (
                      <span style={{ fontSize: 12, color: "#a43131" }}>
                        {selectedRooms.length > 1
                          ? p.datesUnavailableMulti
                          : p.datesUnavailableSingle}
                      </span>
                    )}
                  </div>
                )}

                <div className="field">
                  <label className="field-label" htmlFor="guests">
                    {p.guestsLabel}
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
                        {g} {g === 1 ? p.guestOne : p.guestsMany}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="name">
                    {p.nameLabel}
                  </label>
                  <input
                    id="name"
                    className="field-input"
                    placeholder={p.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="email">
                    {p.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="field-input"
                    placeholder={p.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="phone">
                    {p.phoneLabel}
                  </label>
                  <input
                    id="phone"
                    className="field-input"
                    placeholder={p.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label className="field-label" htmlFor="notes">
                    {p.notesLabel}
                  </label>
                  <textarea
                    id="notes"
                    className="field-textarea"
                    placeholder={p.notesPlaceholder}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <p className="field-note">{p.notesHint}</p>
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
                  <span className="field-label">{p.paymentMethodLabel}</span>
                  <span className="badge-small">{p.paymentMethodBadge}</span>
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
                      ? p.submitRedirecting
                      : checkingAvailability
                        ? p.submitChecking
                        : availabilityOk === false
                          ? p.submitUnavailable
                          : p.submitPay}
                  </button>
                  <span className="text-muted">{p.submitNote}</span>
                </div>
              </form>
            </div>

            <aside className="booking-summary" aria-label={p.summaryAsideAria}>
              <div className="hero-card-top">
                <div>
                  <div className="hero-card-title">{p.summaryTitle}</div>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>
                    {p.summaryCamera} {room.name} · Ohana B&amp;B
                  </div>
                </div>
                <span className="hero-card-chip">{p.summaryChip}</span>
              </div>

              <div className="booking-summary-row">
                <span className="booking-summary-label">{p.datesLabel}</span>
                <span>
                  {checkIn && checkOut
                    ? `${checkIn} → ${checkOut}`
                    : p.selectDates}
                </span>
              </div>

              <div className="booking-summary-row">
                <span className="booking-summary-label">{p.nightsLabel}</span>
                <span>{nights || "-"}</span>
              </div>

              <div className="booking-summary-row">
                <span className="booking-summary-label">{p.guestsSummaryLabel}</span>
                <span>
                  {guests}{" "}
                  {Number(guests) === 1 ? p.guestOne : p.guestsMany}
                </span>
              </div>

              <div className="discount-block">
                <label className="field-label" htmlFor="discount-code">
                  {p.discountLabel}
                </label>
                <div className="discount-row">
                  <input
                    id="discount-code"
                    type="text"
                    className="field-input discount-input"
                    placeholder={p.discountPlaceholder}
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
                    {applyingCode ? p.discountApplying : p.discountApply}
                  </button>
                </div>
                {discountError && (
                  <p className="discount-error" role="alert">
                    {discountError}
                  </p>
                )}
                {appliedDiscount && (
                  <p className="discount-success">
                    {p.discountSuccessLine
                      .replace("{label}", appliedDiscount.label)
                      .replace("{total}", appliedDiscount.discountedTotal.toFixed(0))}
                  </p>
                )}
              </div>

              <div
                style={{
                  height: 1,
                  margin: "4px 0 6px",
                  background: "rgba(255,255,255,0.65)",
                }}
              />

              <div className="booking-summary-row">
                <span className="booking-summary-label">{tax.estimatedTotal}</span>
                <span className="booking-summary-value-strong">
                  {nights > 0 ? (
                    <>
                      €{displayTotal.toFixed(0)}{" "}
                      <span style={{ fontWeight: 400, fontSize: 11 }}>
                        {tax.roomVatNote}
                      </span>
                    </>
                  ) : (
                    "—"
                  )}
                </span>
              </div>

              {nights > 0 && (
                <>
                  <div className="booking-summary-row" style={{ alignItems: "flex-start" }}>
                    <span className="booking-summary-label">{tax.touristTaxLabel}</span>
                    <span style={{ textAlign: "right", fontSize: 13 }}>
                      €{STAY_TAX_EUR_PER_PERSON_PER_NIGHT.toFixed(2)} × {nights}{" "}
                      {nights === 1 ? tax.night : tax.nights} × {guestCount}{" "}
                      {guestCount === 1 ? tax.guest : tax.guests} = €{touristTax.toFixed(2)}
                    </span>
                  </div>
                  <label
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      marginTop: 8,
                      marginBottom: 6,
                      cursor: "pointer",
                      fontSize: 13,
                      lineHeight: 1.35,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={payTouristTaxOnSite}
                      onChange={(e) => setPayTouristTaxOnSite(e.target.checked)}
                      style={{ marginTop: 3, flexShrink: 0 }}
                    />
                    <span>{tax.payTaxOnSiteCheckbox}</span>
                  </label>
                  <p className="text-muted" style={{ fontSize: 12, marginTop: 0, marginBottom: 8 }}>
                    {payTouristTaxOnSite ? tax.helpPayOnSite : tax.helpPayOnline}
                  </p>
                  <div className="booking-summary-row">
                    <span className="booking-summary-label">{tax.totalPayOnline}</span>
                    <span className="booking-summary-value-strong">
                      €{totalToPayOnline.toFixed(2)}
                    </span>
                  </div>
                </>
              )}

              <p className="text-muted">{p.disclaimer}</p>

              <div className="booking-actions">
                <span className="badge-small">{p.badgeFooter}</span>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
