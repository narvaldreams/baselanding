"use server";
import prisma from "@/lib/prisma";
import { AboutUs } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../image/upload";

export const createUpdateAbout = async (formData: FormData, siteId: string) => {
  try {

    const existingAbout = await prisma.aboutUs.findUnique({
      where: {
        siteId: siteId,
      },
    });

    let about: AboutUs;
    let message = "";

    if (existingAbout) {
      about = await prisma.aboutUs.update({
        where: {
          id: existingAbout.id,
          siteId: siteId,
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
          siteId: siteId,
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
          siteId: siteId,
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
