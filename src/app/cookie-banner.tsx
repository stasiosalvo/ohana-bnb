"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cookieBannerCopy } from "@/lib/i18n/cookie-banner-copy";
import { useSiteLang } from "@/lib/site-language";

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
  const { lang } = useSiteLang();
  const t = cookieBannerCopy[lang];
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
      <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t.dialogAria}>
        <div className="cookie-banner-inner">
          <div className="cookie-banner-text">
            <div className="cookie-banner-title">{t.title}</div>
            <p className="cookie-banner-body">
              {t.body}
              <span className="cookie-banner-links">
                <Link href="/cookie">{t.policy}</Link>
                <span aria-hidden> · </span>
                <Link href="/privacy">{t.privacy}</Link>
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
              {t.reject}
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn--secondary"
              onClick={() => setShowPrefs(true)}
            >
              {t.preferences}
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn--accept"
              onClick={() => persist({ value: "all", analytics: true, marketing: true, preferences: true })}
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>

      {showPrefs && (
        <div
          className="cookie-modal"
          role="dialog"
          aria-modal="true"
          aria-label={t.prefsModalAria}
          onClick={() => setShowPrefs(false)}
        >
          <div className="cookie-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="cookie-modal-header">
              <div>
                <div className="cookie-modal-title">{t.prefsTitle}</div>
                <div className="cookie-modal-subtitle">{t.prefsSubtitle}</div>
              </div>
              <button
                type="button"
                className="cookie-icon-btn"
                aria-label={t.close}
                onClick={() => setShowPrefs(false)}
              >
                ✕
              </button>
            </div>

            <div className="cookie-prefs">
              <label className="cookie-pref">
                <span className="cookie-pref-main">
                  <span className="cookie-pref-name">{t.necessaryName}</span>
                  <span className="cookie-pref-desc">{t.necessaryDesc}</span>
                </span>
                <span className="cookie-pill">{t.necessaryPill}</span>
              </label>

              <label className="cookie-pref">
                <span className="cookie-pref-main">
                  <span className="cookie-pref-name">{t.prefName}</span>
                  <span className="cookie-pref-desc">{t.prefDesc}</span>
                </span>
                <input
                  type="checkbox"
                  checked={prefs.preferences}
                  onChange={(e) => setPrefs((p) => ({ ...p, preferences: e.target.checked }))}
                />
              </label>

              <label className="cookie-pref">
                <span className="cookie-pref-main">
                  <span className="cookie-pref-name">{t.statsName}</span>
                  <span className="cookie-pref-desc">{t.statsDesc}</span>
                </span>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                />
              </label>

              <label className="cookie-pref">
                <span className="cookie-pref-main">
                  <span className="cookie-pref-name">{t.marketingName}</span>
                  <span className="cookie-pref-desc">{t.marketingDesc}</span>
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
                {t.rejectAll}
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn--secondary"
                onClick={() => persist({ value: "all", analytics: true, marketing: true, preferences: true })}
              >
                {t.acceptAll}
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
                {t.savePrefs}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

