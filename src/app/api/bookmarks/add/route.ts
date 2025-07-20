import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "@/firebase/server";

export async function POST(req: NextRequest) {
  try {
    const { authToken, show } = await req.json();
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken) {
      return NextResponse.json(
        { error: "Unauthorized for this action" },
        { status: 401 }
      );
    }

    await firestore
      .collection("bookmarked")
      .doc(verifiedToken.uid)
      .set(
        {
          [show.id]: show,
        },
        { merge: true }
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to add bookmark" },
      { status: 500 }
    );
  }
}
