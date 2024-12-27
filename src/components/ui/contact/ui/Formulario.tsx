'use client';
import { saveContactForm } from '@/actions/contact/save-contact';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMessageCircle, FiPhoneCall } from 'react-icons/fi';
import { IoMailOutline, IoPersonOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

interface FormInputs {
  fullName: string;
  email: string;
  phoneNumber: string;
  description: string;
}

interface Props {
  siteColor: string | undefined | null;
  siteColorText: string | undefined | null;
}

export const Formulario = ( { siteColor, siteColorText }: Props ) => {

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormInputs>();
  const [ isLoading, setIsLoading ] = useState( false );


  const onSubmit = async ( data: FormInputs ) => {
    setIsLoading( true );
    if ( !isValid ) return;
    const saveContact = await saveContactForm( data );
    if ( !saveContact.ok ) {
      setIsLoading( false );
      reset();
      return Swal.fire( 'Oops!', saveContact.message, 'error' );
    }
    setIsLoading( false );
    reset();
    return Swal.fire( '¡Gracias!', 'Tu contacto ha sido registrado exitosamente', 'success' );
  };

  return (
    <form onSubmit={ handleSubmit( onSubmit ) }>
      <div className="grid grid-cols-1">
        <div className="mb-3">
          <div className="text-start">
            <label htmlFor="name" className="font-semibold">
              Nombres:
            </label>
            <div className="form-icon relative mt-2">
              <IoPersonOutline className="size-4 absolute top-3 start-4"></IoPersonOutline>
              <input
                id="name"
                type="text"
                { ...register( 'fullName', { required: true } ) }
                className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                placeholder="Ingresa sus nombres"
              />
            </div>
            {
              errors.fullName && <p className="mt-1 text-sm/6 text-red-600">El nombre es requerido</p>
            }
          </div>
        </div>

        <div className="grid grid-cols-1">
          <div className="mb-3">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <div className="form-icon relative mt-2">
              <IoMailOutline className="size-4 absolute top-3 start-4"></IoMailOutline>
              <input
                id="email"
                type="email"
                { ...register( 'email', { required: true } ) }
                className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent  rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                placeholder="Ingresa su email"
              />
              {
                errors.email && <p className="mt-1 text-sm/6 text-red-600">El email es requerido</p>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="mb-5">
          <div className="text-start">
            <label htmlFor="telefono" className="font-semibold">
              Teléfono:
            </label>
            <div className="form-icon relative mt-2">
              <FiPhoneCall className="size-4 absolute top-3 start-4"></FiPhoneCall>
              <input
                id="telefono"
                { ...register( 'phoneNumber', { required: true } ) }
                className="form-input ps-11 w-full py-2 px-3 h-10 bg-transparent  rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                placeholder="Ingresa el teléfono"
              />
              {
                errors.phoneNumber && <p className="mt-1 text-sm/6 text-red-600">El teléfono es requerido</p>
              }
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-start">
            <label htmlFor="comments" className="font-semibold">
              Comentario:
            </label>
            <div className="form-icon relative mt-2">
              <FiMessageCircle className="size-4 absolute top-3 start-4"></FiMessageCircle>
              <textarea
                id="comments"
                { ...register( 'description', { required: true } ) }
                className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent  rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                placeholder="Ingresa tu comentario"
              ></textarea>
            </div>
          </div>
          {
            errors.description && <p className="mt-1 text-sm/6 text-red-600">El comentario es requerido</p>
          }
        </div>
      </div>

      <button
        type="submit"
        id="submit"
        name="send"
        disabled={ isLoading }
        className="py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded-md justify-center flex items-center bg-slate-900 text-gray-200"
        style={ { backgroundColor: siteColor || '#000', color: siteColorText || '#FFF' } }
      >
        { isLoading ? 'Enviando...' : 'Solicita información' }
      </button>
    </form>
  );
};