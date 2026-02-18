/**
 * Store recensioni: in-memory (persiste tra le richieste nello stesso processo).
 * Su Vercel le recensioni si resettano a ogni redeploy; per persistenza permanente
 * puoi aggiungere Upstash Redis (Vercel Marketplace) e le variabili d'ambiente.
 */

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  status: ReviewStatus;
};

const STORAGE_KEY = "ohana_reviews";

// In-memory fallback (persiste fino a riavvio/redeploy)
let memoryStore: Review[] = [];

function getStore(): Review[] {
  return memoryStore;
}

function setStore(reviews: Review[]): void {
  memoryStore = reviews;
}

export function getAllReviews(): Review[] {
  return [...getStore()];
}

export function getApprovedReviews(): Review[] {
  return getStore()
    .filter((r) => r.status === "approved")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPendingReviews(): Review[] {
  return getStore().filter((r) => r.status === "pending");
}

export function addReview(
  data: { name: string; text: string; rating: number }
): Review {
  const reviews = getStore();
  const id = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const review: Review = {
    id,
    name: data.name.trim().slice(0, 100),
    text: data.text.trim().slice(0, 2000),
    rating: Math.min(5, Math.max(1, Math.round(data.rating))),
    date: new Date().toISOString(),
    status: "pending",
  };
  reviews.push(review);
  setStore(reviews);
  return review;
}

export function updateReviewStatus(
  id: string,
  status: ReviewStatus
): Review | null {
  const reviews = getStore();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reviews[index] = { ...reviews[index], status };
  setStore(reviews);
  return reviews[index];
}

export function getReviewById(id: string): Review | null {
  return getStore().find((r) => r.id === id) ?? null;
}

export function deleteReview(id: string): boolean {
  const reviews = getStore().filter((r) => r.id !== id);
  if (reviews.length === getStore().length) return false;
  setStore(reviews);
  return true;
}
