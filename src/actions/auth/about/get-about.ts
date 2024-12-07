import prisma from '@/lib/prisma';


export const getSiteAbout = async () => {
  try {
    const siteAbout = await prisma.aboutUs.findFirst();
    return siteAbout;
  } catch (error) {
    return null;
  }
};