'use client';
import { createUpdateSettings } from '@/actions/auth/settigns/create-update';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface FormInputs {
  siteName: string;
  siteLogoUrl: string;
  description: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}

interface SiteSettings {
  id: string;
  siteName: string;
  siteLogoUrl: string;
  description: string;
  googleAnalyticsId: string | null;
  googleTagManagerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  site?: SiteSettings;
}


export const FormSettings = ( { site }: Props ) => {

  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<FormInputs>();
  const [message, setMessage] = useState<string>( '' );

  const onSubmit = async ( data: FormInputs ) => {
    setMessage( '' );
    const { message } = await createUpdateSettings( data );
    setMessage( message );
    setTimeout(() => {
      setMessage( '' );
    }, 3000);
  };

  useEffect( () => {
    if ( site ) {
      setValue( 'siteName', site.siteName );
      setValue( 'siteLogoUrl', site.siteLogoUrl );
      setValue( 'description', site.description );
      setValue( 'googleAnalyticsId', site.googleAnalyticsId ? site.googleAnalyticsId : '' );
      setValue( 'googleTagManagerId', site.googleTagManagerId ? site.googleTagManagerId : '' );
    }
  }, [] );

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Configuración del Sitio</h2>
      <p className="mt-1 text-sm/6 text-gray-600">Aca puedes configurar los detalles del sitio.</p>

      {
        message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p>
      }

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        <div className="sm:col-span-3">
          <label htmlFor="siteName" className="block text-sm/6 font-medium text-gray-900">Nombre del Sitio</label>
          <div className="mt-2">
            <input
              type="text"
              id="siteName"
              placeholder="Ingresa el nombre del sitio"
              { ...register( 'siteName', { required: true } ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Descripción</label>
          <div className="mt-2">
            <textarea
              id="description"
              rows={ 3 }
              { ...register( 'description', { required: true } ) }
              placeholder="Ingresa la descripción del sitio"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"></textarea>
          </div>
        </div>

        <div className="sm:col-span-3 flex gap-4">

          <div className="w-full">
            <label htmlFor="siteLogoUrl" className="block text-sm/6 font-medium text-gray-900">Logo</label>
            <div className="mt-2">
              <input
                type="file"
                id="siteLogoUrl"
                { ...register( 'siteLogoUrl', { required: true } ) }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                accept="image/*"
              />
            </div>
          </div>


          <div className="w-full bg-gray-400 p-4 rounded-md flex justify-center items-center">
            <Image src="/images/logo-light.png" width={ 100 } height={ 100 } alt="" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="googleAnalyticsId" className="block text-sm/6 font-medium text-gray-900">Analytics</label>
          <div className="mt-2">
            <input
              type="text"
              id="googleAnalyticsId"
              { ...register( 'googleAnalyticsId' ) }
              placeholder="Ingresa el id de Google Analytics"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="googleTagManagerId" className="block text-sm/6 font-medium text-gray-900">Tag Manager</label>
          <div className="mt-2">
            <input
              type="text"
              id="googleTagManagerId"
              { ...register( 'googleTagManagerId' ) }
              placeholder="Ingrese su tag manager"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>
        {

        }

        <div className="sm:col-span-3 text-end">
          <button
            disabled={ !isValid }
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400">
            Guardar
          </button>
        </div>
      </div>
    </form>


  );
};