'use server';
import { FormInputs } from "@/components/ui/admin/about/FormAbout";
import prisma from "@/lib/prisma";

export const createUpdateAbout = async (data: FormInputs) => {
  const { title, description, imageUrl } = data;

  console.log({ title, description, imageUrl });

  try {
    const existingAbout = await prisma.aboutUs.findFirst();

    if (existingAbout) {
      await prisma.aboutUs.update({
        where: {
          id: existingAbout.id,
        },
        data: {
          title,
          description,
          imageUrl,
        },
      });
      return {
        ok: true,
        message: "Se actualizó correctamente",
      };
    } else {
      await prisma.aboutUs.create({
        data: {
          title,
          description,
          imageUrl,
        },
      });
      return {
        ok: true,
        message: "Se creó correctamente",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al actualizar o crear la configuración",
    };
  }
};
