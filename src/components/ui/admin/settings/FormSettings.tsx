'use client';
import { createUpdateSettings } from '@/actions/auth/settigns/create-update';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { SketchPicker } from "react-color";


export interface FormInputs {
  siteName: string;
  siteLogoUrl: File;
  description: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  siteColor: string;
  siteColorText: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}

interface SiteSettings {
  id: string;
  siteName: string;
  siteLogoUrl: string | null;
  description: string;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  siteColor: string | null;
  siteColorText: string | null;
  googleAnalyticsId: string | null;
  googleTagManagerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  site?: SiteSettings;
}

export const FormSettings = ( { site }: Props ) => {

  const [ loaded, setLoaded ] = useState( false );
  const { control, register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<FormInputs>();
  const [ message, setMessage ] = useState<string>( '' );
  const [ imagePreview, setImagePreview ] = useState<string | null>( null );
  const [ loading, setLoading ] = useState<boolean>( false );

  /* Colores Sitio y Texto */
  const [ showSiteColorPicker, setShowSiteColorPicker ] = useState( false );
  const [ showTextColorPicker, setShowTextColorPicker ] = useState( false );

  useEffect( () => {
    setLoaded( true );
  }, [] );


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

    const { siteName, description, siteLogoUrl, googleAnalyticsId, googleTagManagerId, facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl, siteColor, siteColorText } = data;

    const formData = new FormData();

    formData.append( "siteName", siteName );
    formData.append( "description", description );
    formData.append( "facebookUrl", facebookUrl );
    formData.append( "twitterUrl", twitterUrl );
    formData.append( "instagramUrl", instagramUrl );
    formData.append( "linkedinUrl", linkedinUrl );
    formData.append( "youtubeUrl", youtubeUrl );
    formData.append( "siteColor", siteColor );
    formData.append( "siteColorText", siteColorText );
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
      setValue( 'facebookUrl', site.facebookUrl ? site.facebookUrl : '' );
      setValue( 'twitterUrl', site.twitterUrl ? site.twitterUrl : '' );
      setValue( 'instagramUrl', site.instagramUrl ? site.instagramUrl : '' );
      setValue( 'linkedinUrl', site.linkedinUrl ? site.linkedinUrl : '' );
      setValue( 'youtubeUrl', site.youtubeUrl ? site.youtubeUrl : '' );
      setValue( 'siteColor', site.siteColor ? site.siteColor : '' );
      setValue( 'siteColorText', site.siteColorText ? site.siteColorText : '' );
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

        <div className="sm:col-span-6 flex gap-4">
          <div className="flex w-full gap-4 items-start">
            {/* Site Color Picker */ }
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color del Sitio</label>
              <Controller
                name="siteColor"
                control={ control }
                render={ ( { field } ) => (
                  <div>
                    <div
                      className="w-full h-9 rounded border cursor-pointer flex items-center justify-center hover:bg-gray-300 border-gray-300"
                      style={ { backgroundColor: field.value } }
                      onClick={ () => setShowSiteColorPicker( !showSiteColorPicker ) }
                    >
                      <span className="text-md text-black">Seleccionar color</span>
                    </div>
                    { showSiteColorPicker && (
                      <div className="absolute z-10 mt-2 w-full">
                        <div
                          className="fixed top-0 left-0 w-full h-full"
                          onClick={ () => setShowSiteColorPicker( false ) }
                        />
                        <SketchPicker
                          color={ field.value }
                          onChange={ ( color ) => field.onChange( color.hex ) }
                        />
                      </div>
                    ) }
                  </div>
                ) }
              />
            </div>

            {/* Text Color Picker */ }
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color de Texto</label>
              <Controller
                name="siteColorText"
                control={ control }
                render={ ( { field } ) => (
                  <div>
                    <div
                      className="w-full h-9 rounded border cursor-pointer flex items-center justify-center hover:bg-gray-300 border-gray-300"
                      style={ { backgroundColor: field.value } }
                      onClick={ () => setShowTextColorPicker( !showTextColorPicker ) }
                    >
                      <span className="text-md text-black">Seleccionar color</span>
                    </div>
                    { showTextColorPicker && (
                      <div className="absolute z-10 mt-2">
                        <div
                          className="fixed top-0 left-0 w-full h-full"
                          onClick={ () => setShowTextColorPicker( false ) }
                        />
                        <SketchPicker
                          color={ field.value }
                          onChange={ ( color ) => field.onChange( color.hex ) }
                        />
                      </div>
                    ) }
                  </div>
                ) }
              />
            </div>
          </div>
        </div>



        {/* Selección de Google Analytics y Google Tag Manager */ }
        <div className="sm:col-span-6 flex gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="googleAnalyticsId" className="block text-sm/6 font-medium text-gray-900">Google Analytics ID</label>
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

          <div className="w-full sm:w-1/2">
            <label htmlFor="googleTagManagerId" className="block text-sm/6 font-medium text-gray-900">Google Tag Manager ID</label>
            <div className="mt-2">
              <input
                type="text"
                id="googleTagManagerId"
                { ...register( 'googleTagManagerId' ) }
                placeholder="Ingresa el id de Google Tag Manager"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Redes Sociales */ }
        <div className="sm:col-span-6 grid grid-cols-2 gap-6">
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