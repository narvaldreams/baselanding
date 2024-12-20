"use server";
import prisma from "@/lib/prisma";
import { Hero } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../image/upload";

export const createUpdateHero = async (formData: FormData) => {
  try {
    const siteId = process.env.SITE_ID!;
    const existingHero = await prisma.hero.findFirst({
      where: {
        siteId,
      },
    });

    let about: Hero;
    let message = "";

    if (existingHero) {
      about = await prisma.hero.update({
        where: {
          id: existingHero.id,
        },
        data: {
          title: formData.get("title")!.toString(),
          content: formData.get("content")!.toString(),
          /* heroUrl: formData.get("heroUrl")!.toString(), */
          textButton: formData.get("textButton")!.toString(),
        },
      });
      message = "Se actualizó correctamente";
    } else {
      about = await prisma.hero.create({
        data: {
          title: formData.get("title")!.toString(),
          content: formData.get("content")!.toString(),
          /* heroUrl: formData.get("heroUrl")!.toString(), */
          textButton: formData.get("textButton")!.toString(),
          siteId,
        },
      });
      message = "Se creó correctamente";
    }

    const file = formData.get("imageUrl");
    if (file) {
      const uploadedImage = await uploadImage(file as File);

      await prisma.hero.update({
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
