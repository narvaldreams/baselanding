"use server";
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
    const siteId = process.env.SITE_ID!;
    const services = await prisma.service.findMany({
      take: 3,
      skip: (page - 1) * take,
      where: {
        siteId,
        serviceModuleId: serviceSettignsId,
      },
    });

    if (!services) throw new Error("No se pudo obtener los servicios");

    const totalCount = await prisma.service.count({
      where: {
        siteId,
        serviceModuleId: serviceSettignsId,
      },
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      services,
    };
  } catch (error) {
    throw new Error("No se pudo obtener los servicios");
  }
};
