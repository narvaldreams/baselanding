"use server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

interface Contact {
  fullName: string;
  email: string;
  phoneNumber: string;
  description: string;
}

export const saveContactForm = async ({
  fullName,
  email,
  phoneNumber,
  description,
}: Contact) => {
  // Obtener el ID del sitio
  const siteId = process.env.SITE_ID!;

  const siteSettings = await prisma.siteSettings.findFirst({
    where: {
      siteId,
    },
  });

  try {
    const existingContact = await prisma.registrationForm.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingContact) {
      await prisma.registrationForm.create({
        data: {
          fullName,
          email,
          phoneNumber,
          description,
          siteId,
        },
      });
      if (siteSettings?.emailSite) {
        await sendEmailToSite(
          email,
          fullName,
          email,
          phoneNumber,
          description,
          siteSettings.emailSite
        );
      }
      return {
        ok: true,
        message: "El correo fue registrado correctamente",
      };
    }
    return {
      ok: false,
      message: "El correo ya fue registrado",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al registrar el correo, Contacte con el administrador",
    };
  }
};

// Función para enviar el correo
const sendEmailToSite = async (
  siteEmail: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  description: string,
  emailSite: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailSite,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // Configurar el correo
  const mailOptions = {
    from: siteEmail,
    to: emailSite,
    subject: "Nuevo mensaje del formulario de contacto",
    text: `
      Tienes un nuevo mensaje de contacto:

      Nombre completo: ${fullName}
      Email: ${email}
      Teléfono: ${phoneNumber}
      Descripción: ${description}
    `,
  };

  // Enviar el correo
  await transporter.sendMail(mailOptions);
};
