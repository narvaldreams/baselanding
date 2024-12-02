'use client';

import { authenticate } from '@/actions/auth/login';
import Link from 'next/link';
import { useActionState } from 'react';

export const LoginForm = () => {


  const [ errorMessage, formAction, isPending ] = useActionState(
    authenticate,
    undefined,
  );


  return (
    <form action={ formAction } className="text-start">
      <div className="grid grid-cols-1">
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginEmail">Email:</label>
          <input id="LoginEmail" type="email" name="email" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="name@example.com" />
        </div>

        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginPassword">Contraseña:</label>
          <input id="LoginPassword" type="password" name="password" className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0" placeholder="Password:" />
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex items-center mb-0">
            <input className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe" />
            <label className="form-checkbox-label text-slate-400" htmlFor="RememberMe">Remember me</label>
          </div>
          {/* <p className="text-slate-400 mb-0"><Link href="/auth-re-password" className="text-slate-400">Forgot password ?</Link></p> */ }
        </div>

        <div className="mb-4">
          <button type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full">Ingresar</button>
        </div>

        <div className="text-center">
          <span className="text-slate-400 me-2">¿No tienes una cuenta?</span> <Link href="#" className="btn btn-primary  text-black font-bold inline-block">Inscribirse</Link>
        </div>
      </div>
    </form>
  );
};