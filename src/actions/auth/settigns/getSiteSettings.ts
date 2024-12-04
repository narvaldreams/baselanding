'use server';
import prisma from '@/lib/prisma';

export const getSiteSettings = async () => {
  try {
    const siteSettings = await prisma.siteSettings.findFirst();
    return siteSettings;
  } catch (error) {
    return null;
  }
};