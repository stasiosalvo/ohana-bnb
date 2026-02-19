"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

type Lang = "it" | "en";

const copy = {
  it: {
    heroEyebrow: "Bed & Breakfast",
    heroTitle: "Ohana, il tuo rifugio elegante nel cuore della città.",
    heroSubtitle:
      "Camere curate nei dettagli e un'accoglienza genuina, fatta di attenzione e disponibilità. Ohana è un boutique B&B che unisce comfort, luce naturale, colori e un'atmosfera serena, per farti sentire subito a casa.",
    ctaPrimary: "Prenota il tuo soggiorno",
    ctaSecondary: "Scopri le camere",
    roomsTitle: "Le nostre camere",
    roomsSubtitle: "Tre atmosfere diverse, stessa cura.",
    roomSunName: "Sun",
    roomSunDesc: "Calda, luminosa, con dettagli dorati e vista soleggiata.",
    roomMoonName: "Moon",
    roomMoonDesc: "Silenziosa, morbida, pensata per chi ama rallentare.",
    roomEarthName: "Earth",
    roomEarthDesc:
      "Spaziosa e naturale, ideale per soggiorni lunghi e famiglie.",
    fromNight: "da",
    perNight: "/notte",
    inclBreakfast: "Coupon bar incluso",
    servicesTitle: "Servizi inclusi",
    servicesSubtitle: "Piccoli gesti che rendono il soggiorno speciale.",
    contactsTitle: "Come arrivare & contatti",
    contactsSubtitle:
      "Ti seguiamo prima, durante e dopo il soggiorno. Scrivici in qualsiasi momento.",
    contactAddressLabel: "Indirizzo",
    contactAddressValue: "Via Lavinaio 19, 80142, Napoli, Campania, Italia",
    contactPhoneLabel: "Telefono",
    contactEmailLabel: "Email",
    contactWhatsappLabel: "Whatsapp",
    contactPhoneValue: CONTACT_PHONE,
    contactEmailValue: CONTACT_EMAIL,
    contactWhatsappValue: CONTACT_PHONE,
    contactActionCall: "Chiama ora",
    contactActionMail: "Scrivi una mail",
    contactActionWhatsapp: "Apri WhatsApp",
    contactFollowUs: "Seguiteci anche qui",
    footerMadeBy: "Sito Ohana B&B",
    footerPrivacy: "Privacy",
    footerCookie: "Cookie",
    footerCondizioni: "Condizioni",
    policyNote: "Cancellazione gratuita entro 24 ore. Condizioni complete in",
    policyLink: "Condizioni di soggiorno",
    reviewsTitle: "Cosa dicono gli ospiti",
    reviewsSubtitle: "Le esperienze di chi ha soggiornato da noi.",
    reviewFormName: "Il tuo nome",
    reviewFormMessage: "La tua recensione",
    reviewFormRating: "Valutazione",
    reviewFormSubmit: "Invia recensione",
    reviewThanks: "Grazie di cuore per aver condiviso la tua esperienza! Ci fa davvero piacere.",
    },
  en: {
    heroEyebrow: "Bed & Breakfast",
    heroTitle: "Ohana, your elegant hideaway in the heart of the city.",
    heroSubtitle:
      "Thoughtfully designed rooms, slow breakfast and the warmth of a family home. A boutique B&B that celebrates tranquillity, light and the art of small attentions.",
    ctaPrimary: "Book your stay",
    ctaSecondary: "Discover the rooms",
    roomsTitle: "Our rooms",
    roomsSubtitle: "Three different moods, the same attention to detail.",
    roomSunName: "Sun",
    roomSunDesc:
      "Warm, bright and golden, with a sun-kissed feeling all day long.",
    roomMoonName: "Moon",
    roomMoonDesc:
      "Quiet and cocooning, designed for those who love to slow down.",
    roomEarthName: "Earth",
    roomEarthDesc:
      "Spacious and natural, ideal for longer stays and families.",
    fromNight: "from",
    perNight: "/night",
    inclBreakfast: "Coupon bar included",
    servicesTitle: "Included services",
    servicesSubtitle: "Small details that make your stay special.",
    contactsTitle: "How to reach us & contacts",
    contactsSubtitle:
      "We stay in touch before, during and after your stay. Write us anytime.",
    contactAddressLabel: "Address",
    contactAddressValue: "Via Lavinaio 19, 80142, Napoli, Campania, Italy",
    contactPhoneLabel: "Phone",
    contactEmailLabel: "Email",
    contactWhatsappLabel: "Whatsapp",
    contactPhoneValue: CONTACT_PHONE,
    contactEmailValue: CONTACT_EMAIL,
    contactWhatsappValue: CONTACT_PHONE,
    contactActionCall: "Call now",
    contactActionMail: "Send an email",
    contactActionWhatsapp: "Open WhatsApp",
    contactFollowUs: "Follow us here",
    footerMadeBy: "Ohana B&B website",
    footerPrivacy: "Privacy",
    footerCookie: "Cookies",
    footerCondizioni: "Terms",
    policyNote: "Free cancellation up to 24 hours. Full policy in",
    policyLink: "Terms of stay",
    reviewsTitle: "What our guests say",
    reviewsSubtitle: "Experiences from those who stayed with us.",
    reviewFormName: "Your name",
    reviewFormMessage: "Your review",
    reviewFormRating: "Rating",
    reviewFormSubmit: "Submit review",
    reviewThanks: "Thank you so much for sharing your experience! We really appreciate it.",
    },
} as const;

