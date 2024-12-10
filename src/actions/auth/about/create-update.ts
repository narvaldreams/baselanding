'use server';
import { FormInputs } from "@/components/ui/admin/about/FormAbout";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const aboutSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
})

export const createUpdateAbout = async (formData: FormData) => {

  const data = Object.fromEntries(formData);
  const aboutParsed = aboutSchema.safeParse(data);

  try {
    const file = formData.get('imageUrl');

    const uploadedImage = await uploadImage(file as File);
    console.log('URL de la imagen subida:', uploadedImage);
    /* const existingAbout = await prisma.aboutUs.findFirst();

    if (existingAbout) {
      await prisma.aboutUs.update({
        where: {
          id: existingAbout.id,
        },
        data: {
          title,
          description
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
          description
        },
      });

      const image = uploadImages(form);
      return {
        ok: true,
        message: "Se creó correctamente",
      };
    } */
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al actualizar o crear la configuración",
    };
  }
};


const uploadImage = async (image: File) => {
  try {
    if (!(image instanceof File)) {
      throw new Error('El archivo proporcionado no es válido');
    }

    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    const response = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`);
    return response.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    return null;
  }
};
