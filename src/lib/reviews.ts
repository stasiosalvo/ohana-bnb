/**
 * Store recensioni: Upstash Redis se configurato (persistente su Vercel),
 * altrimenti in-memory (solo per sviluppo locale).
 *
 * Per abilitare Redis su Vercel:
 * - Aggiungi "Redis" da Vercel Storage (Upstash) al progetto
 * - Oppure crea un database su upstash.com e imposta:
 *   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 */

import { Redis } from "@upstash/redis";

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

// In-memory fallback (quando Redis non è configurato)
let memoryStore: Review[] = [];

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url?.trim() || !token?.trim()) return null;
  return new Redis({ url: url.trim(), token: token.trim() });
}

function normalizeStore(raw: unknown): Review[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) return raw as Review[];
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as Review[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

async function getStore(): Promise<Review[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const raw = await redis.get(STORAGE_KEY);
      return normalizeStore(raw);
    } catch {
      return memoryStore;
    }
  }
  return memoryStore;
}

async function setStore(reviews: Review[]): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(STORAGE_KEY, JSON.stringify(reviews));
      return;
    } catch {
      // fallback: scrivi anche in memoria
    }
  }
  memoryStore = reviews;
}

export async function getAllReviews(): Promise<Review[]> {
  const store = await getStore();
  return [...store];
}

export async function getApprovedReviews(): Promise<Review[]> {
  const store = await getStore();
  return store
    .filter((r) => r.status === "approved")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPendingReviews(): Promise<Review[]> {
  const store = await getStore();
  return store.filter((r) => r.status === "pending");
}

export async function addReview(
  data: { name: string; text: string; rating: number }
): Promise<Review> {
  const reviews = await getStore();
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
  await setStore(reviews);
  return review;
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<Review | null> {
  const reviews = await getStore();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reviews[index] = { ...reviews[index], status };
  await setStore(reviews);
  return reviews[index];
}

export async function getReviewById(id: string): Promise<Review | null> {
  const store = await getStore();
  return store.find((r) => r.id === id) ?? null;
}

export async function deleteReview(id: string): Promise<boolean> {
  const reviews = await getStore();
  const filtered = reviews.filter((r) => r.id !== id);
  if (filtered.length === reviews.length) return false;
  await setStore(filtered);
  return true;
}
