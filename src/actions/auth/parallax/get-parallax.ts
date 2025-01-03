import prisma from '@/lib/prisma';


export const getParallax = async (siteId: string) => {
    try {
        const siteAbout = await prisma.parallax.findUnique({
            where: {
                siteId: siteId,
            }
        });
        return siteAbout;
    } catch (error) {
        return null;
    }
};