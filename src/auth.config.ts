import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        console.log({ email, password });

        // Buscar el correo en la base de datos

        // Comparar las contraseñas

        // Si son iguales, retornar el usuario

        return null;
      },
    }),
  ], // Add your providers here
};

export const { auth, signIn, signOut } = NextAuth(authConfig);
