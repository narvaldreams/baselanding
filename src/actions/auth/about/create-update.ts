'use server';
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const createUpdateAbout = async (formData: FormData) => {

  
  
  try {
    const file = formData.get('imageUrl');
    
    console.log(formData.get('title'));

    const uploadedImage = await uploadImage(file as File);

    const existingAbout = await prisma.aboutUs.findFirst();

    if (existingAbout) {
      await prisma.aboutUs.update({
        where: {
          id: existingAbout.id,
        },
        data: {
          title: formData.get('title')!.toString(),
          description: formData.get('description')!.toString()
        },
      });

      return {
        ok: true,
        message: "Se actualizó correctamente",
      };
    } else {
      await prisma.aboutUs.create({
        data: {
          title: formData.get('title')!.toString(),
          description: formData.get('description')!.toString()
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
