'use client';

import { Service } from '@/components/ui/services/Service';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

interface Props {
  service: Service;
}

export const ServiceRow = ( { service }: Props ) => {

  const { id, title, description, mediaUrl, serviceUrl, createdAt, updatedAt } = service;

  const [ existeImage, setExisteImage ] = useState<boolean | null>( null );

  useEffect( () => {
    const verificarImagen = async () => {
      try {

        const response = await fetch( `/api/image?nombre_imagen=${ mediaUrl }` );

        if ( response.ok ) {
          const data = await response.json();
          setExisteImage( data.existe );
        } else {
          setExisteImage( false );
        }
      } catch ( error ) {
        console.error( 'Error al verificar la imagen:', error );
        setExisteImage( false );
      }
    };

    verificarImagen();
  }, [ mediaUrl ] );

  return (
    <table className="table-fixed w-full text-center">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">Imagen</th>
          <th className="px-4 py-2">Título</th>
          <th className="px-4 py-2">Descripción</th>
          <th className="px-4 py-2">Creación</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2">
            {
              existeImage
                ? ( <Image src={ `/uploads/${ mediaUrl }` } width={ 100 } height={ 100 } alt={ title } /> )
                : ( <Image src="/uploads/no-image.jpg" width={ 100 } height={ 100 } alt="No existe imagen" /> )
            }
          </td>
          <td className="px-4 py-2">{ title }</td>
          <td className="px-4 py-2">{ description }</td>
          <td className="px-4 py-2">{ createdAt.toLocaleDateString() }</td>
          <td className="px-4 py-2 flex justify-center items-center gap-2">
            <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all">
              <FaRegEdit />
            </button>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all">
              <FaRegTrashAlt />
            </button>
          </td>
        </tr>
      </tbody>
    </table>


  );
};