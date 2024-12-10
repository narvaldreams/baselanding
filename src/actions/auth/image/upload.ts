import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const uploadImage = async (image: File) => {
  try {
    if (!(image instanceof File)) {
      throw new Error("El archivo proporcionado no es válido");
    }

    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const response = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`
    );
    return response.secure_url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return null;
  }
};
