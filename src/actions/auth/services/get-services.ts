"use server";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getServices = async ({
  page = 1,
  take = 3,
}: PaginationOptions) => {
  try {
    const siteId = process.env.SITE_ID!;
    const services = await prisma.service.findMany({
      take: 3,
      skip: (page - 1) * take,
      where: {
        siteId,
      },
    });

    if (!services) throw new Error("No se pudo obtener los servicios");

    const totalCount = await prisma.service.count({
      where: {
        siteId,
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