type ReviewItem = { id: string; name: string; text: string; rating: number; date: string };

export default function Home() {
  const [lang, setLang] = useState<Lang>("it");
  const t = copy[lang];
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewSending, setReviewSending] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]));
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(null);
    if (!reviewName.trim() || !reviewText.trim()) {
      setReviewError(lang === "it" ? "Nome e messaggio sono obbligatori." : "Name and message are required.");
      return;
    }
    setReviewSending(true);
    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: reviewName.trim(),
        text: reviewText.trim(),
        rating: reviewRating,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((d) => { throw new Error(d.error || "Error"); });
        return res.json();
      })
      .then(() => {
        setReviewSent(true);
        setReviewName("");
        setReviewText("");
        setReviewRating(5);
      })
      .catch((err) => setReviewError(err.message || (lang === "it" ? "Errore nell'invio." : "Error sending.")))
      .finally(() => setReviewSending(false));
  };

  return (
    <div className="page-shell">
      <div className="page-inner">
        <header className="topbar">
          <Link href="/" className="brand">
            <img
              src="/ohana-logo.png"
              alt="Ohana Bed & Breakfast"
              width={180}
              height={56}
              className="brand-logo"
            />
            <span className="brand-sub" style={{ marginLeft: 4 }}>
              {lang === "it" ? "Camere, luce, colori" : "Rooms, light, colours"}
            </span>
          </Link>

          <div className="topbar-right">
            <nav className="nav-links">
              <Link href="/galleria">{lang === "it" ? "Camere" : "Rooms"}</Link>
              <a href="#recensioni">
                {lang === "it" ? "Recensioni" : "Reviews"}
              </a>
              <a href="#servizi">
                {lang === "it" ? "Servizi" : "Services"}
              </a>
              <Link href="/condizioni">
                {lang === "it" ? "Condizioni" : "Terms"}
              </Link>
              <a href="#contatti">
                {lang === "it" ? "Come arrivare" : "How to reach us"}
              </a>
            </nav>
            <div className="lang-switch" aria-label="Seleziona lingua">
              <button
                type="button"
                className={`lang-pill ${
                  lang === "it" ? "lang-pill--active" : ""
                }`}
                onClick={() => setLang("it")}
              >
                IT
              </button>
              <button
                type="button"
                className={`lang-pill ${
                  lang === "en" ? "lang-pill--active" : ""
                }`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
            </div>
          </div>
        </header>

        <main>
          <section className="hero-grid" aria-labelledby="hero-title">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>{t.heroEyebrow}</span>
              </div>
              <h1 id="hero-title" className="hero-title">
                {t.heroTitle}
              </h1>
              <p className="hero-subtitle">{t.heroSubtitle}</p>

              <div className="hero-badges">
                <span className="hero-badge">
                  {lang === "it"
                    ? "Solo 3 camere, atmosfera intima"
                    : "Only 3 rooms, intimate atmosphere"}
                </span>
                <span className="hero-badge">
                  {lang === "it"
                    ? "Il cuore di Napoli, il calore di casa"
                    : "The heart of Naples, the warmth of home"}
                </span>
                <span className="hero-badge">
                  {lang === "it"
                    ? "A soli 5 minuti dalla Stazione Centrale: muoversi in città sarà semplice e veloce."
                    : "Just 5 minutes from Central Station: getting around the city will be easy and quick."}
                </span>
              </div>

              <div className="hero-cta-row">
                <Link href="/prenota/sun">
                  <button className="btn-primary" type="button">
                    {t.ctaPrimary}
                    <span aria-hidden>→</span>
                  </button>
                </Link>
                <Link href="/galleria">
                  <button className="btn-primary" type="button">
                    {t.ctaSecondary}
                    <span aria-hidden>→</span>
                  </button>
                </Link>
              </div>
            </div>

            <aside className="hero-card" aria-label="Dettagli struttura">
              <div className="hero-card-top">
                <div>
                  <div className="hero-card-title">
                    {lang === "it" ? "Ohana Boutique B&B" : "Ohana Boutique B&B"}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>
                    {lang === "it"
                      ? "3 camere, massimo 6 ospiti."
                      : "3 rooms, up to 6 guests."}
                  </div>
                </div>
              </div>

              <div className="hero-card-grid">
                <div className="hero-card-pill">
                  <span className="hero-card-pill-label">
                    {lang === "it" ? "Camere" : "Rooms"}
                  </span>
                  <span className="hero-card-pill-main">
                    {lang === "it"
                      ? "Sun · Moon · Earth"
                      : "Sun · Moon · Earth"}
                  </span>
                </div>
                <div className="hero-card-pill">
                  <span className="hero-card-pill-label">
                    {lang === "it" ? "Colazione" : "Breakfast"}
                  </span>
                  <span className="hero-card-pill-main">
                    {lang === "it"
                      ? "Coupon da spendere al bar"
                      : "Coupon to spend at the bar"}
                  </span>
                </div>
                <div className="hero-card-pill">
                  <span className="hero-card-pill-label">
                    {lang === "it" ? "Distanza" : "Distance"}
                  </span>
                  <span className="hero-card-pill-main">
                    {lang === "it"
                      ? "5 minuti a piedi dalla Stazione Centrale"
                      : "5 minutes walk from Central Station"}
                  </span>
                </div>
                <div className="hero-card-pill">
                  <span className="hero-card-pill-label">
                    {lang === "it" ? "Stile" : "Style"}
                  </span>
                  <span className="hero-card-pill-main">
                    {lang === "it"
                      ? "Colorato, luce naturale, dettagliato"
                      : "Colourful, natural light, detailed"}
                  </span>
                </div>
              </div>

              <div className="hero-card-footer">
                <div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>
                    {lang === "it" ? "Stanze a partire da" : "Rooms from"}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>
                    €80{" "}
                    <span style={{ fontSize: 11, fontWeight: 400 }}>
                      {lang === "it" ? "/notte" : "/night"}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>
                    {lang === "it"
                      ? "Prenotazione sicura"
                      : "Secure booking"}
                  </div>
                  <div style={{ fontSize: 11 }}>
                    {lang === "it"
                      ? "Pagamento online con carta o wallet"
                      : "Online payment by card or wallet"}
                  </div>
                </div>
              </div>
            </aside>
          </section>

          <section id="camere" className="section" aria-labelledby="rooms-title">
            <div className="section-header">
              <div>
                <h2 className="section-title">{t.roomsTitle}</h2>
                <p className="section-subtitle">{t.roomsSubtitle}</p>
              </div>
              <span className="badge-soft">
                {lang === "it"
                  ? "Check-in 14:00 · Check-out 10:00"
                  : "Check-in 2pm · Check-out 10am"}
              </span>
            </div>

            <div className="rooms-grid">
              <article className="room-card">
                <div className="room-photo room-photo--sun" />
                <div className="room-body">
                  <h3 className="room-name">{t.roomSunName}</h3>
                  <p className="room-meta">{t.roomSunDesc}</p>
                  <div className="room-bottom-row">
                    <span className="pill-soft">
                      2 {lang === "it" ? "ospiti" : "guests"} · 20 m² ·{" "}
                      {lang === "it" ? "bagno privato" : "private bathroom"}
                    </span>
                    <div>
                      <span className="price">
                        {t.fromNight} €80{" "}
                        <span style={{ fontWeight: 400 }}>{t.perNight}</span>
                      </span>
                      <div style={{ fontSize: 11 }}>{t.inclBreakfast}</div>
                    </div>
                  </div>
                  <Link href="/prenota/sun">
                    <button
                      className="btn-ghost"
                      style={{ marginTop: 8, width: "100%" }}
                      type="button"
                    >
                      {lang === "it"
                        ? "Prenota Sun"
                        : "Book Sun room"}
                    </button>
                  </Link>
                </div>
              </article>

              <article className="room-card">
                <div className="room-photo room-photo--moon" />
                <div className="room-body">
                  <h3 className="room-name">{t.roomMoonName}</h3>
                  <p className="room-meta">{t.roomMoonDesc}</p>
                  <div className="room-bottom-row">
                    <span className="pill-soft">
                      2 {lang === "it" ? "ospiti" : "guests"} · 20 m² ·{" "}
                      {lang === "it" ? "bagno privato" : "private bathroom"}
                    </span>
                    <div>
                      <span className="price">
                        {t.fromNight} €80{" "}
                        <span style={{ fontWeight: 400 }}>{t.perNight}</span>
                      </span>
                      <div style={{ fontSize: 11 }}>{t.inclBreakfast}</div>
                    </div>
                  </div>
                  <Link href="/prenota/moon">
                    <button
                      className="btn-ghost"
                      style={{ marginTop: 8, width: "100%" }}
                      type="button"
                    >
                      {lang === "it"
                        ? "Prenota Moon"
                        : "Book Moon room"}
                    </button>
                  </Link>
                </div>
              </article>

              <article className="room-card">
                <div className="room-photo room-photo--earth" />
                <div className="room-body">
                  <h3 className="room-name">{t.roomEarthName}</h3>
                  <p className="room-meta">{t.roomEarthDesc}</p>
                  <div className="room-bottom-row">
                    <span className="pill-soft">
                      2 {lang === "it" ? "ospiti" : "guests"} · 20 m² ·{" "}
                      {lang === "it" ? "bagno privato" : "private bathroom"}
                    </span>
                    <div>
                      <span className="price">
                        {t.fromNight} €80{" "}
                        <span style={{ fontWeight: 400 }}>{t.perNight}</span>
                      </span>
                      <div style={{ fontSize: 11 }}>{t.inclBreakfast}</div>
                    </div>
                  </div>
                  <Link href="/prenota/earth">
                    <button
                      className="btn-ghost"
                      style={{ marginTop: 8, width: "100%" }}
                      type="button"
                    >
                      {lang === "it"
                        ? "Prenota Earth"
                        : "Book Earth room"}
                    </button>
                  </Link>
                </div>
              </article>
            </div>
          </section>

          <section
            id="servizi"
            className="section"
            aria-labelledby="services-title"
          >
            <div className="section-header">
              <div>
                <h2 className="section-title" id="services-title">
                  {t.servicesTitle}
                </h2>
                <p className="section-subtitle">{t.servicesSubtitle}</p>
              </div>
            </div>

            <div className="section-columns">
              <ul className="list-soft">
                <li>
                  {lang === "it"
                    ? "Coupon colazione da spendere al bar"
                    : "Breakfast coupon to spend at the bar"}
                </li>
                <li>
                  {lang === "it"
                    ? "Wi-Fi veloce in tutte le camere"
                    : "Fast Wi‑Fi in every room"}
                </li>
                <li>
                  {lang === "it"
                    ? "La biancheria e gli asciugamani vengono forniti puliti all'arrivo e sono inclusi per tutta la durata del soggiorno."
                    : "Linen and towels are provided clean on arrival and included for the whole stay."}
                </li>
                <li>
                  {lang === "it"
                    ? "Pulizia quotidiana disponibile su richiesta, con supplemento."
                    : "Daily cleaning available on request, with extra charge."}
                </li>
                <li>
                  {lang === "it"
                    ? "Letto king size con materassi e cuscini di qualità"
                    : "King size bed with quality mattress and pillows"}
                </li>
                <li>
                  {lang === "it"
                    ? "Check-in anticipato o check-out posticipato di 30 minuti disponibili su richiesta, con eventuale supplemento."
                    : "Early check-in or late check-out (30 min) available on request, with possible extra charge."}
                </li>
                <li>
                  {lang === "it"
                    ? "Aria condizionata e televisore in tutte le camere"
                    : "Air conditioning and TV in all rooms"}
                </li>
                <li className="list-soft-pet">
                  {lang === "it" ? (
                    <>
                      Accettiamo i cani con piacere. Per condizioni e supplemento vedi{" "}
                      <Link href="/condizioni#animali">Condizioni di soggiorno</Link>.
                    </>
                  ) : (
                    <>
                      We welcome dogs. For conditions and supplement see{" "}
                      <Link href="/condizioni#animali">Terms of stay</Link>.
                    </>
                  )}
                </li>
              </ul>
            </div>
          </section>

          <section
            id="recensioni"
            className="section"
            aria-labelledby="reviews-title"
          >
            <div className="section-header">
              <div>
                <h2 className="section-title" id="reviews-title">
                  {t.reviewsTitle}
                </h2>
                <p className="section-subtitle">{t.reviewsSubtitle}</p>
              </div>
            </div>
            <div className="reviews-layout">
              <div className="reviews-list">
                {reviews.length === 0 ? (
                  <p className="reviews-empty">
                    {lang === "it"
                      ? "Ancora nessuna recensione. Sii il primo a lasciare un messaggio!"
                      : "No reviews yet. Be the first to leave a message!"}
                  </p>
                ) : (
                  reviews.map((r) => (
                    <article key={r.id} className="review-card">
                      <div className="review-stars" aria-hidden>
                        {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                      </div>
                      <p className="review-text">{r.text}</p>
                      <footer className="review-meta">
                        <span className="review-name">{r.name}</span>
                        <span className="review-date">
                          {new Date(r.date).toLocaleDateString(
                            lang === "it" ? "it-IT" : "en-GB",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </span>
                      </footer>
                    </article>
                  ))
                )}
              </div>
              <div className="reviews-form-wrap">
                <h3 className="reviews-form-title">
                  {lang === "it" ? "Lascia una recensione" : "Leave a review"}
                </h3>
                {reviewSent ? (
                  <p className="review-success">{t.reviewThanks}</p>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="reviews-form">
                    <label className="field-label" htmlFor="review-name">
                      {t.reviewFormName}
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      className="field-input"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      maxLength={100}
                      required
                    />
                    <label className="field-label" htmlFor="review-rating">
                      {t.reviewFormRating}
                    </label>
                    <select
                      id="review-rating"
                      className="field-input"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} ★
                        </option>
                      ))}
                    </select>
                    <label className="field-label" htmlFor="review-text">
                      {t.reviewFormMessage}
                    </label>
                    <textarea
                      id="review-text"
                      className="field-input"
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      maxLength={2000}
                      required
                    />
                    {reviewError && (
                      <p className="review-error" role="alert">
                        {reviewError}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={reviewSending}
                    >
                      {reviewSending
                        ? (lang === "it" ? "Invio..." : "Sending...")
                        : t.reviewFormSubmit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

          <section
            id="contatti"
            className="section"
            aria-labelledby="contacts-title"
          >
            <div className="section-header">
              <div>
                <h2 className="section-title" id="contacts-title">
                  {t.contactsTitle}
                </h2>
                <p className="section-subtitle">{t.contactsSubtitle}</p>
              </div>
            </div>

            <div className="section-columns">
              <div className="contact-card">
                <div className="contact-row">
                  <div>
                    <div className="contact-label">{t.contactAddressLabel}</div>
                    <div className="contact-value">
                      {t.contactAddressValue}
                    </div>
                  </div>
                </div>

                <div className="contact-row">
                  <div>
                    <div className="contact-label">{t.contactPhoneLabel}</div>
                    <div className="contact-value">
                      <a href="tel:+393762979866">{t.contactPhoneValue}</a>
                    </div>
                  </div>
                </div>

                <div className="contact-row">
                  <div>
                    <div className="contact-label">{t.contactEmailLabel}</div>
                    <div className="contact-value">
                      <a href={`mailto:${CONTACT_EMAIL}`}>
                        {t.contactEmailValue}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-row">
                  <div>
                    <div className="contact-label">
                      {t.contactWhatsappLabel}
                    </div>
                    <div className="contact-value">
                      <a href="https://wa.me/393762979866" target="_blank">
                        {t.contactWhatsappValue}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-actions">
                  <a href="tel:+393762979866" className="chip">
                    {t.contactActionCall}
                  </a>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="chip">
                    {t.contactActionMail}
                  </a>
                  <a
                    href="https://wa.me/393762979866"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip"
                  >
                    {t.contactActionWhatsapp}
                  </a>
                </div>

                <div className="contact-social">
                  <div className="contact-label">{t.contactFollowUs}</div>
                  <div className="contact-actions">
                    <a
                      href="https://www.instagram.com/ohana.bnb?igsh=NXBrc3Ztc2FqYWJ3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.tiktok.com/@ohana.bnb?_r=1&_t=ZN-93qJDMhxFGY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </div>

              <div className="map-shell" aria-label="Mappa indicativa">
                <iframe
                  title={
                    lang === "it"
                      ? "Mappa posizione Ohana B&B"
                      : "Ohana B&B location map"
                  }
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.123!2d14.2622!3d40.8519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b0866e1c3e8a5%3A0x9e8a7c8b8b8b8b8b!2sVia%20Lavinaio%2C%2019%2C%2080142%20Napoli%20NA!5e0!3m2!1sit!2sit!4v1700000000000"
                />
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-top">
            <span>{t.footerMadeBy}</span>
            <div className="footer-links">
              <Link href="/privacy">{t.footerPrivacy}</Link>
              <Link href="/condizioni">{t.footerCondizioni}</Link>
              <Link href="/cookie">{t.footerCookie}</Link>
            </div>
          </div>
          <p className="footer-policy">
            {t.policyNote}{" "}
            <Link href="/condizioni">{t.policyLink}</Link>.
          </p>
        </footer>
      </div>
    </div>
  );
}
