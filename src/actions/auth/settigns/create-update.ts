'use server';
import { FormInputs } from "@/components/ui/admin/settings/FormSettings";
import prisma from "@/lib/prisma";

export const createUpdateSettings = async (data: FormInputs) => {
  const {
    siteName,
    siteLogoUrl,
    description,
    googleAnalyticsId,
    googleTagManagerId,
  } = data;

  try {
    const existingSiteSettings = await prisma.siteSettings.findFirst();

    if (existingSiteSettings) {
      await prisma.siteSettings.update({
        where: {
          id: existingSiteSettings.id,
        },
        data: {
          siteName,
          siteLogoUrl: "hola.png",
          description,
          googleAnalyticsId,
          googleTagManagerId,
        },
      });
      return {
        ok: true,
        message: "Configuración actualizada correctamente",
      };
    } else {
      await prisma.siteSettings.create({
        data: {
          siteName,
          siteLogoUrl: "hola.png",
          description,
          googleAnalyticsId,
          googleTagManagerId,
        },
      });
      return {
        ok: true,
        message: "Configuración creada correctamente",
      };
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar o crear la configuración",
    };
  }
};
