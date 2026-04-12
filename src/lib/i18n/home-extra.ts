import type { SiteLang } from "@/lib/site-language";

/** Stringhe della home oggi sparse (solo IT/EN); allineate a IT/EN/FR/ES */
export const homeExtra: Record<
  SiteLang,
  {
    langSwitchAria: string;
    navAria: string;
    navRooms: string;
    navAbout: string;
    navReviews: string;
    navServices: string;
    navTerms: string;
    navHowToReach: string;
    navBook: string;
    heroBadge1: string;
    heroBadge2: string;
    heroBadge3: string;
    heroCardAria: string;
    heroCardGuestsNote: string;
    heroCardRoomsLabel: string;
    heroCardBreakfastLabel: string;
    heroCardBreakfastValue: string;
    heroCardDistanceLabel: string;
    heroCardDistanceValue: string;
    heroCardStyleLabel: string;
    heroCardStyleValue: string;
    roomsFrom: string;
    secureBooking: string;
    secureBookingSub: string;
    checkInOutBadge: string;
    guests: string;
    privateBath: string;
    bookSun: string;
    bookMoon: string;
    bookEarth: string;
    service1: string;
    service2: string;
    service3: string;
    service4: string;
    service5: string;
    service6: string;
    service7: string;
    service8: string;
    service9: string;
    service10: string;
    service11: string;
    petsBefore: string;
    petsLink: string;
    reviewsListAria: string;
    reviewsEmpty: string;
    leaveReview: string;
    sending: string;
    mapIframeTitle: string;
    mapShellAria: string;
    contactBlockTitle: string;
    carouselAria: string;
    reviewErrorRequired: string;
    reviewErrorSend: string;
    dateLocale: string;
  }
