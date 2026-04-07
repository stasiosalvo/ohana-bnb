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

/** Prefisso ID per periodi importati dal calendario iCal di Booking.com (sostituiti ad ogni sync). */
export const BOOKING_ICAL_BLOCK_PREFIX = "bk_ical_";

export async function setAllBlocked(list: BlockedPeriod[]): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(STORAGE_KEY, JSON.stringify(list));
    } catch {
      //
    }
  }
}

/**
 * Sostituisce i blocchi importati da Booking (bk_ical_*) per le camere indicate.
 * Per una camera con `undefined` in `byRoom` mantiene i vecchi bk_ical di quella camera.
 * Non tocca prenotazioni sito (Stripe), blocchi manuali admin, ecc.
 */
export async function applyBookingIcalSync(
  byRoom: Partial<
    Record<
      RoomId,
      { checkIn: string; checkOut: string; uid: string }[]
    >
  >
): Promise<void> {
  const list = await getAllBlocked();
  const keptNonBooking = list.filter(
    (b) => !b.id.startsWith(BOOKING_ICAL_BLOCK_PREFIX)
  );
  const oldBookingBlocks = list.filter((b) =>
    b.id.startsWith(BOOKING_ICAL_BLOCK_PREFIX)
  );

  const rooms: RoomId[] = ["sun", "moon", "earth"];
  const next: BlockedPeriod[] = [...keptNonBooking];

  for (const roomId of rooms) {
    const periods = byRoom[roomId];
    if (periods === undefined) {
      next.push(...oldBookingBlocks.filter((b) => b.roomId === roomId));
      continue;
    }
    for (const p of periods) {
      const h = simpleHash(`${p.uid}|${p.checkIn}|${p.checkOut}`);
      next.push({
        id: `${BOOKING_ICAL_BLOCK_PREFIX}${roomId}_${h}`,
        roomId,
        checkIn: p.checkIn,
        checkOut: p.checkOut,
        note: "Booking.com (sync)",
      });
    }
  }

  await setAllBlocked(next);
}

function simpleHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}
