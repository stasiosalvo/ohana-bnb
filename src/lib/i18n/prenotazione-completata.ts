import type { SiteLang } from "@/lib/site-language";

export const prenotazioneCompletataCopy: Record<
  SiteLang,
  { title: string; body: string }
> = {
  it: {
    title: "Prenotazione completata",
    body:
      "Grazie per aver scelto Ohana B&B. Abbiamo ricevuto il tuo pagamento e ti invieremo a breve un'email con tutti i dettagli del soggiorno, inclusi orari di arrivo, indicazioni e consigli sulla zona.",
  },
  en: {
    title: "Booking complete",
    body:
      "Thank you for choosing Ohana B&B. We have received your payment and will email you shortly with all the details of your stay, including arrival times, directions and local tips.",
  },
  fr: {
    title: "Réservation confirmée",
    body:
      "Merci d’avoir choisi Ohana B&B. Nous avons bien reçu votre paiement et vous enverrons bientôt un e‑mail avec tous les détails du séjour (horaires d’arrivée, indications et conseils sur le quartier).",
  },
  es: {
    title: "Reserva completada",
    body:
      "Gracias por elegir Ohana B&B. Hemos recibido tu pago y te enviaremos pronto un correo con todos los detalles de la estancia: horarios de llegada, indicaciones y consejos sobre la zona.",
  },
};
