import prisma from '@/lib/prisma';


export const getServices = async () => {
  try {
    const siteId = process.env.SITE_ID!;
    const services = await prisma.service.findMany({
      where: {
        siteId,
      }
    });
    if ( !services ) return null;
    return services;
  } catch ( error ) {
    return null;
  }
};