import prisma from '@/lib/prisma';


export const getParallax = async () => {
    try {
        const siteId = process.env.SITE_ID!;
        const siteAbout = await prisma.parallax.findFirst({
            where: {
                siteId
            }
        });
        return siteAbout;
    } catch (error) {
        return null;
    }
};