import type { SiteLang } from "@/lib/site-language";

export type BookingLang = SiteLang;

export const bookingTouristTaxCopy: Record<
  SiteLang,
  {
    langSwitchAria: string;
    backHome: string;
    estimatedTotal: string;
    roomVatNote: string;
    touristTaxLabel: string;
    totalPayOnline: string;
    night: string;
    nights: string;
    guest: string;
    guests: string;
    payTaxOnSiteCheckbox: string;
    helpPayOnSite: string;
    helpPayOnline: string;
  }
> = {
  it: {
    langSwitchAria: "Seleziona lingua",
    backHome: "Torna alla homepage",
    estimatedTotal: "Totale stimato",
    roomVatNote: "(soggiorno, IVA inclusa)",
    touristTaxLabel: "Tassa di soggiorno",
    totalPayOnline: "Totale da pagare online",
    night: "notte",
    nights: "notti",
    guest: "ospite",
    guests: "ospiti",
    payTaxOnSiteCheckbox:
      "Pago la tassa di soggiorno in contanti in struttura (non è inclusa nel pagamento con carta).",
    helpPayOnSite: "In cassa all'arrivo: porta l'importo in contanti indicato sopra.",
    helpPayOnline:
      "La tassa di soggiorno comunale è inclusa nel totale che pagherai ora con carta.",
  },
  en: {
    langSwitchAria: "Select language",
    backHome: "Back to home",
    estimatedTotal: "Estimated total",
    roomVatNote: "(stay, VAT included)",
    touristTaxLabel: "Tourist tax (city tax)",
    totalPayOnline: "Total to pay online",
    night: "night",
    nights: "nights",
    guest: "guest",
    guests: "guests",
    payTaxOnSiteCheckbox:
      "I will pay the tourist tax in cash at the property (not included in the card payment).",
    helpPayOnSite: "At check-in: please bring the cash amount shown above.",
    helpPayOnline:
      "The municipal tourist tax is included in the total you will pay now by card.",
  },
  fr: {
    langSwitchAria: "Choisir la langue",
    backHome: "Retour à l’accueil",
    estimatedTotal: "Total estimé",
    roomVatNote: "(hébergement, TVA comprise)",
    touristTaxLabel: "Taxe de séjour",
    totalPayOnline: "Total à payer en ligne",
    night: "nuit",
    nights: "nuits",
    guest: "personne",
    guests: "personnes",
    payTaxOnSiteCheckbox:
      "Je paierai la taxe de séjour en espèces sur place (non incluse dans le paiement par carte).",
    helpPayOnSite:
      "À l'arrivée : merci d'apporter le montant en espèces indiqué ci-dessus.",
    helpPayOnline:
      "La taxe de séjour municipale est incluse dans le total que vous payez par carte.",
  },
  es: {
    langSwitchAria: "Seleccionar idioma",
    backHome: "Volver al inicio",
    estimatedTotal: "Total estimado",
    roomVatNote: "(alojamiento, IVA incluido)",
    touristTaxLabel: "Tasa turística",
    totalPayOnline: "Total a pagar online",
    night: "noche",
    nights: "noches",
    guest: "huésped",
    guests: "huéspedes",
    payTaxOnSiteCheckbox:
      "Pagaré la tasa turística en efectivo en el alojamiento (no incluida en el pago con tarjeta).",
    helpPayOnSite: "Al llegar: trae en efectivo el importe indicado arriba.",
    helpPayOnline:
      "La tasa turística municipal está incluida en el total que pagarás ahora con tarjeta.",
  },
};
