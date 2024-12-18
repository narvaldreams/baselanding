'use client';
import { createUpdateSettings } from '@/actions/auth/settigns/create-update';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export interface FormInputs {
  siteName: string;
  siteLogoUrl: File;
  description: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}

interface SiteSettings {
  id: string;
  siteName: string;
  siteLogoUrl: string | null;
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
  const [ message, setMessage ] = useState<string>( '' );
  const [ imagePreview, setImagePreview ] = useState<string | null>( null );
  const [ loading, setLoading ] = useState<boolean>( false );


  const handleImageChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const file = event.target.files?.[ 0 ];

    if ( file ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview( reader.result as string );
      };
      reader.readAsDataURL( file );
    }
  };

  const onSubmit = async ( data: FormInputs ) => {
    setLoading( true );
    setMessage( '' );

    const { siteName, description, siteLogoUrl, googleAnalyticsId, googleTagManagerId, facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl } = data;

    const formData = new FormData();

    formData.append( "siteName", siteName );
    formData.append( "description", description );
    formData.append( "facebookUrl", facebookUrl );
    formData.append( "twitterUrl", twitterUrl );
    formData.append( "instagramUrl", instagramUrl );
    formData.append( "linkedinUrl", linkedinUrl );
    formData.append( "youtubeUrl", youtubeUrl );
    formData.append( "googleAnalyticsId", googleAnalyticsId ? googleAnalyticsId : "" );
    formData.append( "googleTagManagerId", googleTagManagerId ? googleTagManagerId : "" );

    if ( siteLogoUrl instanceof FileList && siteLogoUrl.length > 0 ) {
      formData.append( "imageUrl", siteLogoUrl[ 0 ] );
    }

    const { message, ok } = await createUpdateSettings( formData );

    if ( ok ) {
      setMessage( message );
      setTimeout( () => {
        setMessage( "" );
      }, 3000 );
    }

    setLoading( false );
  };

  useEffect( () => {
    if ( site ) {
      setValue( 'siteName', site.siteName );
      setValue( 'description', site.description );
      setValue( 'googleAnalyticsId', site.googleAnalyticsId ? site.googleAnalyticsId : '' );
      setValue( 'googleTagManagerId', site.googleTagManagerId ? site.googleTagManagerId : '' );
      if ( site.siteLogoUrl ) {
        //const baseUrl = window.location.origin;
        setImagePreview( site.siteLogoUrl );
      }
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
      }
    } );
    Toast.fire( {
      icon: "success",
      title: message
    } );
  }, [ message ] );

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Configuración del Sitio</h2>
      <p className="mt-1 text-sm/6 text-gray-600">Aquí puedes configurar los detalles del sitio.</p>

      { message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p> }

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Nombre del Sitio en una fila */ }
        <div className="sm:col-span-6">
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

        {/* Descripción en una fila */ }
        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Descripción</label>
          <div className="mt-2">
            <textarea
              id="description"
              rows={ 3 }
              { ...register( 'description', { required: true } ) }
              placeholder="Ingresa la descripción del sitio"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            ></textarea>
          </div>
        </div>

        {/* Logo */ }
        <div className="sm:col-span-3 flex gap-4">
          <div className="w-full">
            <label htmlFor="siteLogoUrl" className="block text-sm/6 font-medium text-gray-900">Logo</label>
            <div className="mt-2">
              <input
                type="file"
                id="siteLogoUrl"
                { ...register( 'siteLogoUrl' ) }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                accept="image/*"
                onChange={ handleImageChange }
              />
            </div>
          </div>

          <div className="w-[250px] bg-gray-400 p-4 rounded-md flex justify-center items-center text-center">
            { imagePreview ? (
              <img src={ imagePreview } alt="Vista previa" width={ 50 } height={ 50 } />
            ) : (
              <p>No se ha seleccionado ninguna imagen</p>
            ) }
          </div>
        </div>

        {/* Redes Sociales */ }
        <div className="sm:col-span-6 grid grid-cols-2 gap-6 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="facebookUrl" className="block text-sm/6 font-medium text-gray-900">Facebook URL</label>
            <input
              type="text"
              id="facebookUrl"
              placeholder="Ingresa la URL de Facebook"
              { ...register( 'facebookUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="twitterUrl" className="block text-sm/6 font-medium text-gray-900">Twitter URL</label>
            <input
              type="text"
              id="twitterUrl"
              placeholder="Ingresa la URL de Twitter"
              { ...register( 'twitterUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="instagramUrl" className="block text-sm/6 font-medium text-gray-900">Instagram URL</label>
            <input
              type="text"
              id="instagramUrl"
              placeholder="Ingresa la URL de Instagram"
              { ...register( 'instagramUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="linkedinUrl" className="block text-sm/6 font-medium text-gray-900">LinkedIn URL</label>
            <input
              type="text"
              id="linkedinUrl"
              placeholder="Ingresa la URL de LinkedIn"
              { ...register( 'linkedinUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="youtubeUrl" className="block text-sm/6 font-medium text-gray-900">YouTube URL</label>
            <input
              type="text"
              id="youtubeUrl"
              placeholder="Ingresa la URL de YouTube"
              { ...register( 'youtubeUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        {/* Botón de guardar */ }
        <div className="sm:col-span-3 text-end">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400"
          >
            { loading ? 'Cargando...' : 'Guardar' }
          </button>
        </div>
      </div>
    </form>
  );
};