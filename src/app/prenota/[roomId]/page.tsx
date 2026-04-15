"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, use, useState } from "react";
import { bookingTouristTaxCopy } from "@/lib/booking-i18n";
import { prenotaPageCopy } from "@/lib/i18n/prenota-page";
import { useSiteLang, type SiteLang } from "@/lib/site-language";
import {
  roomNightlyBreakdown,
  roomStaySubtotalEur,
  stayTouchesAugust,
  stayTouchesJuneOrJuly,
} from "@/lib/room-pricing";
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

const RECEIPT_LOCALE: Record<SiteLang, string> = {
  it: "it-IT",
  en: "en-GB",
  fr: "fr-FR",
  es: "es-ES",
};

type PrefixOption = { country: string; dial: string };

const EUROPE_PREFIX_OPTIONS: PrefixOption[] = [
  { country: "AL", dial: "+355" }, { country: "AD", dial: "+376" }, { country: "AM", dial: "+374" },
  { country: "AT", dial: "+43" }, { country: "AZ", dial: "+994" }, { country: "BY", dial: "+375" },
  { country: "BE", dial: "+32" }, { country: "BA", dial: "+387" }, { country: "BG", dial: "+359" },
  { country: "HR", dial: "+385" }, { country: "CY", dial: "+357" }, { country: "CZ", dial: "+420" },
  { country: "DK", dial: "+45" }, { country: "EE", dial: "+372" }, { country: "FI", dial: "+358" },
  { country: "FR", dial: "+33" }, { country: "GE", dial: "+995" }, { country: "DE", dial: "+49" },
  { country: "GI", dial: "+350" }, { country: "GR", dial: "+30" }, { country: "HU", dial: "+36" },
  { country: "IS", dial: "+354" }, { country: "IE", dial: "+353" }, { country: "IT", dial: "+39" },
  { country: "XK", dial: "+383" }, { country: "LV", dial: "+371" }, { country: "LI", dial: "+423" },
  { country: "LT", dial: "+370" }, { country: "LU", dial: "+352" }, { country: "MT", dial: "+356" },
  { country: "MD", dial: "+373" }, { country: "MC", dial: "+377" }, { country: "ME", dial: "+382" },
  { country: "NL", dial: "+31" }, { country: "MK", dial: "+389" }, { country: "NO", dial: "+47" },
  { country: "PL", dial: "+48" }, { country: "PT", dial: "+351" }, { country: "RO", dial: "+40" },
  { country: "RU", dial: "+7" }, { country: "SM", dial: "+378" }, { country: "RS", dial: "+381" },
  { country: "SK", dial: "+421" }, { country: "SI", dial: "+386" }, { country: "ES", dial: "+34" },
  { country: "SE", dial: "+46" }, { country: "CH", dial: "+41" }, { country: "TR", dial: "+90" },
  { country: "UA", dial: "+380" }, { country: "GB", dial: "+44" }, { country: "VA", dial: "+379" },
];

