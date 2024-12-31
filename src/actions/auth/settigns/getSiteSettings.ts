'use server';
import prisma from '@/lib/prisma';

export const getSiteSettings = async (siteId: string) => {
  try {
    const siteSettings = await prisma.siteSettings.findFirst({
      where: {
        siteId,
      }
    });
    return siteSettings;
  } catch (error) {
    return null;
  }
};