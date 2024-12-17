import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // Eliminar registros existentes
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.hero.deleteMany();
  await prisma.aboutUs.deleteMany();
  await prisma.service.deleteMany();
  await prisma.parallax.deleteMany();
  await prisma.footer.deleteMany();

  // Insertar registros usuarios
  await prisma.user.createMany({
    data: initialData.users,
  });

  await prisma.service.createMany({
    data: initialData.services,
  });

  // Insertar registros configuracion del sitio
  /* await prisma.siteSettings.create({
    data: initialData.siteSettings,
  }); */

  // Insertar registros hero
  /* await prisma.hero.create({
    data: initialData.hero,
  }); */

  // Insertar registros about us
  /* await prisma.aboutUs.create({
    data: initialData.aboutUs,
  }); */

  // Insertar registros servicios
  /* await prisma.service.createMany({
    data: initialData.services,
  }); */

  // Insertar registros parallax
  /* await prisma.parallax.create({
    data: initialData.parallax,
  }); */

  // Insertar registros footer
  /* await prisma.footer.create({
    data: initialData.footer,
  }); */
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
