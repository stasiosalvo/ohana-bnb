"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

type Lang = "it" | "en" | "fr" | "es";

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
        body: `Per domande su cookie e privacy puoi scriverci a ${CONTACT_EMAIL} o contattarci al ${CONTACT_PHONE}.`,
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
        body: `For questions about cookies and privacy you can email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`,
      },
    ],
  },
  fr: {
    title: "Politique relative aux cookies",
    intro:
      "Cette page explique comment Ohana B&B utilise les cookies et des technologies similaires sur ce site, conformément au droit italien et au Règlement (UE) 2016/679 (RGPD).",
    back: "Retour à l’accueil",
    sections: [
      {
        title: "Que sont les cookies",
        body: "Les cookies sont de petits fichiers texte qu’un site peut enregistrer sur votre appareil (ordinateur, tablette, smartphone) pour mémoriser des préférences, vous reconnaître ou améliorer la navigation. Ils peuvent être « internes » (définis par nous) ou « tiers » (définis par des services externes).",
      },
      {
        title: "Cookies utilisés sur ce site",
        body: "Nous utilisons des cookies strictement nécessaires au fonctionnement du site (p. ex. sécurité, équilibrage de charge) et des cookies qui mémorisent votre langue (IT/EN/FR/ES). Pour les paiements en ligne, nous utilisons Stripe, qui peut déposer ses propres cookies afin de gérer le paiement en toute sécurité ; nous ne stockons pas les données de carte. Nous n’utilisons pas de cookies de profilage publicitaire.",
      },
      {
        title: "Base légale et durée de conservation",
        body: "Les cookies nécessaires reposent sur l’intérêt légitime lié au bon fonctionnement du site ; les cookies de préférence (langue) reposent sur votre choix. Les cookies de session sont supprimés à la fermeture du navigateur ; les cookies de préférence peuvent rester pendant une durée limitée (p. ex. 12 mois) jusqu’à suppression.",
      },
      {
        title: "Gérer les cookies",
        body: "Vous pouvez désactiver ou supprimer les cookies depuis les paramètres de votre navigateur. Les instructions se trouvent généralement dans la rubrique « Aide » ou « Paramètres » (Chrome, Firefox, Safari, Edge, etc.). La désactivation des cookies nécessaires peut limiter certaines fonctionnalités (p. ex. réservation ou paiement).",
      },
      {
        title: "Contact",
        body: `Pour toute question sur les cookies et la confidentialité, écrivez‑nous à ${CONTACT_EMAIL} ou appelez le ${CONTACT_PHONE}.`,
      },
    ],
  },
  es: {
    title: "Política de cookies",
    intro:
      "Esta página explica cómo Ohana B&B utiliza cookies y tecnologías similares en este sitio web, de acuerdo con la normativa italiana y el Reglamento (UE) 2016/679 (RGPD).",
    back: "Volver a inicio",
    sections: [
      {
        title: "Qué son las cookies",
        body: "Las cookies son pequeños archivos de texto que un sitio puede guardar en tu dispositivo (ordenador, tablet, smartphone) para recordar preferencias, reconocerte o mejorar la navegación. Pueden ser de «primera parte» (gestionadas por nosotros) o de «terceros» (gestionadas por servicios externos).",
      },
      {
        title: "Cookies utilizadas en este sitio",
        body: "Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio (p. ej., seguridad, balanceo de carga) y cookies que recuerdan tu idioma (IT/EN/FR/ES). Para pagos online usamos Stripe, que puede establecer sus propias cookies para gestionar el checkout de forma segura; no almacenamos datos de tarjeta. No usamos cookies de publicidad/perfilado.",
      },
      {
        title: "Base legal y conservación",
        body: "Las cookies necesarias se basan en el interés legítimo para el correcto funcionamiento del sitio; las cookies de preferencia (idioma) dependen de tu elección. Las cookies de sesión se eliminan al cerrar el navegador; las de preferencia pueden permanecer por un tiempo limitado (p. ej., 12 meses) hasta que las elimines.",
      },
      {
        title: "Cómo gestionar cookies",
        body: "Puedes desactivar o eliminar cookies desde la configuración de tu navegador. Las instrucciones suelen estar en «Ayuda» o «Configuración» (Chrome, Firefox, Safari, Edge, etc.). Ten en cuenta que desactivar cookies necesarias puede limitar algunas funciones (p. ej., reserva o pago).",
      },
      {
        title: "Contacto",
        body: `Si tienes preguntas sobre cookies y privacidad, escríbenos a ${CONTACT_EMAIL} o llámanos al ${CONTACT_PHONE}.`,
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
