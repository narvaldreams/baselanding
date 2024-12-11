"use server";
import prisma from "@/lib/prisma";
import { AboutUs } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../image/upload";

export const createUpdateAbout = async (formData: FormData) => {
  try {
    const siteId = process.env.SITE_ID!;
    const existingAbout = await prisma.aboutUs.findFirst({
      where: {
        siteId,
      },
    });

    let about: AboutUs;
    let message = "";

    if (existingAbout) {
      about = await prisma.aboutUs.update({
        where: {
          id: existingAbout.id,
        },
        data: {
          title: formData.get("title")!.toString(),
          description: formData.get("description")!.toString(),
        },
      });
      message = "Se actualizó correctamente";
    } else {
      about = await prisma.aboutUs.create({
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

      await prisma.aboutUs.update({
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
