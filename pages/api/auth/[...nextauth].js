import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import config from "../../../config";
import { PrismaClient } from "@prisma/client";
import { parseConfigFileTextToJson } from "typescript";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: config.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: config.JWT_SECRET,
  },
  pages: {},

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified;
      }
      return false;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (profile) {
        // profile is only passed the first time this callback is called on a new session
        const prisma = new PrismaClient();

        const result = await prisma.user.upsert({
          where: {
            providerId: profile.sub,
          },
          create: {
            providerId: profile.sub,
            given_name: profile.given_name,
            last_name: profile.family_name,
            email: profile.email,
            image: profile.picture,
          },
          update: {
            given_name: profile.given_name,
            last_name: profile.family_name,
            email: profile.email,
            image: profile.picture,
          },
        });

        token.id = result.id
      }
  
      return token;
    },
    async session({ session, user, token }) {
      session.user.id = token.id || null;
      session.user.picture = token.picture;

      return session;
    },
  },
});
