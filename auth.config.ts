import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import "next-auth/jwt";

const authConfig = {
  pages: {
    signIn: "/settings"
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isSignedIn = !!auth?.user;
      const isOnInternal = nextUrl.pathname.startsWith('/internal');
      if (isOnInternal) {
        if (isSignedIn) return true;
        return false;
      }
      return true;
    },
  },
  providers: [Google]
} satisfies NextAuthConfig;

export default authConfig;
