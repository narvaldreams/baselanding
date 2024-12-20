"use server";

import prisma from "@/lib/prisma";

export const getDataPage = async () => {
  /* const siteSettings = await prisma.siteSettings.findFirst();
  const hero = await prisma.hero.findFirst();
  const aboutUs = await prisma.aboutUs.findFirst();
  const serviceSettings  = await prisma.serviceModule.findFirst();
  const services = await prisma.service.findMany();
  const parallax = await prisma.parallax.findFirst();
  const footer = await prisma.footer.findFirst(); */

  const [
    siteSettings,
    hero,
    aboutUs,
    serviceSettings,
    services,
    parallax,
    footer,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.hero.findFirst(),
    prisma.aboutUs.findFirst(),
    prisma.serviceModule.findFirst(),
    prisma.service.findMany(),
    prisma.parallax.findFirst(),
    prisma.footer.findFirst(),
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
