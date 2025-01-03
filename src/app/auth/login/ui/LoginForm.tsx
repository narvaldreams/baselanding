"use client";

import { authenticate } from "@/actions/auth/login";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [response, formAction, isPending] = useActionState(authenticate, {
    ok: false,
    message: "",
  });
  
  const router = useRouter();

  useEffect(() => {
    if (response.ok) {
      router.replace("/admin");
    }
  }, [response.ok]);

  return (
    <form action={formAction} className="text-start">
      <div className="grid grid-cols-1">
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginEmail">
            Email:
          </label>
          <input
            id="LoginEmail"
            type="email"
            name="email"
            className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
            placeholder="name@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginPassword">
            Contraseña:
          </label>
          <input
            id="LoginPassword"
            type="password"
            name="password"
            className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
            placeholder="Password:"
          />
        </div>

        {!response.ok && response.message !== "" && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{response.message}</p>
          </div>
        )}

        <div className="mb-4">
          <button
            disabled={isPending}
            type="submit"
            className={clsx({
              "py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full":
                !isPending,
              "py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-600 border-gray-600 text-white rounded-md w-full disabled:bg-gray-600 disabled:border-gray-600 disabled:text-white":
                isPending,
            })}
          >
            {isPending ? "Cargando..." : "Ingresar"}
          </button>
        </div>
      </div>
    </form>
  );
};
