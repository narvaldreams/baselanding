"use server";
import prisma from "@/lib/prisma";

export const getServiceById = async (id: string, serviceSettingsId: string) => {
  try {
    if (id === 'crear') return null;
    const siteId = process.env.SITE_ID!;
    const service = await prisma.service.findUnique({
      where: {
        id,
        siteId,
        serviceModuleId: serviceSettingsId,
      },
    });

    return {
      ok: true,
      service,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener el servicio",
    };
  }
};
