"use server";
import prisma from "@/lib/prisma";

export const getFooter = async () => {
  try {
    const siteId = process.env.SITE_ID!;
    const siteAbout = await prisma.footer.findFirst({
      where: {
        siteId,
      },
    });
    return siteAbout;
  } catch (error) {
    return null;
  }
};
