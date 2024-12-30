'use server';
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const changePasswordUser = async (idUser: string, newPassword: string) => {

    try {

        const userExisting = await prisma.user.findUnique({
            where: {
                id: idUser,
            }
        });

        if (!userExisting) {
            return {
                ok: false,
                message: 'Usuario no encontrado, Comuniquese con el administrador'
            }
        }

        await prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                password: bcrypt.hashSync(newPassword),
                password_change_required: false,
            }
        })

        return {
            ok: true,
            message: 'Contraseña actualizada, Por favor ingresar nuevamente.',
        }

    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo actualizar la contraseña, Comuniquese con el administrador'
        }
    }

}