"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  GALLERIA_ROOMS,
  GALLERIA_SPAZI,
  galleriaPageCopy,
  galleriaSpaziCopy,
  roomDescription,
  roomMeta,
} from "@/lib/galleria-data";
import { homeExtra } from "@/lib/i18n/home-extra";
import { useSiteLang } from "@/lib/site-language";

type LightboxItem = { name: string; photos: string[] };

export default function GalleriaPage() {
  const { lang, setLang } = useSiteLang();
  const t = galleriaPageCopy[lang];
  const nav = homeExtra[lang];
  const spaziText = galleriaSpaziCopy[lang];

  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [spaziVideoIndex, setSpaziVideoIndex] = useState(0);
  const spaziVideos = Array.isArray(GALLERIA_SPAZI.videoSrc)
    ? GALLERIA_SPAZI.videoSrc
    : GALLERIA_SPAZI.videoSrc
      ? [GALLERIA_SPAZI.videoSrc]
      : [];
  const hasSpaziVideo = spaziVideos.length > 0;

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
          <div className="topbar-right">
            <div className="lang-switch" aria-label={nav.langSwitchAria}>
              <button
                type="button"
                className={`lang-pill ${lang === "it" ? "lang-pill--active" : ""}`}
                onClick={() => setLang("it")}
              >
                IT
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === "en" ? "lang-pill--active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === "fr" ? "lang-pill--active" : ""}`}
                onClick={() => setLang("fr")}
              >
                FR
              </button>
              <button
                type="button"
                className={`lang-pill ${lang === "es" ? "lang-pill--active" : ""}`}
                onClick={() => setLang("es")}
              >
                ES
              </button>
            </div>
            <Link href="/" className="chip">
              {t.backHome}
            </Link>
          </div>
        </header>

        <main>
          <div className="gallery-intro">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>{t.eyebrow}</span>
            </div>
            <h1 className="gallery-title">{t.title}</h1>
            <p className="gallery-subtitle">{t.subtitle}</p>
            <p className="gallery-intro-text">{t.intro}</p>
          </div>

          <div className="gallery-list">
            {GALLERIA_ROOMS.map((room) => (
              <article
                key={room.id}
                className="gallery-room"
                aria-labelledby={`room-${room.id}`}
              >
                <div className="gallery-room-photo-wrap">
                  <div
                    className={`gallery-room-photo ${room.photoClass}`}
                    role="img"
                    aria-label={`${t.roomWord} ${room.name}`}
                  >
                    {room.videoSrc && (
                      <video
                        src={room.videoSrc}
                        className="gallery-room-photo-video"
                        muted
                        loop
                        playsInline
                        autoPlay
                        aria-hidden
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="gallery-room-photo-btn"
                    onClick={() =>
                      setLightboxItem({
                        name: `${t.roomWord} ${room.name}`,
                        photos: room.photos,
                      })
                    }
                    aria-label={`${t.seePhotos} ${t.roomWord} ${room.name}`}
                  >
                    <span>{t.seePhotos}</span>
                  </button>
                </div>
                <div className="gallery-room-body">
                  <h2 id={`room-${room.id}`} className="gallery-room-name">
                    {t.roomWord} {room.name}
                  </h2>
                  <p className="gallery-room-desc">{roomDescription(room, lang)}</p>
                  <p className="gallery-room-meta">{roomMeta(room, lang)}</p>
                  <div className="gallery-room-cta">
                    <Link href={`/prenota/${room.id}`}>
                      <button className="btn-primary" type="button">
                        {t.bookPrefix} {room.name}
                        <span aria-hidden>→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            <article className="gallery-room" aria-labelledby="room-spazi">
              <div className="gallery-room-photo-wrap">
                <div
                  className={`gallery-room-photo ${
                    hasSpaziVideo ? "gallery-room-photo--spazi" : "gallery-room-photo--logo"
                  }`}
                >
                  {hasSpaziVideo ? (
                    <video
                      key={spaziVideoIndex}
                      src={spaziVideos[spaziVideoIndex]}
                      className="gallery-room-photo-video"
                      muted
                      loop={spaziVideos.length === 1}
                      playsInline
                      autoPlay
                      aria-hidden
                      onEnded={() =>
                        spaziVideos.length > 1 &&
                        setSpaziVideoIndex((i) => (i + 1) % spaziVideos.length)
                      }
                    />
                  ) : (
                    <Image
                      src="/ohana-logo.png"
                      alt="Ohana B&B"
                      fill
                      className="object-contain"
                      sizes="(max-width: 720px) 100vw, 40vw"
                      unoptimized
                    />
                  )}
                </div>
                <button
                  type="button"
                  className="gallery-room-photo-btn"
                  onClick={() =>
                    setLightboxItem({ name: spaziText.title, photos: GALLERIA_SPAZI.photos })
                  }
                  aria-label={`${t.seePhotos} ${spaziText.title}`}
                >
                  <span>{t.seePhotos}</span>
                </button>
              </div>
              <div className="gallery-room-body">
                <h2 id="room-spazi" className="gallery-room-name">
                  {spaziText.title}
                </h2>
                <p className="gallery-room-desc">{spaziText.description}</p>
                <div className="gallery-room-cta">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() =>
                      setLightboxItem({ name: spaziText.title, photos: GALLERIA_SPAZI.photos })
                    }
                  >
                    {t.seePhotos}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>

      {lightboxItem && (
        <div
          className="gallery-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={() => setLightboxItem(null)}
        >
          <div className="gallery-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-lightbox-header">
              <h2 id="lightbox-title" className="gallery-lightbox-title">
                {t.lightboxPhotosPrefix} · {lightboxItem.name}
              </h2>
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setLightboxItem(null)}
                aria-label={t.close}
              >
                ×
              </button>
            </div>
            <div className="gallery-lightbox-content">
              {lightboxItem.photos.length > 0 ? (
                <div className="gallery-lightbox-grid">
                  {lightboxItem.photos.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${lightboxItem.name} - ${t.lightboxPhotoN} ${i + 1}`}
                    />
                  ))}
                </div>
              ) : (
                <p className="gallery-lightbox-empty">{t.emptyPhotos}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
