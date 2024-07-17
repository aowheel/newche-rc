import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from './lib/prisma';
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    session: ({ session, token }) => {
      if (!token.sub) return session;
      session.user.id = token.sub;
      return session;
    },
  },
});
