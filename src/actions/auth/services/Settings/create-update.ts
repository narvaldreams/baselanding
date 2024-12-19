"use server";
import prisma from "@/lib/prisma";
import { AboutUs, ServiceModule } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../../image/upload";

export const createUpdateServiceSettings = async (formData: FormData) => {
  try {
    const siteId = process.env.SITE_ID!;
    const existingAbout = await prisma.serviceModule.findFirst({
      where: {
        siteId,
      },
    });

    let serviceSettings: ServiceModule;
    let message = "";

    if (existingAbout) {
      serviceSettings = await prisma.serviceModule.update({
        where: {
          id: existingAbout.id,
        },
        data: {
          generalTitle: formData.get("generalTitle")!.toString(),
          generalDescription: formData.get("generalDescription")!.toString(),
        },
      });
      message = "Se actualizó correctamente";
    } else {
      serviceSettings = await prisma.serviceModule.create({
        data: {
          generalTitle: formData.get("generalTitle")!.toString(),
          generalDescription: formData.get("generalDescription")!.toString(),
          siteId,
        },
      });
      message = "Se creó correctamente";
    }

    const file = formData.get("imageUrl");
    if (file) {
      const uploadedImage = await uploadImage(file as File);

      await prisma.serviceModule.update({
        where: {
          id: serviceSettings.id,
        },
        data: {
          generalImageUrl: uploadedImage!,
        },
      });
    }

    revalidatePath("/"); // Revalidate the homepage to update the cache

    return {
      ok: true,
      serviceSettings,
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
