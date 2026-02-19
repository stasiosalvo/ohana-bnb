import { NextResponse } from "next/server";
import {
  getAllBlocked,
  addBlocked,
  removeBlocked,
  type RoomId,
} from "@/lib/blocked";

function getAdminToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7).trim() || null;
}

function isAdmin(request: Request): boolean {
  const secret = process.env.REVIEW_ADMIN_SECRET?.trim();
  if (!secret) return false;
  return getAdminToken(request) === secret;
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }
  try {
    const list = await getAllBlocked();
    return NextResponse.json(list);
  } catch (e) {
    console.error("GET /api/admin/blocked", e);
    return NextResponse.json(
      { error: "Errore nel caricamento." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { roomId, checkIn, checkOut, note } = body as {
      roomId?: string;
      checkIn?: string;
      checkOut?: string;
      note?: string;
    };
    if (
      !roomId ||
      !checkIn ||
      !checkOut ||
      !["sun", "moon", "earth"].includes(roomId)
    ) {
      return NextResponse.json(
        { error: "roomId (sun|moon|earth), checkIn e checkOut (YYYY-MM-DD) richiesti." },
        { status: 400 }
      );
    }
    const period = await addBlocked(
      roomId as RoomId,
      checkIn,
      checkOut,
      note?.trim()
    );
    return NextResponse.json(period);
  } catch (e) {
    console.error("POST /api/admin/blocked", e);
    return NextResponse.json(
      { error: "Errore nell'aggiunta del blocco." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id } = body as { id?: string };
    if (!id) {
      return NextResponse.json(
        { error: "Parametro id richiesto." },
        { status: 400 }
      );
    }
    const ok = await removeBlocked(id);
    if (!ok) {
      return NextResponse.json(
        { error: "Blocco non trovato." },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/admin/blocked", e);
    return NextResponse.json(
      { error: "Errore nella rimozione." },
      { status: 500 }
    );
  }
}
