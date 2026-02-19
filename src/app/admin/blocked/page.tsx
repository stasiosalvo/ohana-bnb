"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type RoomId = "sun" | "moon" | "earth";

type BlockedPeriod = {
  id: string;
  roomId: RoomId;
  checkIn: string;
  checkOut: string;
  note?: string;
};

const ROOM_NAMES: Record<RoomId, string> = {
  sun: "Sun",
  moon: "Moon",
  earth: "Earth",
};

export default function AdminBlockedPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState<BlockedPeriod[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  const [formRoom, setFormRoom] = useState<RoomId>("sun");
  const [formCheckIn, setFormCheckIn] = useState("");
  const [formCheckOut, setFormCheckOut] = useState("");
  const [formNote, setFormNote] = useState("");

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!password.trim()) return;
    setLoading(true);
    fetch("/api/admin/blocked", {
      headers: { Authorization: `Bearer ${password.trim()}` },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Password non corretta.");
        return res.json();
      })
      .then((data) => {
        setToken(password.trim());
        setList(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!token) return;
    fetch("/api/admin/blocked", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch(() => setList([]));
  }, [token]);

  const addBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !formCheckIn || !formCheckOut) return;
    const checkInDate = new Date(formCheckIn);
    const checkOutDate = new Date(formCheckOut);
    if (checkOutDate <= checkInDate) {
      setError("La data di partenza deve essere successiva all'arrivo.");
      return;
    }
    setError(null);
    setSubmitting(true);
    fetch("/api/admin/blocked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomId: formRoom,
        checkIn: formCheckIn,
        checkOut: formCheckOut,
        note: formNote.trim() || undefined,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((d) => { throw new Error(d.error || "Errore"); });
        return res.json();
      })
      .then((period) => {
        setList((prev) => [...prev, period]);
        setFormCheckIn("");
        setFormCheckOut("");
        setFormNote("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false));
  };

  const removeBlock = (id: string) => {
    if (!token) return;
    setRemoving(id);
    fetch("/api/admin/blocked", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore");
        setList((prev) => prev.filter((b) => b.id !== id));
      })
      .catch(() => setError("Errore nella rimozione."))
      .finally(() => setRemoving(null));
  };

  if (!token) {
    return (
      <div className="page-shell">
        <div className="page-inner">
          <header className="topbar">
            <Link href="/" className="brand">
              <Image
                src="/ohana-logo.png"
                alt="Ohana B&B"
                width={180}
                height={56}
                className="brand-logo"
                unoptimized
              />
            </Link>
          </header>
          <main className="legal-main">
            <Link href="/" className="legal-back">
              ← Torna alla home
            </Link>
            <h1 className="legal-title">Blocca date (admin)</h1>
            <p className="legal-intro">
              Inserisci la password admin per bloccare le date delle camere quando sono occupate da prenotazioni dirette.
            </p>
            <form onSubmit={login} className="admin-login-form">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field-input"
                autoComplete="current-password"
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Accesso..." : "Accedi"}
              </button>
            </form>
            {error && (
              <p style={{ color: "#a43131", marginTop: 12, fontSize: 14 }}>
                {error}
              </p>
            )}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-inner">
        <header className="topbar">
          <Link href="/" className="brand">
            <Image
              src="/ohana-logo.png"
              alt="Ohana B&B"
              width={180}
              height={56}
              className="brand-logo"
              unoptimized
            />
          </Link>
          <div className="topbar-right">
            <Link href="/admin/reviews" className="chip">
              Recensioni
            </Link>
            <Link href="/" className="chip">
              Home
            </Link>
          </div>
        </header>
        <main className="legal-main">
          <Link href="/" className="legal-back">
            ← Torna alla home
          </Link>
          <h1 className="legal-title">Blocca date camere</h1>
          <p className="legal-intro">
            Quando qualcuno prenota direttamente (telefono, WhatsApp, di persona), blocca qui le date della camera: sul sito non si potranno più prenotare quelle notti.
          </p>

          <form onSubmit={addBlock} style={{ marginTop: 24, maxWidth: 480 }}>
            <div className="field">
              <label className="field-label">Camera</label>
              <select
                className="field-select"
                value={formRoom}
                onChange={(e) => setFormRoom(e.target.value as RoomId)}
              >
                <option value="sun">Sun</option>
                <option value="moon">Moon</option>
                <option value="earth">Earth</option>
              </select>
            </div>
            <div className="field">
              <label className="field-label">Arrivo (primo giorno occupato)</label>
              <input
                type="date"
                className="field-input"
                value={formCheckIn}
                onChange={(e) => setFormCheckIn(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="field-label">Partenza (ultimo giorno occupato)</label>
              <input
                type="date"
                className="field-input"
                value={formCheckOut}
                onChange={(e) => setFormCheckOut(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="field-label">Nota (opzionale)</label>
              <input
                type="text"
                className="field-input"
                placeholder="Es. Prenotazione diretta"
                value={formNote}
                onChange={(e) => setFormNote(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting || !formCheckIn || !formCheckOut}
            >
              {submitting ? "Blocco in corso..." : "Blocca date"}
            </button>
          </form>

          {error && (
            <p style={{ color: "#a43131", marginTop: 12, fontSize: 14 }}>
              {error}
            </p>
          )}

          <h2 style={{ marginTop: 32, marginBottom: 12, fontSize: 18 }}>
            Date attualmente bloccate
          </h2>
          {list.length === 0 ? (
            <p style={{ color: "var(--color-muted)", fontSize: 14 }}>
              Nessun blocco. Aggiungi arrivo e partenza sopra quando una camera è occupata.
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {list.map((b) => (
                <li
                  key={b.id}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 0",
                    borderBottom: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <span className="badge-soft">{ROOM_NAMES[b.roomId]}</span>
                  <span>
                    {b.checkIn} → {b.checkOut}
                  </span>
                  {b.note && (
                    <span style={{ fontSize: 12, color: "var(--color-muted)" }}>
                      {b.note}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeBlock(b.id)}
                    disabled={removing === b.id}
                    style={{
                      marginLeft: "auto",
                      fontSize: 12,
                      padding: "4px 10px",
                      background: "transparent",
                      border: "1px solid var(--color-muted)",
                      borderRadius: 6,
                      cursor: removing === b.id ? "not-allowed" : "pointer",
                      color: "var(--color-muted)",
                    }}
                  >
                    {removing === b.id ? "Rimozione..." : "Rimuovi"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
