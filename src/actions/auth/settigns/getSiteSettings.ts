'use server';
import prisma from '@/lib/prisma';

export const getSiteSettings = async (siteId: string) => {
  try {
    const siteSettings = await prisma.siteSettings.findUnique({
      where: {
        siteId: siteId,
      }
    });
    return siteSettings;
  } catch (error) {
    return null;
  }
};