const NON_EUROPE_PREFIX_OPTIONS: PrefixOption[] = [
  { country: "AF", dial: "+93" }, { country: "DZ", dial: "+213" }, { country: "AO", dial: "+244" },
  { country: "AG", dial: "+1-268" }, { country: "AR", dial: "+54" }, { country: "AU", dial: "+61" },
  { country: "BS", dial: "+1-242" }, { country: "BH", dial: "+973" }, { country: "BD", dial: "+880" },
  { country: "BB", dial: "+1-246" }, { country: "BZ", dial: "+501" }, { country: "BJ", dial: "+229" },
  { country: "BT", dial: "+975" }, { country: "BO", dial: "+591" }, { country: "BW", dial: "+267" },
  { country: "BR", dial: "+55" }, { country: "BN", dial: "+673" }, { country: "BF", dial: "+226" },
  { country: "BI", dial: "+257" }, { country: "KH", dial: "+855" }, { country: "CM", dial: "+237" },
  { country: "CA", dial: "+1" }, { country: "CV", dial: "+238" }, { country: "CF", dial: "+236" },
  { country: "TD", dial: "+235" }, { country: "CL", dial: "+56" }, { country: "CN", dial: "+86" },
  { country: "CO", dial: "+57" }, { country: "KM", dial: "+269" }, { country: "CG", dial: "+242" },
  { country: "CD", dial: "+243" }, { country: "CR", dial: "+506" }, { country: "CI", dial: "+225" },
  { country: "CU", dial: "+53" }, { country: "DJ", dial: "+253" }, { country: "DM", dial: "+1-767" },
  { country: "DO", dial: "+1-809" }, { country: "EC", dial: "+593" }, { country: "EG", dial: "+20" },
  { country: "SV", dial: "+503" }, { country: "GQ", dial: "+240" }, { country: "ER", dial: "+291" },
  { country: "SZ", dial: "+268" }, { country: "ET", dial: "+251" }, { country: "FJ", dial: "+679" },
  { country: "GA", dial: "+241" }, { country: "GM", dial: "+220" }, { country: "GH", dial: "+233" },
  { country: "GD", dial: "+1-473" }, { country: "GT", dial: "+502" }, { country: "GN", dial: "+224" },
  { country: "GW", dial: "+245" }, { country: "GY", dial: "+592" }, { country: "HT", dial: "+509" },
  { country: "HN", dial: "+504" }, { country: "HK", dial: "+852" }, { country: "IN", dial: "+91" },
  { country: "ID", dial: "+62" }, { country: "IR", dial: "+98" }, { country: "IQ", dial: "+964" },
  { country: "IL", dial: "+972" }, { country: "JM", dial: "+1-876" }, { country: "JP", dial: "+81" },
  { country: "JO", dial: "+962" }, { country: "KZ", dial: "+7" }, { country: "KE", dial: "+254" },
  { country: "KI", dial: "+686" }, { country: "KP", dial: "+850" }, { country: "KR", dial: "+82" },
  { country: "KW", dial: "+965" }, { country: "KG", dial: "+996" }, { country: "LA", dial: "+856" },
  { country: "LB", dial: "+961" }, { country: "LS", dial: "+266" }, { country: "LR", dial: "+231" },
  { country: "LY", dial: "+218" }, { country: "MO", dial: "+853" }, { country: "MG", dial: "+261" },
  { country: "MW", dial: "+265" }, { country: "MY", dial: "+60" }, { country: "MV", dial: "+960" },
  { country: "ML", dial: "+223" }, { country: "MH", dial: "+692" }, { country: "MR", dial: "+222" },
  { country: "MU", dial: "+230" }, { country: "MX", dial: "+52" }, { country: "FM", dial: "+691" },
  { country: "MN", dial: "+976" }, { country: "MA", dial: "+212" }, { country: "MZ", dial: "+258" },
  { country: "MM", dial: "+95" }, { country: "NA", dial: "+264" }, { country: "NR", dial: "+674" },
  { country: "NP", dial: "+977" }, { country: "NZ", dial: "+64" }, { country: "NI", dial: "+505" },
  { country: "NE", dial: "+227" }, { country: "NG", dial: "+234" }, { country: "OM", dial: "+968" },
  { country: "PK", dial: "+92" }, { country: "PW", dial: "+680" }, { country: "PA", dial: "+507" },
  { country: "PG", dial: "+675" }, { country: "PY", dial: "+595" }, { country: "PE", dial: "+51" },
  { country: "PH", dial: "+63" }, { country: "QA", dial: "+974" }, { country: "RW", dial: "+250" },
  { country: "KN", dial: "+1-869" }, { country: "LC", dial: "+1-758" }, { country: "VC", dial: "+1-784" },
  { country: "WS", dial: "+685" }, { country: "ST", dial: "+239" }, { country: "SA", dial: "+966" },
  { country: "SN", dial: "+221" }, { country: "SC", dial: "+248" }, { country: "SL", dial: "+232" },
  { country: "SG", dial: "+65" }, { country: "SB", dial: "+677" }, { country: "SO", dial: "+252" },
  { country: "ZA", dial: "+27" }, { country: "SS", dial: "+211" }, { country: "LK", dial: "+94" },
  { country: "SD", dial: "+249" }, { country: "SR", dial: "+597" }, { country: "SY", dial: "+963" },
  { country: "TW", dial: "+886" }, { country: "TJ", dial: "+992" }, { country: "TZ", dial: "+255" },
  { country: "TH", dial: "+66" }, { country: "TL", dial: "+670" }, { country: "TG", dial: "+228" },
  { country: "TO", dial: "+676" }, { country: "TT", dial: "+1-868" }, { country: "TN", dial: "+216" },
  { country: "TM", dial: "+993" }, { country: "TV", dial: "+688" }, { country: "UG", dial: "+256" },
  { country: "AE", dial: "+971" }, { country: "US", dial: "+1" }, { country: "UY", dial: "+598" },
  { country: "UZ", dial: "+998" }, { country: "VU", dial: "+678" }, { country: "VE", dial: "+58" },
  { country: "VN", dial: "+84" }, { country: "YE", dial: "+967" }, { country: "ZM", dial: "+260" },
  { country: "ZW", dial: "+263" },
];

