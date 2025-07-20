import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase/server";

export async function POST(req: NextRequest) {
  try {
    const { token, refreshToken } = await req.json();

    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userRecord = await auth.getUser(verifiedToken.uid);

    if (
      process.env.ADMIN_EMAIL === userRecord.email &&
      !userRecord.customClaims?.admin
    ) {
      await auth.setCustomUserClaims(verifiedToken.uid, {
        admin: true,
      });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("firebaseAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    response.cookies.set("firebaseAuthRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to set token: ${error.message}` },
      { status: 500 }
    );
  }
}
