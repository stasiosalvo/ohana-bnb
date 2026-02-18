"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Lang = "it" | "en";

const content = {
  it: {
    title: "Cookie policy",
    intro:
      "Questa pagina descrive come Ohana B&B utilizza i cookie e tecnologie simili sul sito, in conformità con la normativa italiana e il Regolamento (UE) 2016/679 (GDPR).",
    back: "Torna alla home",
    sections: [
      {
        title: "Cosa sono i cookie",
        body: "I cookie sono piccoli file di testo che i siti possono salvare sul tuo dispositivo (computer, tablet, smartphone) per memorizzare preferenze, riconoscere l'utente o migliorare la navigazione. Possono essere di \"prima parte\" (gestiti da noi) o di \"terze parti\" (gestiti da servizi esterni).",
      },
      {
        title: "Cookie utilizzati su questo sito",
        body: "Utilizziamo cookie strettamente necessari al funzionamento del sito (es. sicurezza, bilanciamento del carico) e cookie che ricordano la tua lingua di preferenza (IT/EN). Per i pagamenti online ci avvaliamo di Stripe, che può impostare cookie propri per gestire in modo sicuro il checkout; non conserviamo noi i dati della carta. Non utilizziamo cookie per pubblicità profilata o tracciamento a scopo pubblicitario.",
      },
      {
        title: "Base giuridica e conservazione",
        body: "I cookie necessari sono basati sul legittimo interesse al corretto funzionamento del sito; quelli di preferenza (lingua) su tuo consenso implicito (continuando a navigare). I cookie di sessione vengono eliminati alla chiusura del browser; quelli di preferenza possono restare per un periodo limitato (es. 12 mesi) fino a quando non li elimini.",
      },
      {
        title: "Come gestire i cookie",
        body: "Puoi disattivare o eliminare i cookie dalle impostazioni del tuo browser. Le istruzioni si trovano nella sezione \"Aiuto\" o \"Impostazioni\" del browser (Chrome, Firefox, Safari, Edge, ecc.). Tieni presente che disattivare i cookie necessari potrebbe limitare alcune funzionalità del sito (es. prenotazione o pagamento).",
      },
      {
        title: "Contatti",
        body: "Per domande su cookie e privacy puoi scriverci a info@ohana-bnb.it o contattarci al +39 376 297 9866.",
      },
    ],
  },
  en: {
    title: "Cookie policy",
    intro:
      "This page explains how Ohana B&B uses cookies and similar technologies on this website, in line with Italian law and Regulation (EU) 2016/679 (GDPR).",
    back: "Back to home",
    sections: [
      {
        title: "What are cookies",
        body: "Cookies are small text files that websites can store on your device (computer, tablet, smartphone) to save preferences, recognise you or improve browsing. They can be \"first-party\" (set by us) or \"third-party\" (set by external services).",
      },
      {
        title: "Cookies used on this site",
        body: "We use cookies that are strictly necessary for the site to work (e.g. security, load balancing) and cookies that remember your language preference (IT/EN). For online payments we use Stripe, which may set its own cookies to handle checkout securely; we do not store card data. We do not use cookies for advertising profiling or tracking for advertising purposes.",
      },
      {
        title: "Legal basis and retention",
        body: "Necessary cookies are based on legitimate interest in the proper functioning of the site; preference cookies (language) on your implied consent (by continuing to browse). Session cookies are removed when you close the browser; preference cookies may remain for a limited period (e.g. 12 months) until you delete them.",
      },
      {
        title: "How to manage cookies",
        body: "You can disable or delete cookies from your browser settings. Instructions are usually under \"Help\" or \"Settings\" (Chrome, Firefox, Safari, Edge, etc.). Note that disabling necessary cookies may limit some site features (e.g. booking or payment).",
      },
      {
        title: "Contact",
        body: "For questions about cookies and privacy you can email info@ohana-bnb.it or call +39 376 297 9866.",
      },
    ],
  },
};

export default function CookiePage() {
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
          </div>
        </header>

        <main className="legal-main">
          <Link href="/" className="legal-back">
            ← {t.back}
          </Link>
          <h1 className="legal-title">{t.title}</h1>
          <p className="legal-intro">{t.intro}</p>
          <div className="legal-sections">
            {t.sections.map((section, i) => (
              <section key={i} className="legal-block">
                <h2 className="legal-heading">{section.title}</h2>
                <p className="legal-body">{section.body}</p>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
