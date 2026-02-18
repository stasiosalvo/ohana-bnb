"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Aggiungi le foto in public/galleria/ (es. sun-1.jpg, sun-2.jpg) e i percorsi nell'array photos di ogni camera
const ROOMS = [
  {
    id: "sun",
    name: "Sun",
    descriptionIt: "☀️ Avvolta da tonalità calde e sfumature aranciate, Sun è una camera luminosa e accogliente, pensata per trasmettere energia e serenità.\n\nLa luce naturale valorizza gli spazi, creando un'atmosfera calda e rassicurante, ideale per chi ama ambienti vivaci ma equilibrati.\n\nUn rifugio intimo dove comfort e calore si incontrano.",
    descriptionEn: "☀️ Wrapped in warm tones and orange shades, Sun is a bright, welcoming room designed to convey energy and serenity.\n\nNatural light enhances the space, creating a warm, reassuring atmosphere, ideal for those who love lively yet balanced environments.\n\nAn intimate retreat where comfort and warmth meet.",
    metaIt: "2 ospiti · 20 m² · bagno privato · da €80/notte",
    metaEn: "2 guests · 20 m² · private bathroom · from €80/night",
    photoClass: "gallery-room-photo--sun",
    photos: ["/galleria/sun-1.jpg", "/galleria/sun-2.jpg", "/galleria/sun-3.jpg"],
  },
  {
    id: "moon",
    name: "Moon",
    descriptionIt: "🌙 I delicati toni blu e celeste polvere rendono Moon un ambiente rilassante e armonioso.\n\nLa luce si diffonde in modo soffuso, creando un'atmosfera quieta e avvolgente, perfetta per chi cerca tranquillità e riposo profondo.\n\nUno spazio elegante e silenzioso, dedicato al relax e alla calma interiore.",
    descriptionEn: "🌙 Soft blue and dusty sky-blue tones make Moon a relaxing, harmonious space.\n\nLight filters in gently, creating a quiet, cosy atmosphere, perfect for those seeking tranquillity and deep rest.\n\nAn elegant, quiet space dedicated to relaxation and inner calm.",
    metaIt: "2 ospiti · 20 m² · bagno privato · da €80/notte",
    metaEn: "2 guests · 20 m² · private bathroom · from €80/night",
    photoClass: "gallery-room-photo--moon",
    photos: ["/galleria/moon-1.jpg", "/galleria/moon-2.jpg", "/galleria/moon-3.jpg", "/galleria/moon-4.jpg"],
  },
  {
    id: "earth",
    name: "Earth",
    descriptionIt: "🌿 I verdi leggeri e le nuance naturali di Earth richiamano equilibrio e autenticità.\n\nL'ambiente, luminoso e armonioso, invita a rallentare e a ritrovare un senso di benessere semplice e genuino.\n\nUna camera pensata per chi desidera sentirsi in sintonia con la natura, senza rinunciare al comfort.",
    descriptionEn: "🌿 Earth's soft greens and natural shades evoke balance and authenticity.\n\nThe bright, harmonious space invites you to slow down and rediscover a sense of simple, genuine wellbeing.\n\nA room for those who want to feel in tune with nature without giving up comfort.",
    metaIt: "2 ospiti · 20 m² · bagno privato · da €80/notte",
    metaEn: "2 guests · 20 m² · private bathroom · from €80/night",
    photoClass: "gallery-room-photo--earth",
    photos: ["/galleria/earth-1.jpg", "/galleria/earth-2.jpg", "/galleria/earth-3.jpg", "/galleria/earth-4.jpg"],
  },
];

// Sezione "I nostri spazi" (logo + foto struttura)
const SPAZI = {
  id: "spazi",
  name: "I nostri spazi",
  descriptionIt: "Gli spazi comuni, gli amenity e i dettagli che rendono Ohana un luogo speciale.",
  photos: [
    "/galleria/spazio-1.jpg",
    "/galleria/spazio-2.jpg",
    "/galleria/spazio-3.jpg",
    "/galleria/spazio-4.jpg",
    "/galleria/spazio-5.jpg",
    "/galleria/spazio-6.jpg",
    "/galleria/spazio-7.jpg",
    "/galleria/spazio-8.jpg",
  ],
};

