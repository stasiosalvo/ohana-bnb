"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Lang = "it" | "en" | "fr" | "es";

const content = {
  it: {
    title: "Chi siamo",
    subtitle: "Una storia di famiglia, passione e ospitalità vera.",
    back: "Torna alla home",
    paragraphs: [
      "Ohana nasce da una storia semplice, ma piena di passione: quella di una famiglia che da sempre vive e respira ospitalità.",
      "Da anni lavoriamo nel mondo della ristorazione, gestendo una pizzeria a San Sebastiano al Vesuvio e, in passato, altre attività che ci hanno insegnato cosa significa davvero accogliere le persone: farle sentire a casa, anche quando sono lontane.",
      "Per noi l’ospitalità non è solo un lavoro, è un modo di essere. È attenzione ai dettagli, è un sorriso sincero, è la cura per ogni piccolo gesto che può rendere speciale il soggiorno di chi ci sceglie.",
      "Ohana non è un nome scelto a caso. Significa famiglia. E questo è esattamente ciò che vogliamo trasmettere: un luogo dove sentirsi accolti, rispettati e coccolati.",
      "Le nostre tre camere – Sun, Moon ed Earth – non rappresentano solo elementi naturali, ma portano con sé qualcosa di ancora più personale: le iniziali dei tre figli della proprietaria. Un modo per rendere questo spazio ancora più intimo, autentico e legato alla nostra storia.",
      "Abbiamo immaginato questo B&B come un rifugio elegante ma familiare, dove ogni ospite possa trovare tranquillità, comfort e un’accoglienza vera, fatta con il cuore.",
      "Perché per noi, chi arriva non è solo un cliente. È un ospite. E, anche solo per qualche giorno, diventa parte della nostra Ohana.",
    ],
  },
  en: {
    title: "About us",
    subtitle: "A family story, passion, and heartfelt hospitality.",
    back: "Back to home",
    paragraphs: [
      "Ohana was born from a simple story filled with passion: a family that has always lived and breathed hospitality.",
      "For years we’ve worked in the world of food and hospitality, running a pizzeria in San Sebastiano al Vesuvio and, in the past, other activities that taught us what it truly means to welcome people: making them feel at home, even when they’re far away.",
      "For us, hospitality isn’t just a job—it’s a way of being. It’s attention to detail, a genuine smile, and care for every small gesture that can make a stay special.",
      "Ohana isn’t a random name. It means family. And that’s exactly what we want to share: a place where you feel welcomed, respected, and pampered.",
      "Our three rooms—Sun, Moon, and Earth—don’t only represent natural elements: they also carry something personal, the initials of the owner’s three children. A way to make this space even more intimate and authentic.",
      "We imagined this B&B as an elegant yet familiar refuge, where every guest can find tranquility, comfort, and a warm welcome made with heart.",
      "Because for us, whoever arrives isn’t just a customer. They’re a guest—and, even for a few days, part of our Ohana.",
    ],
  },
  fr: {
    title: "Qui sommes‑nous",
    subtitle: "Une histoire de famille, de passion et d’accueil sincère.",
    back: "Retour à l’accueil",
    paragraphs: [
      "Ohana nasce da una storia semplice, ma piena di passione: quella di una famiglia che da sempre vive e respira ospitalità.",
      "Da anni lavoriamo nel mondo della ristorazione, gestendo una pizzeria a San Sebastiano al Vesuvio e, in passato, altre attività che ci hanno insegnato cosa significa davvero accogliere le persone: farle sentire a casa, anche quando sono lontane.",
      "Per noi l’ospitalità non è solo un lavoro, è un modo di essere. È attenzione ai dettagli, è un sorriso sincero, è la cura per ogni piccolo gesto che può rendere speciale il soggiorno di chi ci sceglie.",
      "Ohana non è un nome scelto a caso. Significa famiglia. E questo è esattamente ciò che vogliamo trasmettere: un luogo dove sentirsi accolti, rispettati e coccolati.",
      "Le nostre tre camere – Sun, Moon ed Earth – non rappresentano solo elementi naturali, ma portano con sé qualcosa di ancora più personale: le iniziali dei tre figli della proprietaria. Un modo per rendere questo spazio ancora più intimo, autentico e legato alla nostra storia.",
      "Abbiamo immaginato questo B&B come un rifugio elegante ma familiare, dove ogni ospite possa trovare tranquillità, comfort e un’accoglienza vera, fatta con il cuore.",
      "Perché per noi, chi arriva non è solo un cliente. È un ospite. E, anche solo per qualche giorno, diventa parte della nostra Ohana.",
    ],
  },
  es: {
    title: "Quiénes somos",
    subtitle: "Una historia de familia, pasión y hospitalidad de verdad.",
    back: "Volver a inicio",
    paragraphs: [
      "Ohana nasce da una storia semplice, ma piena di passione: quella di una famiglia che da sempre vive e respira ospitalità.",
      "Da anni lavoriamo nel mondo della ristorazione, gestendo una pizzeria a San Sebastiano al Vesuvio e, in passato, altre attività che ci hanno insegnato cosa significa davvero accogliere le persone: farle sentire a casa, anche quando sono lontane.",
      "Per noi l’ospitalità non è solo un lavoro, è un modo di essere. È attenzione ai dettagli, è un sorriso sincero, è la cura per ogni piccolo gesto che può rendere speciale il soggiorno di chi ci sceglie.",
      "Ohana non è un nome scelto a caso. Significa famiglia. E questo è esattamente ciò che vogliamo trasmettere: un luogo dove sentirsi accolti, rispettati e coccolati.",
      "Le nostre tre camere – Sun, Moon ed Earth – non rappresentano solo elementi naturali, ma portano con sé qualcosa di ancora più personale: le iniziali dei tre figli della proprietaria. Un modo per rendere questo spazio ancora più intimo, autentico e legato alla nostra storia.",
      "Abbiamo immaginato questo B&B come un rifugio elegante ma familiare, dove ogni ospite possa trovare tranquillità, comfort e un’accoglienza vera, fatta con il cuore.",
      "Perché per noi, chi arriva non è solo un cliente. È un ospite. E, anche solo per qualche giorno, diventa parte della nostra Ohana.",
    ],
  },
} satisfies Record<Lang, { title: string; subtitle: string; back: string; paragraphs: string[] }>;

export default function ChiSiamoPage() {
  const [lang, setLang] = useState<Lang>("it");
  const t = content[lang];

  return (
    <div className="page-shell">
      <div className="page-inner">
        <header className="topbar">
          <Link href="/" className="brand">
            <Image
              src="/ohana-logo.png"
              alt="Ohana B&B"
              width={180}
              height={56}
              className="brand-logo"
              unoptimized
            />
          </Link>

          <div className="topbar-right">
            <div className="lang-switch" aria-label={lang === "it" ? "Seleziona lingua" : "Select language"}>
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
          </div>
        </header>

        <main className="legal-main">
          <Link href="/" className="legal-back">
            ← {t.back}
          </Link>

          <h1 className="legal-title">{t.title}</h1>
          <p className="legal-intro">{t.subtitle}</p>

          <div className="about-card">
            <div className="about-body" aria-label={t.title}>
              {t.paragraphs.map((p, idx) => (
                <p key={`${p.slice(0, 18)}-${idx}`}>{p}</p>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

