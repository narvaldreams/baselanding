"use client";
import { createUpdateService } from "@/actions/auth/services/create-update";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface FormInputs {
  title: string;
  description: string;
  mediaUrl: File;
  serviceUrl: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  mediaUrl: string | null;
  serviceUrl: string | null;
  siteId: string;
}

interface Props {
  service: Service | null | undefined;
}

export const CreatedUpdating = ( { service }: Props ) => {
  const {
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
        return Swal.fire( "Opsss", "La imagen es demasiado grande.", "error" );
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

    const { title, description, mediaUrl, serviceUrl } = data;

    const formData = new FormData();

    if ( service ) {
      formData.append( "id", service.id );
    }

    formData.append( "title", title );
    formData.append( "description", description );
    formData.append( "serviceUrl", serviceUrl );

    if ( mediaUrl instanceof FileList && mediaUrl.length > 0 ) {
      formData.append( "imageUrl", mediaUrl[ 0 ] );
    }

    const { message, ok } = await createUpdateService( formData );

    if ( ok ) {
      setMessage( message );
      setTimeout( () => {
        setMessage( "" );
      }, 3000 );
    }
    setLoading( false );
  };

  useEffect( () => {
    if ( service ) {
      setValue( "title", service.title ? service.title : "Titulo del Servicio" );
      setValue(
        "description",
        service.description ? service.description : "Descripción del Servicio"
      );
      setValue(
        "serviceUrl",
        service.serviceUrl ? service.serviceUrl : "Url del Servicio"
      );
      if ( service.mediaUrl ) {
        setImagePreview( service.mediaUrl );
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

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Servicio</h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Aca puedes configurar la información sobre servicio.
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
            <textarea
              id="description"
              rows={ 3 }
              placeholder="Ingresa la descripción"
              { ...register( "description", { required: true } ) } // register
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            ></textarea>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="title"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Url
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="title"
              placeholder="Ingresa la url"
              { ...register( "serviceUrl", { required: true } ) } // register
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
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
                { ...register( "mediaUrl" ) }
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
                width={ 400 }
                height={ 400 }
              />
            ) : (
              <p>No se ha seleccionado ninguna imagen</p>
            ) }
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
