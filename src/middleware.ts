import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get("firebaseAuthToken")?.value;

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return NextResponse.next();
  }

  if (
    token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decodedToken = decodeJwt(token);

  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    // Token is about to expire in less than 5 minutes
    return NextResponse.redirect(
      new URL(
        `/api/refresh-token?redirect=${encodeURIComponent(
          request.nextUrl.pathname
        )}`,
        request.url
      )
    );
  }

  if (
    !decodedToken.admin &&
    request.nextUrl.pathname.startsWith("/admin-dashboard")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/login",
    "/register",
    "/",
    "/movies",
    "/tvshows",
    "/bookmarks",
  ],
};
