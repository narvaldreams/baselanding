import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      password_change_required: boolean;
      role: string;
      image: string;
      siteId: string;
    } & DefaultSession["user"];
  }
}
