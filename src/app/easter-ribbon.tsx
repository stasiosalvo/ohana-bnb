"use client";

import { useSiteLang } from "@/lib/site-language";

const copy = {
  it: "Buona Pasqua 🐣",
  en: "Happy Easter 🐣",
  fr: "Joyeuses Pâques 🐣",
  es: "Felices Pascuas 🐣",
};

export function EasterRibbon() {
  const { lang } = useSiteLang();
  return (
    <div className="easter-ribbon" aria-hidden>
      <span className="easter-ribbon-text">{copy[lang]}</span>
    </div>
  );
}
