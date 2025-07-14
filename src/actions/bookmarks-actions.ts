"use server";

import { auth, firestore } from "@/firebase/server";
import { ShowSchema } from "@/validation/tmbdSchema";
import { cookies } from "next/headers";

export const getBookmarks = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return [];
  }

  const verifiedToken = await auth.verifyIdToken(token);

  if (!verifiedToken) {
    return [];
  }

  try {
    const bookmarkedSnapshot = await firestore
      .collection("bookmarked")
      .doc(verifiedToken.uid)
      .get();
    const bookmarkedData = Object.values(
      bookmarkedSnapshot.data() ?? {}
    ) as Array<ShowSchema>;
    return bookmarkedData;
  } catch {
    return [];
  }
};

export const addBookmarks = async (authToken: string, show: ShowSchema) => {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken) {
    throw new Error("Unauthorized for this action");
  }

  try {
    await firestore
      .collection("bookmarked")
      .doc(verifiedToken.uid)
      .set(
        {
          [show.id]: show,
        },
        { merge: true }
      );
  } catch {
    throw new Error("Failed to add bookmark");
  }
};
