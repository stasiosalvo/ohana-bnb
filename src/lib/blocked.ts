/**
 * Date bloccate per camera (prenotazioni dirette, manutenzione, ecc.).
 * Stesso storage Redis delle recensioni; chiave separata.
 */

import { Redis } from "@upstash/redis";

export type RoomId = "sun" | "moon" | "earth";

export type BlockedPeriod = {
  id: string;
  roomId: RoomId;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  note?: string;
};

const STORAGE_KEY = "ohana_blocked";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url?.trim() || !token?.trim()) return null;
  return new Redis({ url: url.trim(), token: token.trim() });
}

function normalizeList(raw: unknown): BlockedPeriod[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) return raw as BlockedPeriod[];
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as BlockedPeriod[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export async function getAllBlocked(): Promise<BlockedPeriod[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const raw = await redis.get(STORAGE_KEY);
      return normalizeList(raw);
    } catch {
      return [];
    }
  }
  return [];
}

function datesOverlap(
  aIn: string,
  aOut: string,
  bIn: string,
  bOut: string
): boolean {
  const aInT = new Date(aIn).getTime();
  const aOutT = new Date(aOut).getTime();
  const bInT = new Date(bIn).getTime();
  const bOutT = new Date(bOut).getTime();
  return aInT < bOutT && aOutT > bInT;
}

export async function isPeriodBlocked(
  roomId: RoomId,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const list = await getAllBlocked();
  return list.some(
    (b) =>
      b.roomId === roomId &&
      datesOverlap(b.checkIn, b.checkOut, checkIn, checkOut)
  );
}

export async function addBlocked(
  roomId: RoomId,
  checkIn: string,
  checkOut: string,
  note?: string
): Promise<BlockedPeriod> {
  const list = await getAllBlocked();
  const id = `blk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const period: BlockedPeriod = { id, roomId, checkIn, checkOut, note };
  list.push(period);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // fallback in-memory non persistente
    }
  }
  return period;
}

export async function removeBlocked(id: string): Promise<boolean> {
  const list = await getAllBlocked();
  const filtered = list.filter((b) => b.id !== id);
  if (filtered.length === list.length) return false;
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(STORAGE_KEY, JSON.stringify(filtered));
    } catch {
      //
    }
  }
  return true;
}
