/**
 * Codici sconto: configura in .env DISCOUNT_CODES=CODE1:10,CODE2:5e
 * - CODE:10 = 10% di sconto
 * - CODE:5e = 5 euro di sconto (suffisso "e")
 */

export type DiscountResult = {
  valid: true;
  discountedTotal: number;
  discountEur: number;
  label: string;
} | { valid: false };

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
