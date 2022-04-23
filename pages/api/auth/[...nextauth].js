import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import config from "../../../config";

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
      return token;
    },
    async session({ session, user, token }) {
      session.user.id = token.sub;
      session.user.picture = token.picture;
      
      return session;
    },
  },
});
