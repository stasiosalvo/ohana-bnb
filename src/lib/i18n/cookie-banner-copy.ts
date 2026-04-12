import type { SiteLang } from "@/lib/site-language";

export const cookieBannerCopy: Record<
  SiteLang,
  {
    dialogAria: string;
    title: string;
    body: string;
    policy: string;
    privacy: string;
    reject: string;
    preferences: string;
    acceptAll: string;
    prefsModalAria: string;
    prefsTitle: string;
    prefsSubtitle: string;
    close: string;
    necessaryName: string;
    necessaryDesc: string;
    necessaryPill: string;
    prefName: string;
    prefDesc: string;
    statsName: string;
    statsDesc: string;
    marketingName: string;
    marketingDesc: string;
    rejectAll: string;
    savePrefs: string;
  }
> = {
  it: {
    dialogAria: "Consenso cookie",
    title: "Cookie",
    body:
      "Usiamo cookie necessari al funzionamento del sito e, con il tuo consenso, cookie di preferenza e misurazione. Puoi accettare, rifiutare o gestire le preferenze.",
    policy: "Cookie policy",
    privacy: "Privacy",
    reject: "Rifiuta",
    preferences: "Preferenze",
    acceptAll: "Accetta tutto",
    prefsModalAria: "Preferenze cookie",
    prefsTitle: "Preferenze cookie",
    prefsSubtitle: "Scegli quali cookie consentire. Quelli necessari sono sempre attivi.",
    close: "Chiudi",
    necessaryName: "Necessari",
    necessaryDesc: "Sempre attivi per funzionamento e sicurezza.",
    necessaryPill: "Attivi",
    prefName: "Preferenze",
    prefDesc: "Es. lingua e impostazioni.",
    statsName: "Statistiche",
    statsDesc: "Misurazione visite e performance.",
    marketingName: "Marketing",
    marketingDesc: "Cookie di marketing/advertising (se attivati).",
    rejectAll: "Rifiuta tutto",
    savePrefs: "Salva preferenze",
  },
  en: {
    dialogAria: "Cookie consent",
    title: "Cookies",
    body:
      "We use cookies necessary for the site to work and, with your consent, preference and analytics cookies. You can accept, reject, or manage preferences.",
    policy: "Cookie policy",
    privacy: "Privacy",
    reject: "Reject",
    preferences: "Preferences",
    acceptAll: "Accept all",
    prefsModalAria: "Cookie preferences",
    prefsTitle: "Cookie preferences",
    prefsSubtitle: "Choose which cookies to allow. Necessary cookies are always active.",
    close: "Close",
    necessaryName: "Necessary",
    necessaryDesc: "Always active for operation and security.",
    necessaryPill: "Active",
    prefName: "Preferences",
    prefDesc: "E.g. language and settings.",
    statsName: "Statistics",
    statsDesc: "Visit and performance measurement.",
    marketingName: "Marketing",
    marketingDesc: "Marketing/advertising cookies (if enabled).",
    rejectAll: "Reject all",
    savePrefs: "Save preferences",
  },
  fr: {
    dialogAria: "Consentement cookies",
    title: "Cookies",
    body:
      "Nous utilisons des cookies nécessaires au fonctionnement du site et, avec votre accord, des cookies de préférences et de mesure. Vous pouvez accepter, refuser ou gérer les préférences.",
    policy: "Politique cookies",
    privacy: "Confidentialité",
    reject: "Refuser",
    preferences: "Préférences",
    acceptAll: "Tout accepter",
    prefsModalAria: "Préférences cookies",
    prefsTitle: "Préférences cookies",
    prefsSubtitle:
      "Choisissez les cookies autorisés. Les cookies nécessaires sont toujours actifs.",
    close: "Fermer",
    necessaryName: "Nécessaires",
    necessaryDesc: "Toujours actifs pour le fonctionnement et la sécurité.",
    necessaryPill: "Actifs",
    prefName: "Préférences",
    prefDesc: "Ex. langue et paramètres.",
    statsName: "Statistiques",
    statsDesc: "Mesure des visites et des performances.",
    marketingName: "Marketing",
    marketingDesc: "Cookies marketing/publicité (si activés).",
    rejectAll: "Tout refuser",
    savePrefs: "Enregistrer",
  },
  es: {
    dialogAria: "Consentimiento de cookies",
    title: "Cookies",
    body:
      "Usamos cookies necesarias para el funcionamiento del sitio y, con tu consentimiento, cookies de preferencias y medición. Puedes aceptar, rechazar o gestionar preferencias.",
    policy: "Política de cookies",
    privacy: "Privacidad",
    reject: "Rechazar",
    preferences: "Preferencias",
    acceptAll: "Aceptar todo",
    prefsModalAria: "Preferencias de cookies",
    prefsTitle: "Preferencias de cookies",
    prefsSubtitle:
      "Elige qué cookies permitir. Las necesarias están siempre activas.",
    close: "Cerrar",
    necessaryName: "Necesarias",
    necessaryDesc: "Siempre activas para el funcionamiento y la seguridad.",
    necessaryPill: "Activas",
    prefName: "Preferencias",
    prefDesc: "P. ej. idioma y ajustes.",
    statsName: "Estadísticas",
    statsDesc: "Medición de visitas y rendimiento.",
    marketingName: "Marketing",
    marketingDesc: "Cookies de marketing/publicidad (si están activadas).",
    rejectAll: "Rechazar todo",
    savePrefs: "Guardar preferencias",
  },
};
