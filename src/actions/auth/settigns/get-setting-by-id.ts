"use server";
import prisma from "@/lib/prisma";

export const getSettingById = async (id: string) => {
  try {
    const setting = await prisma.siteSettings.findUnique({
      where: {
        id,
      },
    });
    return setting;
  } catch (error) {
    return null;
  }
};
