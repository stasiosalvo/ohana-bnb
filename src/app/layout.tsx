import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Ohana B&B | Bed & Breakfast",
  description:
    "Ohana. Il cuore di Napoli, il calore di casa.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Ohana B&B | Bed & Breakfast",
    description:
      "Ohana. Il cuore di Napoli, il calore di casa.",
    url: siteUrl,
    siteName: "Ohana B&B",
    images: [
      {
        url: "/ohana-logo.png",
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
    images: ["/ohana-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
