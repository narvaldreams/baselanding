import prisma from '@/lib/prisma';


export const getProfile = async () => {
  try {
    const siteId = process.env.SITE_ID!;
    const siteAbout = await prisma.user.findFirst( {
      where: {
        siteId,
      },
    } );
    return siteAbout;
  } catch ( error ) {
    return null;
  }
};