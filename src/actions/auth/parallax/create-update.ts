"use server";
import prisma from "@/lib/prisma";
import { Parallax } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../image/upload";

export const createUpdateParallax = async (formData: FormData) => {
  try {
    const siteId = process.env.SITE_ID!;
    const existingParallax = await prisma.parallax.findFirst({
      where: {
        siteId,
      },
    });

    let about: Parallax;
    let message = "";

    if (existingParallax) {
      about = await prisma.parallax.update({
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
      about = await prisma.parallax.create({
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

      await prisma.parallax.update({
        where: {
          id: about.id,
        },
        data: {
          imageUrl: uploadedImage!,
        },
      });
    }

    revalidatePath("/"); // Revalidate the homepage to update the cache

    return {
      ok: true,
      about,
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