function countryFlag(countryCode: string): string {
  const code = countryCode.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return countryCode;
  const a = code.codePointAt(0);
  const b = code.codePointAt(1);
  if (!a || !b) return countryCode;
  return String.fromCodePoint(127397 + a, 127397 + b);
}

function formatReceiptDate(ymd: string, lang: SiteLang): string {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(RECEIPT_LOCALE[lang], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

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
  const [phonePrefix, setPhonePrefix] = useState("+39");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappPrefix, setWhatsappPrefix] = useState("+39");
  const [whatsappNumber, setWhatsappNumber] = useState("");
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

  const total = useMemo(() => {
    if (!checkIn || !checkOut || nights <= 0) return 0;
    return selectedRooms.reduce(
      (sum, id) => sum + roomStaySubtotalEur(id, checkIn, checkOut),
      0
    );
  }, [selectedRooms, checkIn, checkOut, nights]);

  const showJunJulNote = useMemo(
    () =>
      Boolean(
        checkIn &&
          checkOut &&
          nights > 0 &&
          stayTouchesJuneOrJuly(checkIn, checkOut)
      ),
    [checkIn, checkOut, nights]
  );

  const showAugustNote = useMemo(
    () =>
      Boolean(
        checkIn &&
          checkOut &&
          nights > 0 &&
          stayTouchesAugust(checkIn, checkOut)
      ),
    [checkIn, checkOut, nights]
  );

  const selectedRoomsTitle = useMemo(() => {
    if (!selectedRooms.length) return room.name;
    return selectedRooms.map((id) => ROOMS[id].name).join(" + ");
  }, [selectedRooms, room.name]);

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

  const nightlyLinesByRoom = useMemo(() => {
    if (!checkIn || !checkOut || nights <= 0) return [];
    return selectedRooms.map((roomId) => ({
      roomId,
      lines: roomNightlyBreakdown(roomId, checkIn, checkOut),
    }));
  }, [selectedRooms, checkIn, checkOut, nights]);

  const receiptTaxFormula = useMemo(() => {
    if (nights <= 0) return "";
    return tax.receiptTaxLine
      .replace("{rate}", STAY_TAX_EUR_PER_PERSON_PER_NIGHT.toFixed(2))
      .replace("{nights}", String(nights))
      .replace("{nightsWord}", nights === 1 ? tax.night : tax.nights)
      .replace("{guests}", String(guestCount))
      .replace("{guestsWord}", guestCount === 1 ? tax.guest : tax.guests)
      .replace("{amount}", touristTax.toFixed(2));
  }, [nights, guestCount, touristTax, tax]);

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

    if (!checkIn || !checkOut || !name || !email || !phoneNumber.trim()) {
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
      const phone = `${phonePrefix} ${phoneNumber.trim()}`.trim();
      const whatsappPhone = whatsappNumber.trim()
        ? `${whatsappPrefix} ${whatsappNumber.trim()}`.trim()
        : "";
      const payload =
        selectedRooms.length > 1
          ? {
              rooms: selectedRooms.map((id) => ({
                roomId: id,
                nights,
              })),
              checkIn,
              checkOut,
              guests: Number(guests),
              name,
              email,
              phone,
              whatsappPhone,
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
              whatsappPhone,
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
                {`${p.titleSinglePrefix} ${selectedRoomsTitle}`}
              </h1>
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

              {(showJunJulNote || showAugustNote) && (
                <div style={{ marginTop: 12 }}>
                  {showJunJulNote && (
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: showAugustNote ? 8 : 0,
                        fontSize: 13,
                        lineHeight: 1.45,
                        color: "#5c5349",
                      }}
                    >
                      {p.junJulPricingNote}
                    </p>
                  )}
                  {showAugustNote && (
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: 13,
                        lineHeight: 1.45,
                        color: "#5c5349",
                      }}
                    >
                      {p.augustPricingNote}
                    </p>
                  )}
                </div>
              )}

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
                  <div style={{ display: "flex", gap: 8 }}>
                    <select
                      aria-label="Prefisso telefono"
                      className="field-select"
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      style={{ maxWidth: 185, flexShrink: 0 }}
                    >
                      <optgroup label="Europa">
                        {EUROPE_PREFIX_OPTIONS.map((opt) => (
                          <option key={`eu-${opt.country}-${opt.dial}`} value={opt.dial}>
                            {countryFlag(opt.country)} {opt.country} ({opt.dial})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Non Europa">
                        {NON_EUROPE_PREFIX_OPTIONS.map((opt) => (
                          <option key={`non-eu-${opt.country}-${opt.dial}`} value={opt.dial}>
                            {countryFlag(opt.country)} {opt.country} ({opt.dial})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <input
                      id="phone"
                      className="field-input"
                      placeholder={p.phonePlaceholder}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="whatsappPhone">
                    {p.whatsappLabel}
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <select
                      aria-label="Prefisso WhatsApp"
                      className="field-select"
                      value={whatsappPrefix}
                      onChange={(e) => setWhatsappPrefix(e.target.value)}
                      style={{ maxWidth: 185, flexShrink: 0 }}
                    >
                      <optgroup label="Europa">
                        {EUROPE_PREFIX_OPTIONS.map((opt) => (
                          <option key={`wa-eu-${opt.country}-${opt.dial}`} value={opt.dial}>
                            {countryFlag(opt.country)} {opt.country} ({opt.dial})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Non Europa">
                        {NON_EUROPE_PREFIX_OPTIONS.map((opt) => (
                          <option key={`wa-non-eu-${opt.country}-${opt.dial}`} value={opt.dial}>
                            {countryFlag(opt.country)} {opt.country} ({opt.dial})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <input
                      id="whatsappPhone"
                      className="field-input"
                      placeholder={p.whatsappPlaceholder}
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                  </div>
                  <p className="field-note">{p.whatsappHint}</p>
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
              </div>

              {nights > 0 && (
                <div
                  className="booking-receipt"
                  role="region"
                  aria-label={p.receiptAria}
                >
                  <div className="booking-receipt-title">{p.receiptTitle}</div>
                  {nightlyLinesByRoom.map(({ roomId, lines }) => (
                    <div key={roomId}>
                      <div className="booking-receipt-room">
                        {p.receiptRoomHeading.replace("{name}", ROOMS[roomId].name)}
                      </div>
                      {lines.map((line) => (
                        <div
                          key={line.dateYmd}
                          className="booking-receipt-line booking-receipt-line--muted"
                        >
                          <span>{formatReceiptDate(line.dateYmd, lang)}</span>
                          <span>€{line.amountEur.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="booking-receipt-line booking-receipt-line--sub">
                    <span>{p.receiptSubtotalRooms}</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="booking-receipt-line booking-receipt-line--discount">
                      <span>
                        {p.receiptDiscount.replace("{label}", appliedDiscount.label)}
                      </span>
                      <span>−€{appliedDiscount.discountEur.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="booking-receipt-line booking-receipt-line--sub">
                    <span>{p.receiptAfterDiscountRooms}</span>
                    <span>€{displayTotal.toFixed(2)}</span>
                  </div>
                  <p className="booking-receipt-vat-hint">{tax.roomVatNote}</p>

                  <div className="booking-receipt-line booking-receipt-line--tax">
                    <span className="booking-receipt-tax-label">{tax.touristTaxLabel}</span>
                    <span className="booking-receipt-tax-formula">{receiptTaxFormula}</span>
                  </div>
                  {payTouristTaxOnSite && touristTax > 0 && (
                    <p className="booking-receipt-note">{tax.receiptTaxOnSiteBadge}</p>
                  )}

                  <label
                    className="booking-receipt-checkbox"
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
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
                  <p className="text-muted" style={{ fontSize: 12, marginTop: 6, marginBottom: 0 }}>
                    {payTouristTaxOnSite ? tax.helpPayOnSite : tax.helpPayOnline}
                  </p>

                  <div className="booking-receipt-line booking-receipt-line--grand">
                    <span>{tax.totalPayOnline}</span>
                    <span>€{totalToPayOnline.toFixed(2)}</span>
                  </div>
                </div>
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