type LightboxItem = { name: string; photos: string[] };

export default function GalleriaPage() {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

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
            <Link href="/" className="chip">
              Torna alla homepage
            </Link>
          </div>
        </header>

        <main>
          <div className="gallery-intro">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Le nostre camere</span>
            </div>
            <h1 className="gallery-title">Galleria camere</h1>
            <p className="gallery-subtitle">
              Tre atmosfere diverse, stessa cura.
            </p>
            <p className="gallery-intro-text">
              Tutte le camere dispongono di climatizzazione, macchina del caffè, frigobar e snack di benvenuto, per garantire un&apos;esperienza di soggiorno piacevole e curata nei dettagli. Ogni camera è inoltre dotata di bagno privato con set di cortesia e asciugamani puliti, forniti per tutta la durata del soggiorno.
            </p>
          </div>

          <div className="gallery-list">
            {ROOMS.map((room) => (
              <article
                key={room.id}
                className="gallery-room"
                aria-labelledby={`room-${room.id}`}
              >
                <div className="gallery-room-photo-wrap">
                  <div
                    className={`gallery-room-photo ${room.photoClass}`}
                    role="img"
                    aria-label={`Camera ${room.name}`}
                  />
                  <button
                    type="button"
                    className="gallery-room-photo-btn"
                    onClick={() => setLightboxItem({ name: `Camera ${room.name}`, photos: room.photos })}
                    aria-label={`Vedi foto Camera ${room.name}`}
                  >
                    <span>Vedi foto</span>
                  </button>
                </div>
                <div className="gallery-room-body">
                  <h2 id={`room-${room.id}`} className="gallery-room-name">
                    Camera {room.name}
                  </h2>
                  <p className="gallery-room-desc">{room.descriptionIt}</p>
                  <p className="gallery-room-meta">{room.metaIt}</p>
                  <div className="gallery-room-cta">
                    <Link href={`/prenota/${room.id}`}>
                      <button className="btn-primary" type="button">
                        Prenota {room.name}
                        <span aria-hidden>→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {/* Sezione I nostri spazi (logo + foto) */}
            <article
              className="gallery-room"
              aria-labelledby="room-spazi"
            >
              <div className="gallery-room-photo-wrap">
                <div className="gallery-room-photo gallery-room-photo--logo">
                  <Image
                    src="/ohana-logo.png"
                    alt="Ohana B&B"
                    fill
                    className="object-contain"
                    sizes="(max-width: 720px) 100vw, 40vw"
                    unoptimized
                  />
                </div>
                <button
                  type="button"
                  className="gallery-room-photo-btn"
                  onClick={() => setLightboxItem({ name: SPAZI.name, photos: SPAZI.photos })}
                  aria-label={`Vedi foto ${SPAZI.name}`}
                >
                  <span>Vedi foto</span>
                </button>
              </div>
              <div className="gallery-room-body">
                <h2 id="room-spazi" className="gallery-room-name">
                  {SPAZI.name}
                </h2>
                <p className="gallery-room-desc">{SPAZI.descriptionIt}</p>
                <div className="gallery-room-cta">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setLightboxItem({ name: SPAZI.name, photos: SPAZI.photos })}
                  >
                    Vedi foto
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
          <div
            className="gallery-lightbox-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-lightbox-header">
              <h2 id="lightbox-title" className="gallery-lightbox-title">
                Foto · {lightboxItem.name}
              </h2>
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setLightboxItem(null)}
                aria-label="Chiudi"
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
                      alt={`${lightboxItem.name} - foto ${i + 1}`}
                    />
                  ))}
                </div>
              ) : (
                <p className="gallery-lightbox-empty">
                  Le foto saranno presto disponibili.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
