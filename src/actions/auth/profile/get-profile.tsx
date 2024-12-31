import prisma from '@/lib/prisma';


export const getProfile = async (siteId: string) => {
  try {
    const siteAbout = await prisma.user.findFirst( {
      where: {
        siteId: siteId,
      },
    } );
    return siteAbout;
  } catch ( error ) {
    return null;
  }
};