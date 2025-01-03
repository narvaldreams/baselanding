import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
import siteId from "./utils/getSiteId";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login"
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
            siteId: siteId,
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
  cookies: {
    sessionToken: {
      name: `next-auth.session-token.${siteId}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url.${siteId}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      }
    },
    csrfToken: {
      name: `next-auth.csrf-token.${siteId}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      }
    }
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
