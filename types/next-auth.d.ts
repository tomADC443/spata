
import NextAuth from "next-auth"

declare module "next-auth" {

  interface Session {
    user: {
      id: string,
      given_name: string,
      last_name: string,
      email: string,
      image: string,
    },
  }
}