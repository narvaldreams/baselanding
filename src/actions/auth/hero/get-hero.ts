import prisma from "@/lib/prisma";

export const getHero = async (siteId: string) => {
  try {
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
