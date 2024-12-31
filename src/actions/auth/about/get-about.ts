import prisma from '@/lib/prisma';


export const getSiteAbout = async (siteId: string) => {
  try {

    const siteAbout = await prisma.aboutUs.findFirst({
      where: {
        siteId: siteId,
      }
    });
    return siteAbout;
  } catch (error) {
    return null;
  }
};