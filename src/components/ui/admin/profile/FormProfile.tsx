'use client';
import { createUpdateParallax } from "@/actions/auth/parallax/create-update";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Spinner } from '../spinner/Spinner';
import { updateProfile } from '@/actions/auth/profile/update-profile';

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface Props {
  profile: Profile;
  siteId: string,
}

export const FormProfile = ( { profile, siteId }: Props ) => {

  const [ loaded, setLoaded ] = useState( false );

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInputs>();

  const [ message, setMessage ] = useState<string>( "" );
  const [ loading, setLoading ] = useState<boolean>( false );

  const onSubmit = async ( data: FormInputs ) => {
    setLoading( true );
    setMessage( "" );

    const { name, email, password } = data;

    const formData = new FormData();

    formData.append( "id", profile.id );
    formData.append( "name", name );
    formData.append( "email", email );
    formData.append( "password", password );

    const { message, ok } = await updateProfile( formData, siteId );

    if ( ok ) {
      setMessage( message );
      setTimeout( () => {
        setMessage( "" );
      }, 3000 );
    }
    setLoading( false );
  };

  useEffect( () => {
    if ( profile ) {
      setValue( "name", profile.name );
      setValue( "email", profile.email );
    }
  }, [] );

  useEffect( () => {
    if ( !message ) return;
    const Toast = Swal.mixin( {
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: ( toast ) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    } );
    Toast.fire( {
      icon: "success",
      title: message,
    } );
  }, [ message ] );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded ) {
    return <Spinner />;
  }

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Perfil</h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Aca puedes configurar la información sobre tu perfil.
      </p>

      { message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p> }

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Nombre completo
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="name"
              placeholder="Ingresa el titulo"
              { ...register( "name", { required: true } ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              placeholder="Ingresa la descripción"
              { ...register( "email", { required: true } ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Contraseña
          </label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <input
                id="password"
                type="password"
                placeholder="Ingresa la contraseña"
                { ...register( "password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres"
                  }
                } ) }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
              { errors.password && (
                <span className="text-sm text-red-500">{ errors.password.message }</span>
              ) }

            </div>
            <div>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirma la contraseña"
                { ...register( "confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: ( value ) =>
                    value === watch( "password" ) || "Las contraseñas no coinciden"
                } ) }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
              { errors.confirmPassword && (
                <span className="text-sm text-red-500">{ errors.confirmPassword.message }</span>
              ) }
            </div>
          </div>
        </div>

        <div className="sm:col-span-3 text-end">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400">
            { loading ? "Cargando..." : "Guardar" }
          </button>
        </div>
      </div>
    </form>
  );
};
