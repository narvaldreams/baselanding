import prisma from "@/lib/prisma";

export const getHero = async () => {
  try {
    const siteId = process.env.SITE_ID!;
    const hero = await prisma.hero.findFirst({
      where: {
        siteId,
      },
    });
    return hero;
  } catch (error) {
    return null;
  }
};
