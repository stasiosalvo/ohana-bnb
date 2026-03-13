/**
 * Codici sconto: configura in .env
 * - DISCOUNT_CODES=CODE1:10,CODE2:5e
 *   CODE:10 = 10% di sconto, CODE:5e = 5 euro di sconto
 * - DISCOUNT_LIMITS=CODE:10  (opzionale: codice valido solo per i primi N utilizzi)
 */

import { Redis } from "@upstash/redis";

export type DiscountResult = {
  valid: true;
  discountedTotal: number;
  discountEur: number;
  label: string;
} | { valid: false };

const DISCOUNT_USAGE_KEY = "ohana_discount_usage";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url?.trim() || !token?.trim()) return null;
  return new Redis({ url: url.trim(), token: token.trim() });
}

function parseDiscountLimits(): Map<string, number> {
  const raw = process.env.DISCOUNT_LIMITS?.trim();
  const map = new Map<string, number>();
  if (!raw) return map;
  for (const part of raw.split(",")) {
    const [code, val] = part.trim().split(":").map((s) => s.trim());
    if (!code || val === undefined) continue;
    const max = Number(val);
    if (Number.isFinite(max) && max > 0) map.set(code.toUpperCase(), max);
  }
  return map;
}

export async function getDiscountUsageCount(code: string): Promise<number> {
  const redis = getRedis();
  if (!redis) return 0;
  try {
    const raw = await redis.hget(DISCOUNT_USAGE_KEY, code.toUpperCase());
    return typeof raw === "number" ? raw : 0;
  } catch {
    return 0;
  }
}

export async function incrementDiscountUsage(code: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    const key = code.toUpperCase();
    await redis.hincrby(DISCOUNT_USAGE_KEY, key, 1);
  } catch {
    //
  }
}

export async function canUseDiscountCode(code: string): Promise<boolean> {
  const limits = parseDiscountLimits();
  const upper = code.toUpperCase();
  const maxUses = limits.get(upper);
  if (maxUses == null) return true;
  const count = await getDiscountUsageCount(upper);
  return count < maxUses;
}

function parseDiscountCodes(): Array<{ code: string; type: "percent"; value: number } | { code: string; type: "fixed"; value: number }> {
  const raw = process.env.DISCOUNT_CODES?.trim();
  if (!raw) return [];
  const list: Array<{ code: string; type: "percent"; value: number } | { code: string; type: "fixed"; value: number }> = [];
  for (const part of raw.split(",")) {
    const [code, val] = part.trim().split(":").map((s) => s.trim());
    if (!code || val === undefined) continue;
    const upper = code.toUpperCase();
    if (val.endsWith("e")) {
      const num = Number(val.slice(0, -1));
      if (Number.isFinite(num) && num > 0) list.push({ code: upper, type: "fixed", value: num });
    } else {
      const num = Number(val);
      if (Number.isFinite(num) && num > 0 && num <= 100) list.push({ code: upper, type: "percent", value: num });
    }
  }
  return list;
}

export function applyDiscount(
  codeInput: string | undefined,
  totalEur: number
): DiscountResult {
  if (!codeInput?.trim() || totalEur <= 0) {
    return { valid: false };
  }
  const codes = parseDiscountCodes();
  const upper = codeInput.trim().toUpperCase();
  const match = codes.find((c) => c.code === upper);
  if (!match) return { valid: false };

  let discountEur: number;
  let label: string;
  if (match.type === "percent") {
    discountEur = Math.round((totalEur * match.value) / 100 * 100) / 100;
    label = `${match.value}% di sconto`;
  } else {
    discountEur = Math.min(match.value, totalEur);
    label = `€${discountEur.toFixed(0)} di sconto`;
  }
  const discountedTotal = Math.max(0, totalEur - discountEur);
  return {
    valid: true,
    discountedTotal,
    discountEur,
    label,
  };
}
