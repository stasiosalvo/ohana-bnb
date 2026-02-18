import { NextResponse } from "next/server";
import { getAllReviews, updateReviewStatus, deleteReview, type ReviewStatus } from "@/lib/reviews";

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
    const reviews = getAllReviews();
    return NextResponse.json(reviews);
  } catch (e) {
    console.error("GET /api/admin/reviews", e);
    return NextResponse.json(
      { error: "Errore nel caricamento." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id, status } = body as { id?: string; status?: ReviewStatus };
    if (!id || !status || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { error: "Parametri id e status (approved/rejected/pending) richiesti." },
        { status: 400 }
      );
    }
    const updated = updateReviewStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Recensione non trovata." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (e) {
    console.error("PATCH /api/admin/reviews", e);
    return NextResponse.json(
      { error: "Errore nell'aggiornamento." },
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
    const deleted = deleteReview(id);
    if (!deleted) {
      return NextResponse.json({ error: "Recensione non trovata." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/admin/reviews", e);
    return NextResponse.json(
      { error: "Errore nell'eliminazione." },
      { status: 500 }
    );
  }
}
