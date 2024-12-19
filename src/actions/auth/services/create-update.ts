"use server";
import prisma from "@/lib/prisma";
import { Service } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../image/upload";

export const createUpdateService = async (
  formData: FormData,
  serviceSettingsId: string
) => {
  try {
    const siteId = process.env.SITE_ID!;
    const serviceId = formData.get("id")?.toString();

    let service: Service;
    let message = "";

    if (serviceId) {
      const existingService = await prisma.service.findUnique({
        where: {
          id: serviceId,
          serviceModuleId: serviceSettingsId,
          siteId,
        },
      });

      if (existingService) {
        service = await prisma.service.update({
          where: {
            id: existingService.id,
            serviceModuleId: serviceSettingsId,
          },
          data: {
            title: formData.get("title")!.toString(),
            description: formData.get("description")!.toString(),
            serviceUrl: formData.get("serviceUrl")!.toString(),
          },
        });
        message = "Se actualizó correctamente";
      } else {
        service = await prisma.service.create({
          data: {
            title: formData.get("title")!.toString(),
            description: formData.get("description")!.toString(),
            serviceUrl: formData.get("serviceUrl")!.toString(),
            serviceModuleId: serviceSettingsId,
            siteId,
          },
        });
        message = "Se creó correctamente";
      }
    } else {
      service = await prisma.service.create({
        data: {
          title: formData.get("title")!.toString(),
          description: formData.get("description")!.toString(),
          serviceUrl: formData.get("serviceUrl")!.toString(),
          serviceModuleId: serviceSettingsId,
          siteId,
        },
      });
      message = "Se creó correctamente";
    }

    const file = formData.get("imageUrl");
    if (file) {
      const uploadedImage = await uploadImage(file as File);

      await prisma.service.update({
        where: {
          id: service.id,
          serviceModuleId: serviceSettingsId,
        },
        data: {
          mediaUrl: uploadedImage!,
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/services");

    return {
      ok: true,
      service,
      message,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error al actualizar o crear la configuración",
    };
  }
};
