"use client";

import { changePasswordUser } from "@/actions/auth/change-password";
import { logout } from "@/actions/auth/logout";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface FormInputs {
  password: string;
  confirmPassword: string;
}

interface Props {
  idUser: string;
}

export const FormChangePassword = ({ idUser }: Props) => {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    setMessage("");

    if (!isValid) return;
    const { ok, message } = await changePasswordUser(idUser, data.password);
    if (ok) {
      setMessage(message);
      setTimeout(async () => {
        setMessage("");
        await logout();
        window.location.replace( '/auth/login' );
      }, 2500);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!message) return;
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: message,
    });
  }, [message]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="grid gap-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Nueva Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa la contraseña"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-900"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirma la contraseña"
            {...register("confirmPassword", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>
      <div className="mt-5">
        <button
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-all"
          type="submit"
          disabled={loading}
        >
          {loading ? "Cargando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};
