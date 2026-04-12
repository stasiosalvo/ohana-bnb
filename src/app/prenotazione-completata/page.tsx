"use client";

import Image from "next/image";
import Link from "next/link";
import { prenotazioneCompletataCopy } from "@/lib/i18n/prenotazione-completata";
import { useSiteLang } from "@/lib/site-language";

export default function PrenotazioneCompletataPage() {
  const { lang } = useSiteLang();
  const t = prenotazioneCompletataCopy[lang];

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
          <h1 className="success-title">{t.title}</h1>
          <p className="success-text">{t.body}</p>
        </div>
      </div>
    </div>
  );
}
