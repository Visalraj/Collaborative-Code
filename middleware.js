import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Not logged in: allow everything matched by config
  if (!token) {
  const url = req.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.rewrite(url);
  }

  // Logged in: allow home and rooms too
  if (pathname === "/" || pathname.startsWith("/room")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/room/:path*"],
};
