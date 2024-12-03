import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
import async from "./app/admin/layout";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo en la base de datos

        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user) return null;

        // Comparar las contraseñas
        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch) return null;

        // Si son iguales, retornar el usuario
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ], // Add your providers here
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
