import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSessionCookie, SESSION_COOKIE_NAME } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await decryptSessionCookie(cookie);

  if (!session) {
    const url = new URL("/connexion", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
