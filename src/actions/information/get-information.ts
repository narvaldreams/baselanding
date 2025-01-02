"use server";

import prisma from "@/lib/prisma";
import siteId from "@/utils/getSiteId";

export const getDataPage = async () => {
  const [
    siteSettings,
    hero,
    aboutUs,
    serviceSettings,
    services,
    parallax,
    footer,
  ] = await Promise.all([
    prisma.siteSettings.findFirst({
      where: {
        siteId: siteId,
      }
    }),
    prisma.hero.findFirst({
      where: {
        siteId: siteId,
      }
    }),
    prisma.aboutUs.findFirst({
      where: {
        siteId: siteId,
      }
    }),
    prisma.serviceModule.findFirst({
      where: {
        siteId: siteId,
      }
    }),
    prisma.service.findMany({
      where: {
        siteId: siteId,
      }
    }),
    prisma.parallax.findFirst({
      where: {
        siteId: siteId,
      }
    }),
    prisma.footer.findFirst({
      where: {
        siteId: siteId,
      }
    }),
  ]);

  return {
    siteSettings,
    hero,
    aboutUs,
    serviceSettings,
    services,
    parallax,
    footer,
  };
};
