"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

type Lang = "it" | "en" | "fr" | "es";

const content = {
  it: {
    title: "Condizioni di soggiorno",
    intro:
      "Le seguenti condizioni si applicano alle prenotazioni dirette presso Ohana B&B. Per cancellazioni o modifiche contattaci via email o WhatsApp.",
    back: "Torna alla home",
    cancellationTitle: "Condizioni di cancellazione",
    cancellationFree:
      "Cancellazione gratuita fino a 24 ore prima dell'orario di check-in (14:00). Rimborso completo dell'importo già pagato.",
    cancellationLate:
      "Cancellazione tra 24 e 0 ore prima del check-in: tratteniamo l'importo della prima notte come indennità di cancellazione; il resto eventualmente pagato viene rimborsato.",
    cancellationNoShow:
      "Mancato arrivo (no-show) senza preavviso: addebito dell'intero importo della prima notte.",
    cancellationModify:
      "Modifiche di date o camera: su richiesta e in base a disponibilità; possibili costi di differenza tariffa.",
    stayTitle: "Regole del soggiorno",
    checkInOut: "Check-in dalle 14:00, check-out entro le 10:00. Orari flessibili su richiesta, quando possibile.",
    noSmoking: "È vietato fumare nelle camere e negli spazi comuni interni.",
    petsTitle: "Animali",
    petsBody: "Accettiamo i cani con piacere. È previsto un supplemento di 5 € a notte per soggiorno. Va comunicato in fase di prenotazione; in camera e negli spazi comuni chiediamo di avere cura dell'animale e di rispettare gli altri ospiti (guinzaglio negli spazi comuni quando indicato).",
    petsWelcome: "Per rendere il soggiorno comodo anche al tuo amico a quattro zampe, mettiamo a disposizione cuccia, ciotole per acqua e cibo e un piccolo treat di benvenuto. Un gesto per farvi sentire a casa.",
    contactTitle: "Contatti",
    contactText: `Per domande o richieste: ${CONTACT_EMAIL} o ${CONTACT_PHONE} (anche WhatsApp).`,
  },
  en: {
    title: "Terms of stay",
    intro:
      "The following conditions apply to direct bookings at Ohana B&B. For cancellations or changes, contact us by email or WhatsApp.",
    back: "Back to home",
    cancellationTitle: "Cancellation policy",
    cancellationFree:
      "Free cancellation up to 24 hours before check-in time (2pm). Full refund of any amount already paid.",
    cancellationLate:
      "Cancellation between 24 and 0 hours before check-in: we retain the first night as a cancellation fee; any remaining amount paid is refunded.",
    cancellationNoShow:
      "No-show without notice: the full first night amount is charged.",
    cancellationModify:
      "Date or room changes: on request and subject to availability; possible rate difference may apply.",
    stayTitle: "Stay rules",
    checkInOut: "Check-in from 2pm, check-out by 10am. Flexible times on request when possible.",
    noSmoking: "Smoking is not allowed in rooms and indoor common areas.",
    petsTitle: "Pets",
    petsBody: "We welcome dogs. A supplement of €5 per night applies. Please let us know at booking; we ask that you take care of your pet and respect other guests (leash in common areas when required).",
    petsWelcome: "To make your four-legged friend's stay comfortable too, we provide a dog bed, bowls for water and food, and a small welcome treat. A little touch to make you feel at home.",
    contactTitle: "Contact",
    contactText: `For questions or requests: ${CONTACT_EMAIL} or ${CONTACT_PHONE} (WhatsApp too).`,
  },
  fr: {
    title: "Conditions de séjour",
    intro:
      "Les conditions suivantes s’appliquent aux réservations directes chez Ohana B&B. Pour les annulations ou modifications, contactez‑nous par e‑mail ou WhatsApp.",
    back: "Retour à l’accueil",
    cancellationTitle: "Conditions d’annulation",
    cancellationFree:
      "Annulation gratuite jusqu’à 24 heures avant l’heure de check‑in (14 h). Remboursement intégral des sommes déjà payées.",
    cancellationLate:
      "Annulation entre 24 h et 0 h avant le check‑in : nous conservons la première nuit à titre de frais ; le reste éventuellement payé est remboursé.",
    cancellationNoShow:
      "No‑show sans préavis : la totalité de la première nuit est facturée.",
    cancellationModify:
      "Changement de dates ou de chambre : sur demande et selon disponibilité ; une différence tarifaire peut s’appliquer.",
    stayTitle: "Règles du séjour",
    checkInOut:
      "Check‑in à partir de 14 h, check‑out avant 10 h. Horaires flexibles sur demande lorsque possible.",
    noSmoking: "Il est interdit de fumer dans les chambres et les espaces communs intérieurs.",
    petsTitle: "Animaux",
    petsBody:
      "Nous acceptons les chiens avec plaisir. Un supplément de 5 € par nuit s’applique. Merci de le signaler lors de la réservation ; nous demandons de respecter les autres clients (laisse dans les espaces communs lorsque requis).",
    petsWelcome:
      "Pour le confort de votre compagnon, nous mettons à disposition un couchage, des gamelles et une petite friandise de bienvenue.",
    contactTitle: "Contact",
    contactText: `Pour toute question : ${CONTACT_EMAIL} ou ${CONTACT_PHONE} (WhatsApp aussi).`,
  },
  es: {
    title: "Condiciones de estancia",
    intro:
      "Las siguientes condiciones se aplican a las reservas directas en Ohana B&B. Para cancelaciones o cambios, contáctanos por email o WhatsApp.",
    back: "Volver a inicio",
    cancellationTitle: "Condiciones de cancelación",
    cancellationFree:
      "Cancelación gratuita hasta 24 horas antes de la hora de check‑in (14:00). Reembolso total de lo ya pagado.",
    cancellationLate:
      "Cancelación entre 24 y 0 horas antes del check‑in: retenemos el importe de la primera noche como penalización; el resto pagado se reembolsa.",
    cancellationNoShow:
      "No presentarse (no‑show) sin aviso: se cobra el importe completo de la primera noche.",
    cancellationModify:
      "Cambios de fechas o de habitación: bajo petición y según disponibilidad; puede aplicarse diferencia de tarifa.",
    stayTitle: "Normas de la estancia",
    checkInOut:
      "Check‑in desde las 14:00, check‑out antes de las 10:00. Horarios flexibles bajo petición cuando sea posible.",
    noSmoking: "No está permitido fumar en las habitaciones ni en las zonas comunes interiores.",
    petsTitle: "Mascotas",
    petsBody:
      "Aceptamos perros. Se aplica un suplemento de 5 € por noche. Por favor avísanos al reservar; pedimos cuidado y respeto a los demás huéspedes (correa en zonas comunes cuando corresponda).",
    petsWelcome:
      "Para que tu amigo de cuatro patas esté cómodo, proporcionamos camita, cuencos para agua y comida y un pequeño detalle de bienvenida.",
    contactTitle: "Contacto",
    contactText: `Para preguntas o solicitudes: ${CONTACT_EMAIL} o ${CONTACT_PHONE} (también WhatsApp).`,
  },
};

export default function CondizioniPage() {
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

          <section className="legal-block">
            <h2 className="legal-heading">{t.cancellationTitle}</h2>
            <ul className="legal-list">
              <li>{t.cancellationFree}</li>
              <li>{t.cancellationLate}</li>
              <li>{t.cancellationNoShow}</li>
              <li>{t.cancellationModify}</li>
            </ul>
          </section>

          <section className="legal-block">
            <h2 className="legal-heading">{t.stayTitle}</h2>
            <p className="legal-body">{t.checkInOut}</p>
            <p className="legal-body">{t.noSmoking}</p>
          </section>

          <section id="animali" className="legal-block">
            <h2 className="legal-heading">{t.petsTitle}</h2>
            <p className="legal-body">{t.petsBody}</p>
            <p className="legal-body legal-body--highlight">{t.petsWelcome}</p>
          </section>

          <section className="legal-block">
            <h2 className="legal-heading">{t.contactTitle}</h2>
            <p className="legal-body">{t.contactText}</p>
          </section>
        </main>
      </div>
    </div>
  );
}
