import type { SiteLang } from "@/lib/site-language";

export const prenotaPageCopy: Record<
  SiteLang,
  {
    layoutAria: string;
    summaryAsideAria: string;
    eyebrow: string;
    titleMulti: string;
    titleSinglePrefix: string;
    subtitleMulti: string;
    roomSelectorLabel: string;
    roomCardsAria: string;
    perNight: string;
    pillGuests: string;
    pillRooms: string;
    pillSingleSuffix: string;
    totalLineMulti: string;
    /** {name} {price} */
    singleRoomPriceLine: string;
    /** Giugno/luglio: tariffe variabili (mostrato se le date toccano quei mesi) */
    junJulPricingNote: string;
    /** Agosto: €90 / €100 (mostrato se le date toccano agosto) */
    augustPricingNote: string;
    receiptAria: string;
    receiptTitle: string;
    /** {name} = Sun / Moon / Earth */
    receiptRoomHeading: string;
    receiptSubtotalRooms: string;
    /** {label} codice o nome promozione */
    receiptDiscount: string;
    receiptAfterDiscountRooms: string;
    arrival: string;
    departure: string;
    checkingAvailability: string;
    datesUnavailableMulti: string;
    datesUnavailableSingle: string;
    guestsLabel: string;
    guestOne: string;
    guestsMany: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    notesHint: string;
    paymentMethodLabel: string;
    paymentMethodBadge: string;
    submitRedirecting: string;
    submitChecking: string;
    submitUnavailable: string;
    submitPay: string;
    submitNote: string;
    summaryTitle: string;
    summaryChip: string;
    summaryCamera: string;
    datesLabel: string;
    selectDates: string;
    nightsLabel: string;
    guestsSummaryLabel: string;
    discountLabel: string;
    discountPlaceholder: string;
    discountApply: string;
    discountApplying: string;
    /** {label} {total} */
    discountSuccessLine: string;
    disclaimer: string;
    badgeFooter: string;
    errorFillFields: string;
    errorCheckoutDates: string;
    discountInvalid: string;
    discountVerifyFail: string;
    paymentStartFail: string;
    paymentUnexpected: string;
    paymentCatch: string;
    roomShort: Record<"sun" | "moon" | "earth", string>;
  }
