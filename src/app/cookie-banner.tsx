"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "ohana_cookie_consent_v1";
const COOKIE_NAME = "ohana_cookie_consent";

type ConsentValue = "all" | "essential" | "custom";
type ConsentPrefs = {
  value: ConsentValue;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

function setConsentCookie(value: ConsentValue, days = 180) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({
    value: "essential",
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        setVisible(true);
        return;
      }
      const parsed = JSON.parse(stored) as Partial<ConsentPrefs> | null;
      if (parsed && typeof parsed === "object") {
        setPrefs((p) => ({
          value: (parsed.value as ConsentValue) || p.value,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
          preferences: Boolean(parsed.preferences),
        }));
      }
    } catch {
      // Se localStorage non è disponibile, mostriamo comunque il banner.
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!showPrefs) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPrefs(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showPrefs]);

  const persist = (next: ConsentPrefs) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    } catch {}
    setConsentCookie(next.value);
    setPrefs(next);
    setVisible(false);
    setShowPrefs(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
        <div className="cookie-banner-inner">
          <div className="cookie-banner-text">
            <div className="cookie-banner-title">Cookie</div>
            <p className="cookie-banner-body">
              Usiamo cookie necessari al funzionamento del sito e, con il tuo consenso, cookie di
              preferenza e misurazione. Puoi accettare, rifiutare o gestire le preferenze.
              <span className="cookie-banner-links">
                <Link href="/cookie">Cookie policy</Link>
                <span aria-hidden> · </span>
                <Link href="/privacy">Privacy</Link>
              </span>
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button
              type="button"
              className="cookie-btn cookie-btn--secondary"
              onClick={() =>
                persist({ value: "essential", analytics: false, marketing: false, preferences: false })
              }
            >
              Rifiuta
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn--secondary"
              onClick={() => setShowPrefs(true)}
            >
              Preferenze
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn--accept"
              onClick={() => persist({ value: "all", analytics: true, marketing: true, preferences: true })}
            >
              Accetta tutto
            </button>
          </div>
        </div>
      </div>

      {showPrefs && (
        <div
          className="cookie-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Preferenze cookie"
          onClick={() => setShowPrefs(false)}
        >
          <div className="cookie-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="cookie-modal-header">
              <div>
                <div className="cookie-modal-title">Preferenze cookie</div>
                <div className="cookie-modal-subtitle">
                  Scegli quali cookie consentire. Quelli necessari sono sempre attivi.
                </div>
              </div>
              <button
                type="button"
                className="cookie-icon-btn"
                aria-label="Chiudi"
                onClick={() => setShowPrefs(false)}
              >
                ✕
              </button>
            </div>

            <div className="cookie-prefs">
              <label className="cookie-pref">
                <span className="cookie-pref-main">
                  <span className="cookie-pref-name">Necessari</span>
                  <span className="cookie-pref-desc">Sempre attivi per funzionamento e sicurezza.</span>
                </span>
                <span className="cookie-pill">Attivi</span>
              </label>

              <label className="cookie-pref">
                <span className="cookie-pref-main">
                  <span className="cookie-pref-name">Preferenze</span>
                  <span className="cookie-pref-desc">Es. lingua e impostazioni.</span>
                </span>
                <input
                  type="checkbox"
                  checked={prefs.preferences}
                  onChange={(e) => setPrefs((p) => ({ ...p, preferences: e.target.checked }))}
                />
              </label>

              <label className="cookie-pref">
                <span className="cookie-pref-main">
                  <span className="cookie-pref-name">Statistiche</span>
                  <span className="cookie-pref-desc">Misurazione visite e performance.</span>
                </span>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                />
              </label>

              <label className="cookie-pref">
                <span className="cookie-pref-main">
                  <span className="cookie-pref-name">Marketing</span>
                  <span className="cookie-pref-desc">Cookie di marketing/advertising (se attivati).</span>
                </span>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                />
              </label>
            </div>

            <div className="cookie-modal-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn--secondary"
                onClick={() =>
                  persist({ value: "essential", analytics: false, marketing: false, preferences: false })
                }
              >
                Rifiuta tutto
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn--secondary"
                onClick={() => persist({ value: "all", analytics: true, marketing: true, preferences: true })}
              >
                Accetta tutto
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn--accept"
                onClick={() => {
                  const any = prefs.analytics || prefs.marketing || prefs.preferences;
                  persist({
                    ...prefs,
                    value: any ? "custom" : "essential",
                  });
                }}
              >
                Salva preferenze
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

