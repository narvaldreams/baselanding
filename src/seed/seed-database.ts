import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {

  const siteId = process.env.SITE_ID;

  const userExisting = await prisma.user.findFirst({
    where: {
      siteId,
    }
  });

  if (userExisting) {
    throw new Error(`No se puede crear el usuario, Ya existe un usuario para el Sitio con el id: ${siteId}`)
  }

  // Insertar registros usuarios
  await prisma.user.createMany({
    data: initialData.users,
  });

}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
