"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

type Lang = "it" | "en";

const CAROUSEL_PHOTOS = [
  "/galleria/sun-1.jpg",
  "/galleria/sun-2.jpg",
  "/galleria/sun-3.jpg",
  "/galleria/moon-1.jpg",
  "/galleria/moon-2.jpg",
  "/galleria/moon-3.jpg",
  "/galleria/moon-4.jpg",
  "/galleria/earth-1.jpg",
  "/galleria/earth-2.jpg",
  "/galleria/earth-3.jpg",
  "/galleria/earth-4.jpg",
];

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
    roomSunDesc: "Calda, luminosa, con dettagli dorati e vista soleggiata. Con balcone.",
    roomMoonName: "Moon",
    roomMoonDesc: "Silenziosa, morbida, pensata per chi ama rallentare. Con balcone.",
    roomEarthName: "Earth",
    roomEarthDesc:
      "Spaziosa e naturale, ideale per soggiorni lunghi e famiglie. Con finestra.",
    fromNight: "da",
    perNight: "/notte",
    inclBreakfast: "Coupon bar incluso",
    servicesTitle: "Servizi inclusi",
    servicesSubtitle: "Piccoli gesti che rendono il soggiorno speciale.",
    promoBannerLabel: "Offerta di benvenuto",
    promoBannerTitle: "I primi 10 che prenotano con il codice",
    promoBannerDiscount: "25% di sconto",
    promoBannerCta: "Prenota ora",
    whyTitle: "Perché scegliere Ohana B&B?",
    whySubtitle: "Quattro piccoli motivi per sentirti subito a casa.",
    whyItems: [
      { icon: "🚆", text: "Posizione strategica" },
      { icon: "🛏️", text: "Camere nuove e pulite" },
      { icon: "📶", text: "Wi-Fi veloce + comfort" },
      { icon: "🍳", text: "Colazione inclusa" },
    ],
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
    locationTransportation: "Trasporti",
    locationAirports: "Aeroporti",
    locationTrainStations: "Stazioni ferroviarie",
    locationAttractions: "Punti di interesse nelle vicinanze",
    locationCapodichino: "Capodichino",
    locationNapoliCentrale: "Napoli Centrale",
    locationMetro: "Metropolitana",
    locationMetroPiazzaGaribaldi: "Piazza Garibaldi, Napoli",
    locationPortaNolana: "Napoli Porta Nolana (Circumvesuviana)",
    locationGalleriaPrincipe: "Galleria Principe di Napoli",
    locationBasilicaPaolo: "Basilica di San Paolo Maggiore",
    locationCentroStorico: "Centro Storico",
    locationViaTribunali: "Via dei Tribunali",
    locationSanLorenzo: "Scavi San Lorenzo Maggiore",
    locationAquedotto: "Acquedotto Romano",
    locationSanGregorio: "Via San Gregorio Armeno",
    locationTesoroSanGennaro: "Museo del Tesoro di San Gennaro",
    locationMuseoDonnaregina: "Museo Diocesano Donnaregina",
    locationCappellaSansevero: "Museo Cappella Sansevero (Cristo Velato)",
    locationDuomo: "Duomo di Napoli - Cattedrale di San Gennaro",
    locationGalleriaUmberto: "Galleria Umberto I",
    locationPiazzaSanGaetano: "Piazza San Gaetano - Scavi greco-romani",
    locationAttractionsTitle: "Attrazioni e musei nelle vicinanze",
    locationRestaurantsTitle: "Pizzerie e ristoranti rinomati",
    locationDaMichele: "L'Antica Pizzeria Da Michele",
    locationSorbillo: "Pizzeria Sorbillo",
    locationDiMatteo: "Pizzeria Di Matteo",
    locationStarita: "Pizzeria Starita a Materdei",
    locationIlPresidente: "Il Figlio del Presidente",
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
      "Warm, bright and golden, with a sun-kissed feeling all day long. With balcony.",
    roomMoonName: "Moon",
    roomMoonDesc:
      "Quiet and cocooning, designed for those who love to slow down. With balcony.",
    roomEarthName: "Earth",
    roomEarthDesc:
      "Spacious and natural, ideal for longer stays and families. With window.",
    fromNight: "from",
    perNight: "/night",
    inclBreakfast: "Coupon bar included",
    servicesTitle: "Included services",
    servicesSubtitle: "Small details that make your stay special.",
    promoBannerLabel: "Welcome offer",
    promoBannerTitle: "The first 10 to book with code",
    promoBannerDiscount: "25% off",
    promoBannerCta: "Book now",
    whyTitle: "Why choose Ohana B&B?",
    whySubtitle: "Four small reasons you'll feel at home right away.",
    whyItems: [
      { icon: "🚆", text: "Strategic location" },
      { icon: "🛏️", text: "New and spotless rooms" },
      { icon: "📶", text: "Fast Wi-Fi + comfort" },
      { icon: "🍳", text: "Breakfast included" },
    ],
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
    locationTransportation: "Transportation",
    locationAirports: "Airports",
    locationTrainStations: "Train stations",
    locationAttractions: "Attractions nearby",
    locationCapodichino: "Capodichino",
    locationNapoliCentrale: "Naples central station",
    locationMetro: "Metro",
    locationMetroPiazzaGaribaldi: "Piazza Garibaldi, Naples",
    locationPortaNolana: "Napoli Porta Nolana (Circumvesuviana)",
    locationGalleriaPrincipe: "Galleria Principe di Napoli",
    locationBasilicaPaolo: "Basilica di San Paolo Maggiore",
    locationCentroStorico: "Historic Centre",
    locationViaTribunali: "Via dei Tribunali",
    locationSanLorenzo: "San Lorenzo Maggiore excavations",
    locationAquedotto: "Roman Aqueduct",
    locationSanGregorio: "Via San Gregorio Armeno",
    locationTesoroSanGennaro: "Museo del Tesoro di San Gennaro",
    locationMuseoDonnaregina: "Museo Diocesano Donnaregina",
    locationCappellaSansevero: "Museo Cappella Sansevero (Veiled Christ)",
    locationDuomo: "Naples Cathedral - Duomo di San Gennaro",
    locationGalleriaUmberto: "Galleria Umberto I",
    locationPiazzaSanGaetano: "Piazza San Gaetano - Greek-Roman excavations",
    locationAttractionsTitle: "Attractions & museums nearby",
    locationRestaurantsTitle: "Renowned pizzerias & restaurants",
    locationDaMichele: "L'Antica Pizzeria Da Michele",
    locationSorbillo: "Pizzeria Sorbillo",
    locationDiMatteo: "Pizzeria Di Matteo",
    locationStarita: "Pizzeria Starita a Materdei",
    locationIlPresidente: "Il Figlio del Presidente",
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const videoSunRef = useRef<HTMLVideoElement>(null);
  const videoMoonRef = useRef<HTMLVideoElement>(null);
  const videoEarthRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % CAROUSEL_PHOTOS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]));
  }, []);

  // Partenza sincronizzata e play/pause insieme; niente correzioni durante la riproduzione = movimento fluido (niente seek a scatti)
  useEffect(() => {
    const sun = videoSunRef.current;
    const moon = videoMoonRef.current;
    const earth = videoEarthRef.current;
    if (!sun || !moon || !earth) return;

    const onPlay = () => {
      moon.currentTime = sun.currentTime;
      earth.currentTime = sun.currentTime;
      moon.play().catch(() => {});
      earth.play().catch(() => {});
    };
    const onPause = () => {
      moon.pause();
      earth.pause();
    };

    sun.addEventListener("play", onPlay);
    sun.addEventListener("pause", onPause);

    sun.currentTime = 0;
    moon.currentTime = 0;
    earth.currentTime = 0;
    sun.play().catch(() => {});

    return () => {
      sun.removeEventListener("play", onPlay);
      sun.removeEventListener("pause", onPause);
    };
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
          <nav className="nav-links nav-links--left">
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

          <Link href="/" className="brand brand--centered">
            <img
              src="/ohana-logo.png"
              alt="Ohana Bed & Breakfast"
              width={260}
              height={84}
              className="brand-logo"
            />
          </Link>

          <div className="topbar-right">
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

        <section className="hero-carousel" aria-label="Foto delle camere">
          <div className="hero-carousel-inner">
            {CAROUSEL_PHOTOS.map((src, i) => (
              <div
                key={src}
                className={`hero-carousel-slide ${i === carouselIndex ? "hero-carousel-slide--active" : ""}`}
                aria-hidden={i !== carouselIndex}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          <div className="hero-carousel-dots" aria-hidden>
            {CAROUSEL_PHOTOS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hero-carousel-dot ${i === carouselIndex ? "hero-carousel-dot--active" : ""}`}
                aria-label={`Foto ${i + 1} di ${CAROUSEL_PHOTOS.length}`}
                onClick={() => setCarouselIndex(i)}
              />
            ))}
          </div>
        </section>

        <main>
          <section className="promo-banner" aria-labelledby="promo-banner-title">
            <div className="promo-banner-inner">
              <span className="promo-banner-label" id="promo-banner-title">
                {t.promoBannerLabel}
              </span>
              <p className="promo-banner-text">
                {t.promoBannerTitle}{" "}
                <strong className="promo-banner-code">WELCOME25</strong>
              </p>
              <p className="promo-banner-discount">{t.promoBannerDiscount}</p>
              <Link href="/prenota/sun" className="promo-banner-cta" role="button">
                <span>{t.promoBannerCta}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>

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
                    €70{" "}
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
                <div className="room-photo room-photo--sun">
                  <video
                    ref={videoSunRef}
                    src="/IMG_1869.MOV"
                    className="room-photo-video"
                    muted
                    loop
                    playsInline
                    autoPlay
                    aria-label="Camera Sun"
                  />
                </div>
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
                <div className="room-photo room-photo--moon">
                  <video
                    ref={videoMoonRef}
                    src="/IMG_1865.MOV"
                    className="room-photo-video"
                    muted
                    loop
                    playsInline
                    autoPlay
                    aria-label="Camera Moon"
                  />
                </div>
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
                <div className="room-photo room-photo--earth">
                  <video
                    ref={videoEarthRef}
                    src="/DB1BB8BA-621D-4D40-8EB8-F0BE9F012757%202.MOV"
                    className="room-photo-video"
                    muted
                    loop
                    playsInline
                    autoPlay
                    aria-label="Camera Earth"
                  />
                </div>
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
                        {t.fromNight} €70{" "}
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
            id="perche"
            className="section"
            aria-labelledby="why-title"
          >
            <div className="section-header">
              <div>
                <h2 className="section-title" id="why-title">
                  {t.whyTitle}
                </h2>
                <p className="section-subtitle">{t.whySubtitle}</p>
              </div>
            </div>

            <div className="why-card">
              <ul className="why-list" aria-label={t.whyTitle}>
                {t.whyItems.map((item, idx) => (
                  <li key={`${item.text}-${idx}`} className="why-item">
                    <span className="why-emoji" aria-hidden>
                      {item.icon}
                    </span>
                    <span className="why-text">{item.text}</span>
                  </li>
                ))}
              </ul>
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

            <div className="services-grid">
              <div className="service-card">
                <span className="service-icon" aria-hidden>☕</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Coupon colazione da spendere al bar"
                    : "Breakfast coupon to spend at the bar"}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>📶</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Wi-Fi veloce in tutte le camere"
                    : "Fast Wi‑Fi in every room"}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>🛏️</span>
                <span className="service-text">
                  {lang === "it"
                    ? "La biancheria e gli asciugamani vengono forniti puliti all'arrivo e sono inclusi per tutta la durata del soggiorno."
                    : "Linen and towels are provided clean on arrival and included for the whole stay."}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>🧹</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Pulizia quotidiana disponibile su richiesta, con supplemento."
                    : "Daily cleaning available on request, with extra charge."}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>🛋️</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Letto king size con materassi e cuscini di qualità"
                    : "King size bed with quality mattress and pillows"}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>🕐</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Check-in anticipato o check-out posticipato di 30 minuti disponibili su richiesta, con eventuale supplemento."
                    : "Early check-in or late check-out (30 min) available on request, with possible extra charge."}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>❄️</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Aria condizionata e televisore in tutte le camere"
                    : "Air conditioning and TV in all rooms"}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>☕</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Macchina del caffè in tutte le stanze"
                    : "Coffee machine in all rooms"}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>🧊</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Frigobar in tutte le camere"
                    : "Fridge/minibar in all rooms"}
                </span>
              </div>
              <div className="service-card">
                <span className="service-icon" aria-hidden>🍳</span>
                <span className="service-text">
                  {lang === "it"
                    ? "Nel B&B è disponibile una piccola cucina utilizzabile dagli ospiti"
                    : "A small kitchen is available in the B&B for guests to use"}
                </span>
              </div>
              <div className="service-card service-card--pet">
                <span className="service-icon" aria-hidden>🐕</span>
                <span className="service-text">
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
                </span>
              </div>
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
              <div className="reviews-list-scroll" aria-label={lang === "it" ? "Elenco recensioni" : "Reviews list"}>
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

            <div className="location-layout">
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
              <div className="location-sidebar">
                <div className="location-block">
                  <h3 className="location-block-title">{t.locationTransportation}</h3>
                  <ul className="location-list">
                    <li className="location-item location-item--transport">
                      <span className="location-icon" aria-hidden>✈️</span>
                      <div>
                        <span className="location-label">{t.locationAirports}</span>
                        <span className="location-detail">{t.locationCapodichino} — 4.4 km</span>
                      </div>
                    </li>
                    <li className="location-item location-item--transport">
                      <span className="location-icon" aria-hidden>🚂</span>
                      <div>
                        <span className="location-label">{t.locationTrainStations}</span>
                        <span className="location-detail">{t.locationNapoliCentrale} — 650 m</span>
                      </div>
                    </li>
                    <li className="location-item location-item--transport">
                      <span className="location-icon" aria-hidden>🚇</span>
                      <div>
                        <span className="location-label">{t.locationMetro}</span>
                        <span className="location-detail">{t.locationMetroPiazzaGaribaldi} — 600 m</span>
                      </div>
                    </li>
                    <li className="location-item location-item--transport">
                      <span className="location-icon" aria-hidden>🚂</span>
                      <div>
                        <span className="location-label">{t.locationTrainStations}</span>
                        <span className="location-detail">{t.locationPortaNolana} — 400 m</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="location-block">
                  <h3 className="location-block-title">{t.locationAttractionsTitle}</h3>
                  <ul className="location-attractions">
                    <li>{t.locationCappellaSansevero} — 450 m</li>
                    <li>{t.locationDuomo} — 300 m</li>
                    <li>{t.locationTesoroSanGennaro} — 200 m</li>
                    <li>{t.locationMuseoDonnaregina} — 300 m</li>
                    <li>{t.locationSanGregorio} — 400 m</li>
                    <li>{t.locationPiazzaSanGaetano} — 350 m</li>
                    <li>{t.locationSanLorenzo} — 400 m</li>
                    <li>{t.locationBasilicaPaolo} — 400 m</li>
                    <li>{t.locationViaTribunali} — 350 m</li>
                    <li>{t.locationGalleriaUmberto} — 2 km</li>
                    <li>{t.locationGalleriaPrincipe} — 1000 m</li>
                  </ul>
                </div>
                <div className="location-block">
                  <h3 className="location-block-title">{t.locationRestaurantsTitle}</h3>
                  <ul className="location-attractions">
                    <li>{t.locationDaMichele} — 350 m</li>
                    <li>{t.locationSorbillo} — 450 m</li>
                    <li>{t.locationDiMatteo} — 550 m</li>
                    <li>{t.locationIlPresidente} — 200 m</li>
                    <li>{t.locationStarita} — 1.2 km</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="contact-row-wrap">
              <div className="contact-card location-block">
                <h3 className="location-block-title">{lang === "it" ? "Contatti" : "Contact"}</h3>
                <ul className="contact-list">
                <li className="contact-row">
                  <span className="contact-label">{t.contactAddressLabel}</span>
                  <span className="contact-sep" aria-hidden> — </span>
                  <span className="contact-value">{t.contactAddressValue}</span>
                </li>
                <li className="contact-row">
                  <span className="contact-label">{t.contactPhoneLabel}</span>
                  <span className="contact-sep" aria-hidden> — </span>
                  <span className="contact-value">
                    <a href="tel:+393762979866">{t.contactPhoneValue}</a>
                  </span>
                </li>
                <li className="contact-row">
                  <span className="contact-label">{t.contactEmailLabel}</span>
                  <span className="contact-sep" aria-hidden> — </span>
                  <span className="contact-value">
                    <a href={`mailto:${CONTACT_EMAIL}`}>{t.contactEmailValue}</a>
                  </span>
                </li>
                <li className="contact-row">
                  <span className="contact-label">{t.contactWhatsappLabel}</span>
                  <span className="contact-sep" aria-hidden> — </span>
                  <span className="contact-value">
                    <a href="https://wa.me/393762979866" target="_blank" rel="noopener noreferrer">{t.contactWhatsappValue}</a>
                  </span>
                </li>
                </ul>

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
                  <h3 className="location-block-title">{t.contactFollowUs}</h3>
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