> = {
  it: {
    layoutAria: "Prenotazione camera",
    summaryAsideAria: "Riepilogo prenotazione",
    eyebrow: "Prenotazione camera",
    titleMulti: "Prenota {n} camere",
    titleSinglePrefix: "Camera",
    subtitleMulti: "Stesse date per tutte le camere. Aggiungi o rimuovi camere qui sotto.",
    roomSelectorLabel: "Seleziona una o più camere (stesse date)",
    roomCardsAria: "Selezione camere",
    perNight: "/notte",
    pillGuests: "ospiti",
    pillRooms: "camere",
    pillSingleSuffix: "m² · bagno privato",
    totalLineMulti: "totale €{total} ({nights} notte/i)",
    singleRoomPriceLine: "{name}: da €{price} / notte, coupon bar incluso.",
    junJulPricingNote:
      "Giugno e luglio: €80 da lunedì a venerdì, €90 sabato e domenica (tutte le camere). Il totale si aggiorna in base alle date.",
    augustPricingNote:
      "Agosto: €90 a notte; €100 nei giorni 1, 2, 7, 8, 9, 14, 15, 16, 21, 22, 23, 28, 29 e 30 (tutte le camere). Il totale si aggiorna in base alle date.",
    receiptAria: "Dettaglio importi e totale",
    receiptTitle: "Dettaglio importi",
    receiptRoomHeading: "Camera {name}",
    receiptSubtotalRooms: "Subtotale camere",
    receiptDiscount: "Sconto · {label}",
    receiptAfterDiscountRooms: "Totale camere",
    arrival: "Arrivo",
    departure: "Partenza",
    checkingAvailability: "Verifica disponibilità...",
    datesUnavailableMulti:
      "Per una o più camere le date non sono disponibili. Scegli altre date o rimuovi una camera.",
    datesUnavailableSingle:
      "Queste date non sono disponibili per questa camera. Scegli altre date o un'altra camera.",
    guestsLabel: "Ospiti",
    guestOne: "ospite",
    guestsMany: "ospiti",
    nameLabel: "Nome e cognome",
    namePlaceholder: "Mario Rossi",
    emailLabel: "Email",
    emailPlaceholder: "nome@example.com",
    phoneLabel: "Telefono (opzionale)",
    phonePlaceholder: "+39 ...",
    notesLabel: "Richieste particolari",
    notesPlaceholder: "Intolleranze alimentari, orari di arrivo, occasioni speciali...",
    notesHint:
      "Ti risponderemo via email per confermare la disponibilità e i dettagli prima dell'arrivo.",
    paymentMethodLabel: "Metodo di pagamento sicuro",
    paymentMethodBadge: "Carta di credito, debito, Apple Pay, Google Pay (Stripe)",
    submitRedirecting: "Reindirizzamento in corso...",
    submitChecking: "Verifica disponibilità...",
    submitUnavailable: "Date non disponibili",
    submitPay: "Procedi al pagamento",
    submitNote: "La prenotazione è confermata solo dopo l'email di conferma.",
    summaryTitle: "Riepilogo soggiorno",
    summaryChip: "Pagamento sicuro Stripe",
    summaryCamera: "Camera",
    datesLabel: "Date",
    selectDates: "Seleziona le date",
    nightsLabel: "Notti",
    guestsSummaryLabel: "Ospiti",
    discountLabel: "Codice sconto",
    discountPlaceholder: "Es. ESTATE25",
    discountApply: "Applica",
    discountApplying: "...",
    discountSuccessLine: "{label} applicato. Totale: €{total}",
    disclaimer:
      "Il totale è indicativo e potrebbe variare in base a promozioni o periodi di alta stagione. Vedrai l'importo esatto prima di confermare il pagamento su Stripe.",
    badgeFooter:
      "Puoi sempre scriverci per modificare o cancellare la prenotazione in anticipo.",
    errorFillFields: "Compila almeno le date, il nome e l'email per procedere.",
    errorCheckoutDates: "La data di partenza deve essere successiva alla data di arrivo.",
    discountInvalid: "Codice non valido o non applicabile.",
    discountVerifyFail: "Impossibile verificare il codice. Riprova.",
    paymentStartFail: "Impossibile avviare il pagamento, riprova tra poco.",
    paymentUnexpected: "Risposta inattesa dal server di pagamento.",
    paymentCatch:
      "C'è stato un problema con il pagamento online. Puoi riprovare più tardi oppure contattarci via email o WhatsApp.",
    roomShort: {
      sun: "Calda, luminosa, con dettagli dorati.",
      moon: "Silenziosa e morbida, perfetta per chi ama rallentare.",
      earth: "Spaziosa e naturale, ideale per soggiorni lunghi.",
    },
  },
  en: {
    layoutAria: "Room booking",
    summaryAsideAria: "Booking summary",
    eyebrow: "Room booking",
    titleMulti: "Book {n} rooms",
    titleSinglePrefix: "Room",
    subtitleMulti: "Same dates for all rooms. Add or remove rooms below.",
    roomSelectorLabel: "Select one or more rooms (same dates)",
    roomCardsAria: "Room selection",
    perNight: "/night",
    pillGuests: "guests",
    pillRooms: "rooms",
    pillSingleSuffix: "m² · private bathroom",
    totalLineMulti: "total €{total} ({nights} night(s))",
    singleRoomPriceLine: "{name}: from €{price} / night, bar coupon included.",
    junJulPricingNote:
      "June & July: €80 Mon–Fri, €90 Sat & Sun (all rooms). The total updates based on your dates.",
    augustPricingNote:
      "August: €90 per night; €100 on Aug 1–2, 7–9, 14–16, 21–23, 28–30 (all rooms). The total updates based on your dates.",
    receiptAria: "Price breakdown and total",
    receiptTitle: "Price breakdown",
    receiptRoomHeading: "Room {name}",
    receiptSubtotalRooms: "Rooms subtotal",
    receiptDiscount: "Discount · {label}",
    receiptAfterDiscountRooms: "Rooms total",
    arrival: "Check-in",
    departure: "Check-out",
    checkingAvailability: "Checking availability...",
    datesUnavailableMulti:
      "Some rooms are not available for these dates. Choose other dates or remove a room.",
    datesUnavailableSingle:
      "These dates are not available for this room. Choose other dates or another room.",
    guestsLabel: "Guests",
    guestOne: "guest",
    guestsMany: "guests",
    nameLabel: "Full name",
    namePlaceholder: "John Smith",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    phoneLabel: "Phone (optional)",
    phonePlaceholder: "+39 ...",
    notesLabel: "Special requests",
    notesPlaceholder: "Dietary needs, arrival time, special occasions...",
    notesHint:
      "We will reply by email to confirm availability and details before your arrival.",
    paymentMethodLabel: "Secure payment method",
    paymentMethodBadge: "Credit/debit card, Apple Pay, Google Pay (Stripe)",
    submitRedirecting: "Redirecting...",
    submitChecking: "Checking availability...",
    submitUnavailable: "Dates not available",
    submitPay: "Proceed to payment",
    submitNote: "Your booking is confirmed only after the confirmation email.",
    summaryTitle: "Stay summary",
    summaryChip: "Secure Stripe payment",
    summaryCamera: "Room",
    datesLabel: "Dates",
    selectDates: "Select dates",
    nightsLabel: "Nights",
    guestsSummaryLabel: "Guests",
    discountLabel: "Discount code",
    discountPlaceholder: "e.g. SUMMER25",
    discountApply: "Apply",
    discountApplying: "...",
    discountSuccessLine: "{label} applied. Total: €{total}",
    disclaimer:
      "The total is indicative and may vary by promotions or high season. You will see the exact amount before confirming payment on Stripe.",
    badgeFooter:
      "You can always contact us to change or cancel your booking in advance.",
    errorFillFields: "Please fill in dates, name and email to continue.",
    errorCheckoutDates: "Check-out must be after check-in.",
    discountInvalid: "Invalid or expired code.",
    discountVerifyFail: "Could not verify the code. Please try again.",
    paymentStartFail: "Could not start payment. Please try again shortly.",
    paymentUnexpected: "Unexpected response from the payment server.",
    paymentCatch:
      "There was a problem with online payment. Try again later or contact us by email or WhatsApp.",
    roomShort: {
      sun: "Warm and bright, with golden details.",
      moon: "Quiet and soft, perfect for slowing down.",
      earth: "Spacious and natural, ideal for longer stays.",
    },
  },
  fr: {
    layoutAria: "Réservation chambre",
    summaryAsideAria: "Récapitulatif",
    eyebrow: "Réservation",
    titleMulti: "Réserver {n} chambres",
    titleSinglePrefix: "Chambre",
    subtitleMulti: "Mêmes dates pour toutes les chambres. Ajoutez ou retirez des chambres ci‑dessous.",
    roomSelectorLabel: "Sélectionnez une ou plusieurs chambres (mêmes dates)",
    roomCardsAria: "Choix des chambres",
    perNight: "/nuit",
    pillGuests: "personnes",
    pillRooms: "chambres",
    pillSingleSuffix: "m² · salle de bain privée",
    totalLineMulti: "total {total} € ({nights} nuit(s))",
    singleRoomPriceLine: "{name} : à partir de {price} € / nuit, bon petit‑déjeuner inclus.",
    junJulPricingNote:
      "Juin et juillet : 80 € lun–ven, 90 € sam–dim (toutes les chambres). Le total s’ajuste selon les dates.",
    augustPricingNote:
      "Août : 90 € / nuit ; 100 € les 1, 2, 7, 8, 9, 14, 15, 16, 21, 22, 23, 28, 29 et 30 (toutes les chambres). Le total s’ajuste selon les dates.",
    receiptAria: "Détail des montants et total",
    receiptTitle: "Détail des montants",
    receiptRoomHeading: "Chambre {name}",
    receiptSubtotalRooms: "Sous-total chambres",
    receiptDiscount: "Réduction · {label}",
    receiptAfterDiscountRooms: "Total chambres",
    arrival: "Arrivée",
    departure: "Départ",
    checkingAvailability: "Vérification des disponibilités...",
    datesUnavailableMulti:
      "Pour une ou plusieurs chambres, les dates ne sont pas disponibles. Changez de dates ou retirez une chambre.",
    datesUnavailableSingle:
      "Ces dates ne sont pas disponibles pour cette chambre. Choisissez d’autres dates ou une autre chambre.",
    guestsLabel: "Personnes",
    guestOne: "personne",
    guestsMany: "personnes",
    nameLabel: "Nom et prénom",
    namePlaceholder: "Jean Dupont",
    emailLabel: "E‑mail",
    emailPlaceholder: "nom@exemple.com",
    phoneLabel: "Téléphone (facultatif)",
    phonePlaceholder: "+39 ...",
    notesLabel: "Demandes particulières",
    notesPlaceholder: "Régimes alimentaires, horaires d’arrivé, occasions...",
    notesHint:
      "Nous vous répondrons par e‑mail pour confirmer la disponibilité et les détails avant votre arrivée.",
    paymentMethodLabel: "Paiement sécurisé",
    paymentMethodBadge: "Carte, Apple Pay, Google Pay (Stripe)",
    submitRedirecting: "Redirection...",
    submitChecking: "Vérification des disponibilités...",
    submitUnavailable: "Dates non disponibles",
    submitPay: "Procéder au paiement",
    submitNote: "La réservation est confirmée après l’e‑mail de confirmation.",
    summaryTitle: "Récapitulatif du séjour",
    summaryChip: "Paiement sécurisé Stripe",
    summaryCamera: "Chambre",
    datesLabel: "Dates",
    selectDates: "Sélectionnez les dates",
    nightsLabel: "Nuits",
    guestsSummaryLabel: "Personnes",
    discountLabel: "Code promo",
    discountPlaceholder: "Ex. ETE25",
    discountApply: "Appliquer",
    discountApplying: "...",
    discountSuccessLine: "{label} appliqué. Total : {total} €",
    disclaimer:
      "Le total est indicatif et peut varier selon les promotions ou la haute saison. Le montant exact s’affiche avant le paiement sur Stripe.",
    badgeFooter:
      "Vous pouvez nous écrire pour modifier ou annuler la réservation à l’avance.",
    errorFillFields: "Indiquez les dates, le nom et l’e‑mail pour continuer.",
    errorCheckoutDates: "La date de départ doit être après la date d’arrivée.",
    discountInvalid: "Code non valide ou non applicable.",
    discountVerifyFail: "Impossible de vérifier le code. Réessayez.",
    paymentStartFail: "Impossible de lancer le paiement. Réessayez plus tard.",
    paymentUnexpected: "Réponse inattendue du serveur de paiement.",
    paymentCatch:
      "Un problème est survenu avec le paiement en ligne. Réessayez plus tard ou contactez‑nous.",
    roomShort: {
      sun: "Chaleureuse et lumineuse, avec des détails dorés.",
      moon: "Calme et douce, idéale pour ralentir.",
      earth: "Spacieuse et naturelle, idéale pour les longs séjours.",
    },
  },
  es: {
    layoutAria: "Reserva de habitación",
    summaryAsideAria: "Resumen de la reserva",
    eyebrow: "Reserva",
    titleMulti: "Reservar {n} habitaciones",
    titleSinglePrefix: "Habitación",
    subtitleMulti: "Mismas fechas para todas las habitaciones. Añade o quita habitaciones abajo.",
    roomSelectorLabel: "Selecciona una o más habitaciones (mismas fechas)",
    roomCardsAria: "Selección de habitaciones",
    perNight: "/noche",
    pillGuests: "huéspedes",
    pillRooms: "habitaciones",
    pillSingleSuffix: "m² · baño privado",
    totalLineMulti: "total {total} € ({nights} noche(s))",
    singleRoomPriceLine: "{name}: desde {price} € / noche, cupón de bar incluido.",
    junJulPricingNote:
      "Junio y julio: 80 € lun–vie, 90 € sáb–dom (todas las habitaciones). El total se actualiza según las fechas.",
    augustPricingNote:
      "Agosto: 90 € / noche; 100 € los días 1, 2, 7, 8, 9, 14, 15, 16, 21, 22, 23, 28, 29 y 30 (todas las habitaciones). El total se actualiza según las fechas.",
    receiptAria: "Desglose de importes y total",
    receiptTitle: "Desglose de importes",
    receiptRoomHeading: "Habitación {name}",
    receiptSubtotalRooms: "Subtotal alojamiento",
    receiptDiscount: "Descuento · {label}",
    receiptAfterDiscountRooms: "Total alojamiento",
    arrival: "Llegada",
    departure: "Salida",
    checkingAvailability: "Comprobando disponibilidad...",
    datesUnavailableMulti:
      "Para una o más habitaciones las fechas no están disponibles. Elige otras fechas o quita una habitación.",
    datesUnavailableSingle:
      "Estas fechas no están disponibles para esta habitación. Elige otras fechas u otra habitación.",
    guestsLabel: "Huéspedes",
    guestOne: "huésped",
    guestsMany: "huéspedes",
    nameLabel: "Nombre y apellidos",
    namePlaceholder: "María García",
    emailLabel: "Email",
    emailPlaceholder: "nombre@ejemplo.com",
    phoneLabel: "Teléfono (opcional)",
    phonePlaceholder: "+39 ...",
    notesLabel: "Petición especial",
    notesPlaceholder: "Alergias, hora de llegada, ocasiones especiales...",
    notesHint:
      "Te responderemos por email para confirmar disponibilidad y detalles antes de la llegada.",
    paymentMethodLabel: "Pago seguro",
    paymentMethodBadge: "Tarjeta, Apple Pay, Google Pay (Stripe)",
    submitRedirecting: "Redirigiendo...",
    submitChecking: "Comprobando disponibilidad...",
    submitUnavailable: "Fechas no disponibles",
    submitPay: "Ir al pago",
    submitNote: "La reserva se confirma solo tras el email de confirmación.",
    summaryTitle: "Resumen de la estancia",
    summaryChip: "Pago seguro con Stripe",
    summaryCamera: "Habitación",
    datesLabel: "Fechas",
    selectDates: "Selecciona las fechas",
    nightsLabel: "Noches",
    guestsSummaryLabel: "Huéspedes",
    discountLabel: "Código de descuento",
    discountPlaceholder: "Ej. VERANO25",
    discountApply: "Aplicar",
    discountApplying: "...",
    discountSuccessLine: "{label} aplicado. Total: {total} €",
    disclaimer:
      "El total es orientativo y puede variar según promociones o temporada alta. Verás el importe exacto antes de pagar en Stripe.",
    badgeFooter:
      "Puedes escribirnos para modificar o cancelar la reserva con antelación.",
    errorFillFields: "Completa fechas, nombre y email para continuar.",
    errorCheckoutDates: "La salida debe ser posterior a la llegada.",
    discountInvalid: "Código no válido o no aplicable.",
    discountVerifyFail: "No se pudo verificar el código. Inténtalo de nuevo.",
    paymentStartFail: "No se pudo iniciar el pago. Inténtalo más tarde.",
    paymentUnexpected: "Respuesta inesperada del servidor de pago.",
    paymentCatch:
      "Hubo un problema con el pago online. Inténtalo más tarde o contáctanos.",
    roomShort: {
      sun: "Cálida y luminosa, con detalles dorados.",
      moon: "Silenciosa y acogedora, ideal para bajar el ritmo.",
      earth: "Amplia y natural, ideal para estancias largas.",
    },
  },
};
