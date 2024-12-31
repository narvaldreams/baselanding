"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export const updateProfile = async (formData: FormData, siteId: string) => {
  try {

    await prisma.user.update({
      where: {
        id: formData.get("id")!.toString(),
        siteId: siteId,
      },
      data: {
        name: formData.get("name")!.toString(),
        email: formData.get("email")!.toString(),
        password: bcrypt.hashSync(formData.get("password")!.toString()),
      },
    });
    
    revalidatePath("/admin/profile"); // Revalidate the homepage to update the cache

    return {
      ok: true,
      message: "Perfil actualizado correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar el perfil",
    };
  }
};
