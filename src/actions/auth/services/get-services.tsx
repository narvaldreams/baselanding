import prisma from '@/lib/prisma';


export const getServices = async () => {
  try {
    const services = await prisma.service.findMany();
    if ( !services ) return null;
    return services;
  } catch ( error ) {
    return null;
  }
};