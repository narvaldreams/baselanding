"use client";
import { createUpdateAbout } from "@/actions/auth/about/create-update";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Spinner } from '../spinner/Spinner';
import EditorTexto from '../editor/EditorTexto';

export interface FormInputs {
  title: string;
  description: string;
  imageUrl: File;
}

interface AboutUs {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  about?: AboutUs;
  siteId: string;
}

export const FormAbout = ( { about, siteId }: Props ) => {

  const [ loaded, setLoaded ] = useState( false );

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInputs>();

  const [ message, setMessage ] = useState<string>( "" );
  const [ imagePreview, setImagePreview ] = useState<string | null>( null );
  const [ loading, setLoading ] = useState<boolean>( false );

  const handleImageChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const file = event.target.files?.[ 0 ];

    if ( file ) {
      const MAX_SIZE = 1 * 1024 * 1024;

      if ( file.size > MAX_SIZE ) {
        return Swal.fire( 'Opsss', 'La imagen es demasiado grande.', 'error' );
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview( reader.result as string );
      };
      reader.readAsDataURL( file );
    }
  };


  const onSubmit = async ( data: FormInputs ) => {
    setLoading( true );
    setMessage( "" );

    const { title, description, imageUrl } = data;

    const formData = new FormData();

    formData.append( "title", title );
    formData.append( "description", description );

    if ( imageUrl instanceof FileList && imageUrl.length > 0 ) {
      formData.append( "imageUrl", imageUrl[ 0 ] );
    }

    const { message, ok } = await createUpdateAbout( formData, siteId );

    if ( ok ) {
      setMessage( message );
      setTimeout( () => {
        setMessage( "" );
      }, 3000 );
    }
    setLoading( false );
  };


  useEffect( () => {
    if ( about ) {
      setValue( "title", about.title );
      setValue( "description", about.description );
      if ( about.imageUrl ) {
        setImagePreview( about.imageUrl );
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
      <h2 className="text-base/7 font-semibold text-gray-900">
        Sobre Nosotros
      </h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Aca puedes configurar la información sobre nosotros.
      </p>

      { message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p> }

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="title"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Titulo
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="title"
              placeholder="Ingresa el titulo"
              { ...register( "title", { required: true } ) } // register
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="description"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Descripción
          </label>
          <div className="mt-2">
            <EditorTexto name="description" control={ control } defaultValue={ about?.description } maxCharacters={ 800 } />
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="w-full">
            <label
              htmlFor="siteLogoUrl"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Imagen
            </label>
            <div className="mt-2">
              <input
                type="file"
                id="imageUrl"
                { ...register( "imageUrl" ) }
                onChange={ handleImageChange }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="w-[400px] h-[400px] bg-gray-300 p-4 rounded-md flex justify-center items-center text-center">
            { imagePreview ? (
              <img
                src={ imagePreview }
                alt="Vista previa"
                className="object-contain w-full h-full"
              />
            ) : (
              <p>No se ha seleccionado ninguna imagen</p>
            ) }
          </div>
        </div>

        <div className="sm:col-span-3 text-end">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400">
            {
              loading
                ? "Cargando..."
                : "Guardar"
            }
          </button>
        </div>
      </div>
    </form>
  );
};
