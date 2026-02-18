import { NextResponse } from "next/server";
import { applyDiscount } from "@/lib/discount";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.trim();
  const totalParam = searchParams.get("total");
  const total = totalParam != null ? Number(totalParam) : 0;

  if (!code || !Number.isFinite(total) || total <= 0) {
    return NextResponse.json({ valid: false });
  }

  const result = applyDiscount(code, total);
  if (!result.valid) {
    return NextResponse.json({ valid: false });
  }
  return NextResponse.json({
    valid: true,
    discountedTotal: result.discountedTotal,
    discountEur: result.discountEur,
    label: result.label,
  });
}
