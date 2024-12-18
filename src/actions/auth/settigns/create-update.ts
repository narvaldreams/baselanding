"use server";
import prisma from "@/lib/prisma";
import { SiteSettings } from "@prisma/client";
import { uploadImage } from "../image/upload";
import { revalidatePath } from "next/cache";

export const createUpdateSettings = async (formData: FormData) => {
  try {
    const siteId = process.env.SITE_ID!;
    const existingSiteSettings = await prisma.siteSettings.findFirst({
      where: {
        siteId,
      },
    });

    let site: SiteSettings;
    let message = "";

    if (existingSiteSettings) {
      site = await prisma.siteSettings.update({
        where: {
          id: existingSiteSettings.id,
        },
        data: {
          siteName: formData.get("siteName")!.toString(),
          description: formData.get("description")!.toString(),
          facebookUrl: formData.get("facebookUrl")!.toString(),
          twitterUrl: formData.get("twitterUrl")!.toString(),
          instagramUrl: formData.get("instagramUrl")!.toString(),
          linkedinUrl: formData.get("linkedinUrl")!.toString(),
          youtubeUrl: formData.get("youtubeUrl")!.toString(),
          googleAnalyticsId: formData.get("googleAnalyticsId")!.toString(),
          googleTagManagerId: formData.get("googleTagManagerId")!.toString(),
        },
      });
      message = "Se actualizó correctamente";
    } else {
      site = await prisma.siteSettings.create({
        data: {
          siteName: formData.get("siteName")!.toString(),
          description: formData.get("description")!.toString(),
          facebookUrl: formData.get("facebookUrl")!.toString(),
          twitterUrl: formData.get("twitterUrl")!.toString(),
          instagramUrl: formData.get("instagramUrl")!.toString(),
          linkedinUrl: formData.get("linkedinUrl")!.toString(),
          youtubeUrl: formData.get("youtubeUrl")!.toString(),
          googleAnalyticsId: formData.get("googleAnalyticsId")!.toString(),
          googleTagManagerId: formData.get("googleTagManagerId")!.toString(),
          siteId,
        },
      });
      message = "Se creó correctamente";
    }

    const file = formData.get("imageUrl");
    if (file) {
      const uploadedImage = await uploadImage(file as File);

      await prisma.siteSettings.update({
        where: {
          id: site.id,
        },
        data: {
          siteLogoUrl: uploadedImage,
        },
      });
    }

    revalidatePath("/"); // Revalidate the homepage to update the cache

    return {
      ok: true,
      site,
      message,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar o crear la configuración",
    };
  }
};
