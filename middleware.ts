import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { z } from "zod";

export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest) {
  const youngestPeriod = 58;  // 1年生の期(毎年度変更)

  const url = request.nextUrl;
  const response = NextResponse.next();
  const isJustOnInternal = url.pathname === "/internal";
  const isOnInternal = url.pathname.startsWith("/internal");
  const isOnActive = url.pathname.startsWith("/internal/active");
  const isOnAlumni = url.pathname.startsWith("/internal/alumni");
  const displayName = request.cookies.get("displayName")?.value;
  const period = request.cookies.get("period")?.value;
  if (isOnInternal) {
    if (!displayName) {
      return NextResponse.redirect(new URL("/signin", request.url));
    } else {
      const intPeriod = z.coerce.number().int().safeParse(period);
      if (intPeriod.success) {
        if (isJustOnInternal) {
          if (intPeriod.data >= youngestPeriod - 6) {
            return NextResponse.redirect(new URL("/internal/active", request.url));
          } else {
            return NextResponse.redirect(new URL("/internal/alumni", request.url));
          }
        } else if (isOnActive) {
          if (intPeriod.data >= youngestPeriod - 6) {
            return response;
          } else {
            return NextResponse.redirect(new URL("/internal/alumni", request.url));
          }
        } else if (isOnAlumni) {
          if (intPeriod.data >= youngestPeriod - 6) {
            return NextResponse.redirect(new URL("/internal/active", request.url));
          } else {
            return response;
          }
        }
      }
    }
  } 
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
