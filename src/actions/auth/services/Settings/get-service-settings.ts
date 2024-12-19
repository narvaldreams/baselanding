"use server";
import prisma from "@/lib/prisma";

export const getServiceSettings = async () => {
  try {
    const siteId = process.env.SITE_ID!;
    const serviceSettings = await prisma.serviceModule.findFirst({
      where: {
        siteId,
      },
    });
    return serviceSettings;
  } catch (error) {
    throw new Error("No se pudo obtener la configuración del sitio");
  }
};
