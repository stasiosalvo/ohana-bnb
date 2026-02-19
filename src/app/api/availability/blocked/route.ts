import { NextResponse } from "next/server";
import { getAllBlocked } from "@/lib/blocked";

export async function GET() {
  try {
    const list = await getAllBlocked();
    return NextResponse.json(list);
  } catch (e) {
    console.error("GET /api/availability/blocked", e);
    return NextResponse.json([], { status: 200 });
  }
}
