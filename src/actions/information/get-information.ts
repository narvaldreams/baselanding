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
    prisma.siteSettings.findUnique({
      where: {
        siteId: siteId,
      }
    }),
    prisma.hero.findUnique({
      where: {
        siteId: siteId,
      }
    }),
    prisma.aboutUs.findUnique({
      where: {
        siteId: siteId,
      }
    }),
    prisma.serviceModule.findUnique({
      where: {
        siteId: siteId,
      }
    }),
    prisma.service.findMany({
      where: {
        siteId: siteId,
      }
    }),
    prisma.parallax.findUnique({
      where: {
        siteId: siteId,
      }
    }),
    prisma.footer.findUnique({
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
