import { NextResponse } from "next/server";
import {
  getApprovedReviews,
  addReview,
  type Review,
} from "@/lib/reviews";

export async function GET() {
  try {
    const reviews = getApprovedReviews();
    return NextResponse.json(reviews);
  } catch (e) {
    console.error("GET /api/reviews", e);
    return NextResponse.json(
      { error: "Errore nel caricamento delle recensioni." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, text, rating } = body as {
      name?: string;
      text?: string;
      rating?: number;
    };
    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json(
        { error: "Nome e messaggio sono obbligatori." },
        { status: 400 }
      );
    }
    const review = addReview({
      name: name.trim(),
      text: text.trim(),
      rating: typeof rating === "number" ? rating : 5,
    });
    return NextResponse.json(review);
  } catch (e) {
    console.error("POST /api/reviews", e);
    return NextResponse.json(
      { error: "Errore nell'invio della recensione." },
      { status: 500 }
    );
  }
}
