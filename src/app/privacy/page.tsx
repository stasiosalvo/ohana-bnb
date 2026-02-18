"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Lang = "it" | "en";

const content = {
  it: {
    title: "Informativa sulla privacy",
    intro:
      "Ohana B&B rispetta la tua riservatezza. Di seguito le informazioni sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR) e del D.Lgs. 196/2003.",
    back: "Torna alla home",
    sections: [
      {
        title: "Titolare del trattamento",
        body: "Il titolare del trattamento è Ohana B&B, con sede in Via Lavinaio 19, 80142 Napoli (NA). Puoi contattarci all'indirizzo info@ohana-bnb.it o al numero +39 376 297 9866.",
      },
      {
        title: "Dati raccolti",
        body: "Raccogliamo i dati necessari alla prenotazione e al soggiorno: nome e cognome, indirizzo email, numero di telefono, date di arrivo e partenza, numero di ospiti. I dati di pagamento sono gestiti in modo sicuro da Stripe e non vengono conservati sui nostri server. In conformità con le norme sull'ospitalità, possiamo raccogliere i dati anagrafici per la compilazione del registro degli ospiti.",
      },
      {
        title: "Finalità e base giuridica",
        body: "I dati sono trattati per: gestire le prenotazioni e il rapporto contrattuale; adempiere agli obblighi di legge (fiscali, registro ospiti, pubblica sicurezza); inviare comunicazioni relative al soggiorno. La base giuridica è l'esecuzione del contratto, l'adempimento di obblighi di legge e, ove applicabile, il legittimo interesse.",
      },
      {
        title: "Conservazione",
        body: "I dati sono conservati per il tempo necessario alla gestione del rapporto e agli obblighi di legge (inclusi gli obblighi fiscali e di conservazione della documentazione, anche oltre 10 anni ove previsto).",
      },
      {
        title: "Diritti dell'interessato",
        body: "Hai diritto ad accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione, nonché a proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali (garanteprivacy.it). Per esercitare i tuoi diritti scrivi a info@ohana-bnb.it.",
      },
      {
        title: "Comunicazione e diffusione",
        body: "I dati possono essere comunicati a soggetti che forniscono servizi necessari (es. elaborazione pagamenti tramite Stripe, strumenti tecnici del sito). Non vendiamo né cediamo i tuoi dati a terzi per finalità di marketing.",
      },
    ],
  },
  en: {
    title: "Privacy policy",
    intro:
      "Ohana B&B respects your privacy. Below you will find information on the processing of personal data in accordance with Regulation (EU) 2016/679 (GDPR) and applicable Italian law.",
    back: "Back to home",
    sections: [
      {
        title: "Data controller",
        body: "The data controller is Ohana B&B, located at Via Lavinaio 19, 80142 Naples (NA), Italy. You can contact us at info@ohana-bnb.it or +39 376 297 9866.",
      },
      {
        title: "Data collected",
        body: "We collect data necessary for booking and stay: name, email address, phone number, check-in and check-out dates, number of guests. Payment data is processed securely by Stripe and is not stored on our servers. In compliance with hospitality regulations, we may collect identification data for the guest register.",
      },
      {
        title: "Purposes and legal basis",
        body: "Data is processed to: manage bookings and the contractual relationship; comply with legal obligations (tax, guest register, public security); send communications related to your stay. The legal basis is contract performance, legal obligations, and where applicable legitimate interest.",
      },
      {
        title: "Retention",
        body: "Data is retained for as long as necessary to manage the relationship and to comply with legal obligations (including tax and document retention requirements, which may extend beyond 10 years where required).",
      },
      {
        title: "Your rights",
        body: "You have the right to access, rectify, erase, restrict processing, data portability and to object, as well as to lodge a complaint with the supervisory authority (Garante per la Protezione dei Dati Personali – garanteprivacy.it). To exercise your rights, contact info@ohana-bnb.it.",
      },
      {
        title: "Disclosure",
        body: "Data may be shared with service providers necessary for our operations (e.g. payment processing via Stripe, website tools). We do not sell or share your data with third parties for marketing purposes.",
      },
    ],
  },
};

export default function PrivacyPage() {
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
