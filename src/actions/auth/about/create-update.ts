'use server';
import prisma from "@/lib/prisma";
import { AboutUs } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const createUpdateAbout = async (formData: FormData) => {

  
  
  try {
    const existingAbout = await prisma.aboutUs.findFirst();

    let about: AboutUs;
    let message = '';

    if (existingAbout) {
      about = await prisma.aboutUs.update({
        where: {
          id: existingAbout.id,
        },
        data: {
          title: formData.get('title')!.toString(),
          description: formData.get('description')!.toString()
        },
      });
      message = 'Se actualizó correctamente';

      
    } else {
      
      about = await prisma.aboutUs.create({
        data: {
          title: formData.get('title')!.toString(),
          description: formData.get('description')!.toString()
        },
      });
      message = 'Se creó correctamente';
  
    } 

    const file = formData.get('imageUrl');
    const uploadedImage = await uploadImage(file as File);
    await prisma.aboutUs.update({
      where: {
        id: about.id,
      },
      data: {
        imageUrl: uploadedImage!
      }
    });

    return {
      ok: true,
      message
    };

    
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
