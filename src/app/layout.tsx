import type { Metadata, Viewport } from "next";
import { isEasterSeason } from "@/lib/easter";
import { EasterDecos } from "./easter-decos";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const fontFamilySans =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// URL del sito: in produzione usa NEXT_PUBLIC_BASE_URL o il dominio reale
const siteUrl =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_URL?.trim()) ||
  (typeof process !== "undefined" && process.env.NODE_ENV === "production"
    ? "https://www.ohana-bnb.it"
    : "http://localhost:3000");
const siteUrlClean = siteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Ohana B&B | Bed & Breakfast",
  description:
    "Ohana. Il cuore di Napoli, il calore di casa.",
  metadataBase: new URL(siteUrlClean),
  icons: {
    icon: "/ohana-logo.png",
    apple: "/ohana-logo.png",
  },
  openGraph: {
    title: "Ohana B&B | Bed & Breakfast",
    description:
      "Ohana. Il cuore di Napoli, il calore di casa.",
    url: siteUrlClean,
    siteName: "Ohana B&B",
    images: [
      {
        url: `${siteUrlClean}/ohana-logo.png`,
        width: 1024,
        height: 1024,
        alt: "Ohana B&B - Bed & Breakfast Napoli",
        type: "image/png",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ohana B&B | Bed & Breakfast",
    description:
      "Ohana. Il cuore di Napoli, il calore di casa.",
    images: [`${siteUrlClean}/ohana-logo.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const easter = isEasterSeason();
  return (
    <html lang="it" className={easter ? "easter" : undefined}>
      <body style={{ fontFamily: fontFamilySans }} className={easter ? "easter" : undefined}>
        {easter && (
          <>
            <div className="easter-ribbon" aria-hidden>
              <span className="easter-ribbon-text">Buona Pasqua 🐣</span>
            </div>
            <EasterDecos />
          </>
        )}
        {children}
      </body>
    </html>
  );
}
