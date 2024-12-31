"use server";
import { signIn } from "@/auth.config";
import prisma from "@/lib/prisma";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: { ok: boolean; message: string },
  formData: FormData
) {
  try {

    await prisma.$connect();

    const result = await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    if (result?.error) {
      // Error desde NextAuth
      return { ok: false, message: result.error };
    }

    return { ok: true, message: "Login successful." };

  } catch (error) {
    
    // Manejar errores específicos o genéricos
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { ok: false, message: "Credenciales Invalidas." };
        default:
          return { ok: false, message: "Error de autenticación inesperado." };
      }
    }

    return { ok: false, message: "Ha ocurrido un error inesperado, Por favor validar con el administrador." };
  }
}
