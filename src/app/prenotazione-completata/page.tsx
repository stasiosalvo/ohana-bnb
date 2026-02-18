import Image from "next/image";
import Link from "next/link";

export default function PrenotazioneCompletataPage() {
  return (
    <div className="page-shell">
      <div className="page-inner">
        <header className="topbar">
          <Link href="/" className="brand">
            <Image
              src="/ohana-logo.png"
              alt="Ohana Bed & Breakfast"
              width={180}
              height={56}
              className="brand-logo"
              unoptimized
            />
          </Link>
        </header>
        <div className="success-shell">
          <div className="success-icon" aria-hidden>
            ✓
          </div>
          <h1 className="success-title">Prenotazione completata</h1>
          <p className="success-text">
            Grazie per aver scelto Ohana B&amp;B. Abbiamo ricevuto il tuo
            pagamento e ti invieremo a breve un&apos;email con tutti i dettagli
            del soggiorno, inclusi orari di arrivo, indicazioni e consigli sulla
            zona.
          </p>
        </div>
      </div>
    </div>
  );
}

