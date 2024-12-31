"use server";

import prisma from "@/lib/prisma";
import { Footer } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createUpdateFooter = async (formData: FormData, siteId: string) => {
  try {

    const existingFooter = await prisma.footer.findFirst({
      where: {
        siteId: siteId,
      },
    });

    let footer: Footer;
    let message: string = "";

    if (existingFooter) {
      footer = await prisma.footer.update({
        where: { id: existingFooter.id, siteId: siteId, },
        data: {
          address: formData.get("address")!.toString(),
          email: formData.get("email")!.toString(),
          phoneNumber: formData.get("phoneNumber")!.toString(),
        },
      });
      message = "Se actualizó el pie de pagina con exito";
    } else {
      footer = await prisma.footer.create({
        data: {
          siteId: siteId,
          address: formData.get("address")!.toString(),
          email: formData.get("email")!.toString(),
          phoneNumber: formData.get("phoneNumber")!.toString(),
        },
      });
      message = "Se creo el pie de pagina con exito";
    }

    revalidatePath("/"); // Revalidate the homepage to update the cache

    return {
      ok: true,
      footer,
      message,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al actualizar o crear el footer",
    };
  }
};
