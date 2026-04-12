"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";
import { useSiteLang } from "@/lib/site-language";

type Lang = "it" | "en" | "fr" | "es";

const content = {
  it: {
    title: "Informativa sulla privacy",
    intro:
      "Ohana B&B rispetta la tua riservatezza. Di seguito le informazioni sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR) e del D.Lgs. 196/2003.",
    back: "Torna alla home",
    sections: [
      {
        title: "Titolare del trattamento",
        body: `Il titolare del trattamento è Ohana B&B, con sede in Via Lavinaio 19, 80142 Napoli (NA). Puoi contattarci all'indirizzo ${CONTACT_EMAIL} o al numero ${CONTACT_PHONE}.`,
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
        body: `Hai diritto ad accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione, nonché a proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali (garanteprivacy.it). Per esercitare i tuoi diritti scrivi a ${CONTACT_EMAIL}.`,
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
        body: `The data controller is Ohana B&B, located at Via Lavinaio 19, 80142 Naples (NA), Italy. You can contact us at ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
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
        body: `You have the right to access, rectify, erase, restrict processing, data portability and to object, as well as to lodge a complaint with the supervisory authority (Garante per la Protezione dei Dati Personali – garanteprivacy.it). To exercise your rights, contact ${CONTACT_EMAIL}.`,
      },
      {
        title: "Disclosure",
        body: "Data may be shared with service providers necessary for our operations (e.g. payment processing via Stripe, website tools). We do not sell or share your data with third parties for marketing purposes.",
      },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    intro:
      "Ohana B&B respecte votre vie privée. Vous trouverez ci‑dessous les informations sur le traitement des données personnelles conformément au Règlement (UE) 2016/679 (RGPD) et au droit italien applicable.",
    back: "Retour à l’accueil",
    sections: [
      {
        title: "Responsable du traitement",
        body: `Le responsable du traitement est Ohana B&B, situé Via Lavinaio 19, 80142 Naples (NA). Vous pouvez nous contacter à ${CONTACT_EMAIL} ou au ${CONTACT_PHONE}.`,
      },
      {
        title: "Données collectées",
        body: "Nous collectons les données nécessaires à la réservation et au séjour : nom, adresse e‑mail, numéro de téléphone, dates d’arrivée et de départ, nombre de personnes. Les données de paiement sont traitées en toute sécurité par Stripe et ne sont pas stockées sur nos serveurs. Conformément à la réglementation hôtelière, nous pouvons collecter des données d’identité pour le registre des voyageurs.",
      },
      {
        title: "Finalités et base légale",
        body: "Les données sont traitées pour : gérer les réservations et la relation contractuelle ; respecter les obligations légales (fiscales, registre voyageurs, sécurité publique) ; envoyer des communications liées au séjour. La base légale est l’exécution du contrat, les obligations légales et, le cas échéant, l’intérêt légitime.",
      },
      {
        title: "Conservation",
        body: "Les données sont conservées le temps nécessaire à la gestion de la relation et au respect des obligations légales (y compris les obligations fiscales et de conservation des documents, pouvant dépasser 10 ans si requis).",
      },
      {
        title: "Vos droits",
        body: `Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition, ainsi que du droit d’introduire une réclamation auprès de l’autorité de contrôle (Garante per la Protezione dei Dati Personali – garanteprivacy.it). Pour exercer vos droits, contactez ${CONTACT_EMAIL}.`,
      },
      {
        title: "Communication",
        body: "Les données peuvent être partagées avec des prestataires nécessaires (p. ex. traitement des paiements via Stripe, services techniques du site). Nous ne vendons ni ne partageons vos données à des fins de marketing.",
      },
    ],
  },
  es: {
    title: "Política de privacidad",
    intro:
      "Ohana B&B respeta tu privacidad. A continuación encontrarás información sobre el tratamiento de datos personales de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la normativa italiana aplicable.",
    back: "Volver a inicio",
    sections: [
      {
        title: "Responsable del tratamiento",
        body: `El responsable del tratamiento es Ohana B&B, con sede en Via Lavinaio 19, 80142 Nápoles (NA). Puedes contactarnos en ${CONTACT_EMAIL} o en ${CONTACT_PHONE}.`,
      },
      {
        title: "Datos recopilados",
        body: "Recopilamos los datos necesarios para la reserva y la estancia: nombre, correo electrónico, teléfono, fechas de entrada y salida, número de huéspedes. Los datos de pago los gestiona de forma segura Stripe y no se almacenan en nuestros servidores. En cumplimiento de la normativa de alojamiento, podemos recopilar datos de identificación para el registro de huéspedes.",
      },
      {
        title: "Finalidades y base legal",
        body: "Tratamos los datos para: gestionar reservas y la relación contractual; cumplir obligaciones legales (fiscales, registro de huéspedes, seguridad pública); enviar comunicaciones relacionadas con la estancia. La base legal es la ejecución del contrato, el cumplimiento de obligaciones legales y, cuando proceda, el interés legítimo.",
      },
      {
        title: "Conservación",
        body: "Los datos se conservan el tiempo necesario para la gestión de la relación y el cumplimiento de obligaciones legales (incluidas obligaciones fiscales y de conservación documental, que pueden superar 10 años si así se exige).",
      },
      {
        title: "Tus derechos",
        body: `Tienes derecho de acceso, rectificación, supresión, limitación, portabilidad y oposición, así como a presentar una reclamación ante la autoridad de control (Garante per la Protezione dei Dati Personali – garanteprivacy.it). Para ejercer tus derechos, escribe a ${CONTACT_EMAIL}.`,
      },
      {
        title: "Comunicación",
        body: "Los datos pueden compartirse con proveedores necesarios (p. ej., procesamiento de pagos vía Stripe, servicios técnicos del sitio). No vendemos ni cedemos tus datos a terceros con fines de marketing.",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { lang, setLang } = useSiteLang();
  const t = content[lang as Lang];

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
