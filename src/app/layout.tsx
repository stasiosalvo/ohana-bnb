import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const fontFamilySans =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (typeof process !== "undefined" && process.env.NODE_ENV === "production"
    ? "https://www.ohana-bnb.it"
    : "http://localhost:3000");
const ogImageUrl = `${siteUrl.replace(/\/$/, "")}/ohana-logo.png`;

export const metadata: Metadata = {
  title: "Ohana B&B | Bed & Breakfast",
  description:
    "Ohana. Il cuore di Napoli, il calore di casa.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/ohana-logo.png",
    apple: "/ohana-logo.png",
  },
  openGraph: {
    title: "Ohana B&B | Bed & Breakfast",
    description:
      "Ohana. Il cuore di Napoli, il calore di casa.",
    url: siteUrl,
    siteName: "Ohana B&B",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Ohana B&B",
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
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body style={{ fontFamily: fontFamilySans }}>
        {children}
      </body>
    </html>
  );
}
