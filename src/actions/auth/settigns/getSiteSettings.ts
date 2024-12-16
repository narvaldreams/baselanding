'use server';
import prisma from '@/lib/prisma';

export const getSiteSettings = async () => {
  try {
    const siteId = process.env.SITE_ID!;
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