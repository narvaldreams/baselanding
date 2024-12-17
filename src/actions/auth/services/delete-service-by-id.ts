'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export const deleteServiceById = async (id: string) => {
  try {
    const siteId = process.env.SITE_ID!;
    await prisma.service.delete({
      where: {
        id,
        siteId,
      },
    });
    revalidatePath('/');
    revalidatePath("/admin/services");

    return {
      ok: true,
      message: "Se ha eliminado el servicio correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al eliminar el servicio",
    };
  }
};
