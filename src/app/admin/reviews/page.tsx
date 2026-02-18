"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type ReviewStatus = "pending" | "approved" | "rejected";

type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  status: ReviewStatus;
};

export default function AdminReviewsPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!password.trim()) return;
    setLoading(true);
    fetch("/api/admin/reviews", {
      headers: { Authorization: `Bearer ${password.trim()}` },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Password non corretta.");
        return res.json();
      })
      .then((data) => {
        setToken(password.trim());
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!token) return;
    fetch("/api/admin/reviews", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]));
  }, [token]);

  const updateStatus = (id: string, status: ReviewStatus) => {
    if (!token) return;
    setUpdating(id);
    fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, status }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore");
        return res.json();
      })
      .then((updated) => {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: updated.status } : r))
        );
      })
      .catch(() => setError("Errore nell'aggiornamento."))
      .finally(() => setUpdating(null));
  };

  const deleteReview = (id: string) => {
    if (!token) return;
    setUpdating(id);
    fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore");
        setReviews((prev) => prev.filter((r) => r.id !== id));
      })
      .catch(() => setError("Errore nell'eliminazione."))
      .finally(() => setUpdating(null));
  };

  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");
  const rejected = reviews.filter((r) => r.status === "rejected");

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
            <h1 className="legal-title">Modera recensioni</h1>
            <p className="legal-intro">
              Inserisci la password admin per visualizzare e approvare o rifiutare le recensioni.
            </p>
            <form onSubmit={login} className="admin-login-form">
              <label className="field-label" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="field-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password admin"
                autoComplete="current-password"
              />
              {error && (
                <p className="review-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Verifica..." : "Accedi"}
              </button>
            </form>
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
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setToken(null)}
          >
            Esci
          </button>
        </header>
        <main className="legal-main">
          <Link href="/" className="legal-back">
            ← Torna alla home
          </Link>
          <h1 className="legal-title">Modera recensioni</h1>
          <p className="legal-intro">
            In attesa: {pending.length} · Approvate: {approved.length} · Rifiutate: {rejected.length}
          </p>

          {pending.length > 0 && (
            <section className="admin-section">
              <h2 className="legal-heading">In attesa di approvazione</h2>
              <div className="admin-review-list">
                {pending.map((r) => (
                  <article key={r.id} className="admin-review-card">
                    <div className="review-stars" aria-hidden>
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </div>
                    <p className="review-text">{r.text}</p>
                    <footer className="review-meta">
                      <span className="review-name">{r.name}</span>
                      <span className="review-date">
                        {new Date(r.date).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </footer>
                    <div className="admin-review-actions">
                      <button
                        type="button"
                        className="btn-primary"
                        disabled={updating === r.id}
                        onClick={() => updateStatus(r.id, "approved")}
                      >
                        {updating === r.id ? "..." : "Approva"}
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        disabled={updating === r.id}
                        onClick={() => updateStatus(r.id, "rejected")}
                      >
                        Rifiuta
                      </button>
                      <button
                        type="button"
                        className="btn-ghost admin-btn-delete"
                        disabled={updating === r.id}
                        onClick={() => deleteReview(r.id)}
                      >
                        {updating === r.id ? "..." : "Elimina"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {approved.length > 0 && (
            <section className="admin-section">
              <h2 className="legal-heading">Approvate (visibili sul sito)</h2>
              <div className="admin-review-list">
                {approved.map((r) => (
                  <article key={r.id} className="admin-review-card admin-review-card--muted">
                    <div className="review-stars" aria-hidden>
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </div>
                    <p className="review-text">{r.text}</p>
                    <footer className="review-meta">
                      <span className="review-name">{r.name}</span>
                      <span className="review-date">
                        {new Date(r.date).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </footer>
                    <div className="admin-review-actions">
                    <button
                      type="button"
                      className="btn-ghost"
                      disabled={updating === r.id}
                      onClick={() => updateStatus(r.id, "rejected")}
                    >
                      {updating === r.id ? "..." : "Rifiuta"}
                    </button>
                    <button
                      type="button"
                      className="btn-ghost admin-btn-delete"
                      disabled={updating === r.id}
                      onClick={() => deleteReview(r.id)}
                    >
                      {updating === r.id ? "..." : "Elimina"}
                    </button>
                  </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {rejected.length > 0 && (
            <section className="admin-section">
              <h2 className="legal-heading">Rifiutate</h2>
              <div className="admin-review-list">
                {rejected.map((r) => (
                  <article key={r.id} className="admin-review-card admin-review-card--muted">
                    <div className="review-stars" aria-hidden>
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </div>
                    <p className="review-text">{r.text}</p>
                    <footer className="review-meta">
                      <span className="review-name">{r.name}</span>
                      <span className="review-date">
                        {new Date(r.date).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </footer>
                    <div className="admin-review-actions">
                    <button
                      type="button"
                      className="btn-ghost"
                      disabled={updating === r.id}
                      onClick={() => updateStatus(r.id, "approved")}
                    >
                      {updating === r.id ? "..." : "Approva"}
                    </button>
                    <button
                      type="button"
                      className="btn-ghost admin-btn-delete"
                      disabled={updating === r.id}
                      onClick={() => deleteReview(r.id)}
                    >
                      {updating === r.id ? "..." : "Elimina"}
                    </button>
                  </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {reviews.length === 0 && (
            <p className="reviews-empty">Nessuna recensione presente.</p>
          )}
        </main>
      </div>
    </div>
  );
}
