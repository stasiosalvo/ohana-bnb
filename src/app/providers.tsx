"use client";

import { SiteLanguageProvider } from "@/lib/site-language";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SiteLanguageProvider>{children}</SiteLanguageProvider>;
}
