import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("Refresh token API called");
  const redirect = request.nextUrl.searchParams.get("redirect");

  if (!redirect) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("firebaseAuthRefreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const respose = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      }
    );

    if (!respose.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const json = await respose.json();
    const newToken = json.id_token;
    cookieStore.set("firebaseAuthToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.redirect(new URL(redirect, request.url));
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};
