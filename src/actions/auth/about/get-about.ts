import prisma from '@/lib/prisma';


export const getSiteAbout = async () => {
  try {
    const siteId = process.env.SITE_ID!;
    const siteAbout = await prisma.aboutUs.findFirst({
      where: {
        siteId
      }
    });
    return siteAbout;
  } catch (error) {
    return null;
  }
};