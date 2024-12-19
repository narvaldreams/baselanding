'use server';
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  serviceSettignsId: string;
}

export const getServices = async ({
  page = 1,
  take = 3,
  serviceSettignsId,
}: PaginationOptions) => {
  try {
    // Aseguramos que `serviceSettignsId` esté presente
    if (!serviceSettignsId) {
      return { services: [], totalPages: 0 };
    }

    const siteId = process.env.SITE_ID!; // Asegúrate de que SITE_ID esté en .env

    // Hacemos la consulta de los servicios con los parámetros de paginación
    const services = await prisma.service.findMany({
      take, // Usamos el valor de `take` desde los parámetros
      skip: (page - 1) * take, // Calcular la cantidad de servicios que se saltarán
      where: {
        siteId, // Filtro para el `siteId`
        serviceModuleId: serviceSettignsId, // Filtro por ID de servicio
      },
    });

    // Obtención del total de servicios disponibles para el módulo específico
    const totalCount = await prisma.service.count({
      where: {
        siteId,
        serviceModuleId: serviceSettignsId,
      },
    });

    // Calcular el número total de páginas
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      services,
    };
  } catch (error) {
    console.error("Error al obtener los servicios: ", error);
    throw new Error(`No se pudieron obtener los servicios para el serviceSettignsId: ${serviceSettignsId}`);
  }
};
