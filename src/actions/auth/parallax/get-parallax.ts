import prisma from '@/lib/prisma';


export const getParallax = async (siteId: string) => {
    try {
        const siteAbout = await prisma.parallax.findFirst({
            where: {
                siteId: siteId,
            }
        });
        return siteAbout;
    } catch (error) {
        return null;
    }
};