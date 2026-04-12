"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SiteLang = "it" | "en" | "fr" | "es";

const STORAGE_KEY = "ohana_site_lang_v1";

function readStoredLang(): SiteLang | null {
  if (typeof window === "undefined") return null;
  try {
    const s = window.localStorage.getItem(STORAGE_KEY);
    if (s === "it" || s === "en" || s === "fr" || s === "es") return s;
  } catch {
    /* ignore */
  }
  return null;
}

type Ctx = {
  lang: SiteLang;
  setLang: (l: SiteLang) => void;
};

const SiteLangContext = createContext<Ctx | null>(null);

export function SiteLanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SiteLang>("it");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) setLangState(stored);
    setMounted(true);
  }, []);

  const setLang = useCallback((l: SiteLang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang =
      lang === "it" ? "it" : lang === "en" ? "en" : lang === "fr" ? "fr" : "es";
  }, [lang, mounted]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <SiteLangContext.Provider value={value}>{children}</SiteLangContext.Provider>
  );
}

export function useSiteLang(): Ctx {
  const ctx = useContext(SiteLangContext);
  if (!ctx) {
    throw new Error("useSiteLang must be used within SiteLanguageProvider");
  }
  return ctx;
}