> = {
  it: {
    langSwitchAria: "Seleziona lingua",
    navAria: "Navigazione principale",
    navRooms: "Camere",
    navAbout: "Chi siamo",
    navReviews: "Recensioni",
    navServices: "Servizi",
    navTerms: "Condizioni",
    navHowToReach: "Come arrivare",
    navBook: "Prenota ora",
    heroBadge1: "Solo 3 camere, atmosfera intima",
    heroBadge2: "Il cuore di Napoli, il calore di casa",
    heroBadge3:
      "A soli 5 minuti dalla Stazione Centrale: muoversi in città sarà semplice e veloce.",
    heroCardAria: "Dettagli struttura",
    heroCardGuestsNote: "3 camere, massimo 6 ospiti.",
    heroCardRoomsLabel: "Camere",
    heroCardBreakfastLabel: "Colazione",
    heroCardBreakfastValue: "Coupon da spendere al bar",
    heroCardDistanceLabel: "Distanza",
    heroCardDistanceValue: "5 minuti a piedi dalla Stazione Centrale",
    heroCardStyleLabel: "Stile",
    heroCardStyleValue: "Colorato, luce naturale, dettagliato",
    roomsFrom: "Stanze a partire da",
    secureBooking: "Prenotazione sicura",
    secureBookingSub: "Pagamento online con carta o wallet",
    checkInOutBadge: "Check-in 14:00 · Check-out 10:00",
    guests: "ospiti",
    privateBath: "bagno privato",
    bookSun: "Prenota Sun",
    bookMoon: "Prenota Moon",
    bookEarth: "Prenota Earth",
    service1: "Coupon colazione da spendere al bar",
    service2: "Wi-Fi veloce in tutte le camere",
    service3:
      "La biancheria e gli asciugamani vengono forniti puliti all'arrivo e sono inclusi per tutta la durata del soggiorno.",
    service4: "Pulizia quotidiana disponibile su richiesta, con supplemento.",
    service5: "Letto king size con materassi e cuscini di qualità",
    service6:
      "Check-in anticipato o check-out posticipato di 30 minuti disponibili su richiesta, con eventuale supplemento.",
    service7: "Aria condizionata e televisore in tutte le camere",
    service8: "Macchina del caffè in tutte le stanze",
    service9: "Frigobar in tutte le camere",
    service10: "Nel B&B è disponibile una piccola cucina utilizzabile dagli ospiti",
    service11: "",
    petsBefore: "Accettiamo i cani con piacere. Per condizioni e supplemento vedi",
    petsLink: "Condizioni di soggiorno",
    reviewsListAria: "Elenco recensioni",
    reviewsEmpty: "Ancora nessuna recensione. Sii il primo a lasciare un messaggio!",
    leaveReview: "Lascia una recensione",
    sending: "Invio...",
    mapIframeTitle: "Mappa posizione Ohana B&B",
    mapShellAria: "Mappa indicativa",
    contactBlockTitle: "Contatti",
    carouselAria: "Foto delle camere",
    reviewErrorRequired: "Nome e messaggio sono obbligatori.",
    reviewErrorSend: "Errore nell'invio.",
    dateLocale: "it-IT",
  },
  en: {
    langSwitchAria: "Select language",
    navAria: "Main navigation",
    navRooms: "Rooms",
    navAbout: "About",
    navReviews: "Reviews",
    navServices: "Services",
    navTerms: "Terms",
    navHowToReach: "How to reach us",
    navBook: "Book now",
    heroBadge1: "Only 3 rooms, intimate atmosphere",
    heroBadge2: "The heart of Naples, the warmth of home",
    heroBadge3:
      "Just 5 minutes from Central Station: getting around the city will be easy and quick.",
    heroCardAria: "Property details",
    heroCardGuestsNote: "3 rooms, up to 6 guests.",
    heroCardRoomsLabel: "Rooms",
    heroCardBreakfastLabel: "Breakfast",
    heroCardBreakfastValue: "Coupon to spend at the bar",
    heroCardDistanceLabel: "Distance",
    heroCardDistanceValue: "5 minutes walk from Central Station",
    heroCardStyleLabel: "Style",
    heroCardStyleValue: "Colourful, natural light, detailed",
    roomsFrom: "Rooms from",
    secureBooking: "Secure booking",
    secureBookingSub: "Online payment by card or wallet",
    checkInOutBadge: "Check-in 2pm · Check-out 10am",
    guests: "guests",
    privateBath: "private bathroom",
    bookSun: "Book Sun room",
    bookMoon: "Book Moon room",
    bookEarth: "Book Earth room",
    service1: "Breakfast coupon to spend at the bar",
    service2: "Fast Wi‑Fi in every room",
    service3:
      "Linen and towels are provided clean on arrival and included for the whole stay.",
    service4: "Daily cleaning available on request, with extra charge.",
    service5: "King size bed with quality mattress and pillows",
    service6:
      "Early check-in or late check-out (30 min) available on request, with possible extra charge.",
    service7: "Air conditioning and TV in all rooms",
    service8: "Coffee machine in all rooms",
    service9: "Fridge/minibar in all rooms",
    service10: "A small kitchen is available in the B&B for guests to use",
    service11: "",
    petsBefore: "We welcome dogs. For conditions and supplement see",
    petsLink: "Terms of stay",
    reviewsListAria: "Reviews list",
    reviewsEmpty: "No reviews yet. Be the first to leave a message!",
    leaveReview: "Leave a review",
    sending: "Sending...",
    mapIframeTitle: "Ohana B&B location map",
    mapShellAria: "Indicative map",
    contactBlockTitle: "Contact",
    carouselAria: "Room photos",
    reviewErrorRequired: "Name and message are required.",
    reviewErrorSend: "Error sending.",
    dateLocale: "en-GB",
  },
  fr: {
    langSwitchAria: "Choisir la langue",
    navAria: "Navigation principale",
    navRooms: "Chambres",
    navAbout: "Qui sommes‑nous",
    navReviews: "Avis",
    navServices: "Services",
    navTerms: "Conditions",
    navHowToReach: "Accès",
    navBook: "Réserver",
    heroBadge1: "Seulement 3 chambres, atmosphère intimiste",
    heroBadge2: "Le cœur de Naples, la chaleur du foyer",
    heroBadge3:
      "À 5 minutes de la gare centrale : se déplacer en ville sera simple et rapide.",
    heroCardAria: "Détails de la structure",
    heroCardGuestsNote: "3 chambres, jusqu’à 6 personnes.",
    heroCardRoomsLabel: "Chambres",
    heroCardBreakfastLabel: "Petit‑déjeuner",
    heroCardBreakfastValue: "Bon à utiliser au bar",
    heroCardDistanceLabel: "Distance",
    heroCardDistanceValue: "5 minutes à pied de la gare centrale",
    heroCardStyleLabel: "Style",
    heroCardStyleValue: "Coloré, lumière naturelle, soigné",
    roomsFrom: "Chambres à partir de",
    secureBooking: "Réservation sécurisée",
    secureBookingSub: "Paiement en ligne par carte ou wallet",
    checkInOutBadge: "Check‑in 14 h · Check‑out 10 h",
    guests: "personnes",
    privateBath: "salle de bain privée",
    bookSun: "Réserver Sun",
    bookMoon: "Réserver Moon",
    bookEarth: "Réserver Earth",
    service1: "Bon petit‑déjeuner à utiliser au bar",
    service2: "Wi‑Fi rapide dans toutes les chambres",
    service3:
      "Linge et serviettes fournis propres à l’arrivée, inclus pour tout le séjour.",
    service4: "Ménage quotidien sur demande, avec supplément.",
    service5: "Lit king size, matelas et oreillers de qualité",
    service6:
      "Check‑in anticipé ou check‑out tardif (30 min) sur demande, supplément possible.",
    service7: "Climatisation et télévision dans toutes les chambres",
    service8: "Machine à café dans toutes les chambres",
    service9: "Minibar dans toutes les chambres",
    service10: "Une petite cuisine commune est disponible pour les hôtes",
    service11: "",
    petsBefore: "Les chiens sont les bienvenus. Conditions et supplément : voir",
    petsLink: "Conditions de séjour",
    reviewsListAria: "Liste des avis",
    reviewsEmpty: "Pas encore d’avis. Soyez le premier à laisser un message !",
    leaveReview: "Laisser un avis",
    sending: "Envoi...",
    mapIframeTitle: "Carte – Ohana B&B",
    mapShellAria: "Carte indicative",
    contactBlockTitle: "Contact",
    carouselAria: "Photos des chambres",
    reviewErrorRequired: "Le nom et le message sont obligatoires.",
    reviewErrorSend: "Erreur d’envoi.",
    dateLocale: "fr-FR",
  },
  es: {
    langSwitchAria: "Seleccionar idioma",
    navAria: "Navegación principal",
    navRooms: "Habitaciones",
    navAbout: "Quiénes somos",
    navReviews: "Opiniones",
    navServices: "Servicios",
    navTerms: "Condiciones",
    navHowToReach: "Cómo llegar",
    navBook: "Reservar",
    heroBadge1: "Solo 3 habitaciones, ambiente íntimo",
    heroBadge2: "El corazón de Nápoles, el calor del hogar",
    heroBadge3:
      "A solo 5 minutos de la estación central: moverse por la ciudad será fácil y rápido.",
    heroCardAria: "Detalles del alojamiento",
    heroCardGuestsNote: "3 habitaciones, hasta 6 huéspedes.",
    heroCardRoomsLabel: "Habitaciones",
    heroCardBreakfastLabel: "Desayuno",
    heroCardBreakfastValue: "Cupón para gastar en el bar",
    heroCardDistanceLabel: "Distancia",
    heroCardDistanceValue: "5 minutos a pie de la estación central",
    heroCardStyleLabel: "Estilo",
    heroCardStyleValue: "Colorido, luz natural, con detalle",
    roomsFrom: "Habitaciones desde",
    secureBooking: "Reserva segura",
    secureBookingSub: "Pago online con tarjeta o wallet",
    checkInOutBadge: "Check‑in 14:00 · Check‑out 10:00",
    guests: "huéspedes",
    privateBath: "baño privado",
    bookSun: "Reservar Sun",
    bookMoon: "Reservar Moon",
    bookEarth: "Reservar Earth",
    service1: "Cupón de desayuno para gastar en el bar",
    service2: "Wi‑Fi rápido en todas las habitaciones",
    service3:
      "Ropa de cama y toallas limpias a la llegada, incluidas durante toda la estancia.",
    service4: "Limpieza diaria bajo petición, con suplemento.",
    service5: "Cama king size con colchón y almohadas de calidad",
    service6:
      "Check‑in anticipado o check‑in tardío (30 min) bajo petición, con suplemento.",
    service7: "Aire acondicionado y TV en todas las habitaciones",
    service8: "Cafetera en todas las habitaciones",
    service9: "Minibar en todas las habitaciones",
    service10: "Hay una pequeña cocina disponible para los huéspedes",
    service11: "",
    petsBefore: "Aceptamos perros. Condiciones y suplemento: ver",
    petsLink: "Condiciones de estancia",
    reviewsListAria: "Lista de opiniones",
    reviewsEmpty: "Aún no hay opiniones. ¡Sé el primero en dejar un mensaje!",
    leaveReview: "Dejar una opinión",
    sending: "Enviando...",
    mapIframeTitle: "Mapa – Ohana B&B",
    mapShellAria: "Mapa orientativo",
    contactBlockTitle: "Contacto",
    carouselAria: "Fotos de las habitaciones",
    reviewErrorRequired: "El nombre y el mensaje son obligatorios.",
    reviewErrorSend: "Error al enviar.",
    dateLocale: "es-ES",
  },
};
