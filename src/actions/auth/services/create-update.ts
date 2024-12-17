"use server";
import prisma from "@/lib/prisma";
import { Service } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../image/upload";

export const createUpdateService = async (formData: FormData) => {
  try {
    const siteId = process.env.SITE_ID!;
    console.log(formData.get("id")!.toString());
    const existingParallax = await prisma.service.findUnique({
      where: {
        id: formData.get("id")!.toString(),
        siteId,
      },
    });

    let service: Service;
    let message = "";

    if (existingParallax) {
      service = await prisma.service.update({
        where: {
          id: existingParallax.id,
        },
        data: {
          title: formData.get("title")!.toString(),
          description: formData.get("description")!.toString(),
        },
      });
      message = "Se actualizó correctamente";
    } else {
        service = await prisma.service.create({
        data: {
          title: formData.get("title")!.toString(),
          description: formData.get("description")!.toString(),
          siteId,
        },
      });
      message = "Se creó correctamente";
    }

    const file = formData.get("imageUrl");
    if (file) {
      const uploadedImage = await uploadImage(file as File);

      await prisma.service.update({
        where: {
          id: service.id,
        },
        data: {
            mediaUrl: uploadedImage!,
        },
      });
    }

    revalidatePath("/"); // Revalidate the homepage to update the cache

    return {
      ok: true,
      service,
      message,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error al actualizar o crear la configuración",
    };
  }
};
