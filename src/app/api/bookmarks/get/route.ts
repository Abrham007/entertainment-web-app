import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "@/firebase/server";
import { ShowSchema } from "@/validation/tmbdSchema";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("firebaseAuthToken")?.value;

  if (!token) {
    return NextResponse.json([]);
  }

  const verifiedToken = await auth.verifyIdToken(token);

  if (!verifiedToken) {
    return NextResponse.json([]);
  }

  try {
    const bookmarkedSnapshot = await firestore
      .collection("bookmarked")
      .doc(verifiedToken.uid)
      .get();
    const bookmarkedData = Object.values(
      bookmarkedSnapshot.data() ?? {}
    ) as Array<ShowSchema>;
    return NextResponse.json(bookmarkedData);
  } catch {
    return NextResponse.json([]);
  }
}
