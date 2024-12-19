'use client';
import Image from 'next/image';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Link from 'next/link';
import { deleteServiceById } from '@/actions/auth/services/delete-service-by-id';
import Swal from 'sweetalert2';
import { truncateDescription } from '@/utils/truncateDescripcion';
import { Service } from './Services';

interface Props {
  service: Service;
  serviceSettingsId: string;
}

export const ServiceRow = ( { service, serviceSettingsId }: Props ) => {

  const { id, title, description, mediaUrl, serviceUrl, createdAt, updatedAt } = service;

  const onDelete = () => {

    Swal.fire( {
      title: "¿Estás seguro de eliminar este servicio?",
      text: service.title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    } ).then( async ( result ) => {
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
      if ( result.isConfirmed ) {
        const { ok, message } = await deleteServiceById( id );
        if ( !ok ) {
          return Toast.fire( 'Opsss!', message, 'error' );
        }
        Toast.fire( 'Success', message, 'success' );
      }
    } );
  };

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
        <tr className="hover:bg-gray-300">
          <td className="flex justify-center items-center h-full">
            <Image
              src={ mediaUrl ? mediaUrl : '/uploads/no-image.jpg' }
              width={ 150 }
              height={ 150 }
              alt={ title ? title : 'No existe imagen' }
            />
          </td>
          <td className="px-4 py-2 font-bold">{ title }</td>
          <td className="px-4 py-2">{ truncateDescription( description, 70 ) }</td>
          <td className="px-4 py-2">{ createdAt.toLocaleDateString() }</td>
          <td className="px-4 py-2">
            <div className="flex justify-center items-center gap-3">
              <Link
                href={ `/admin/services/${ serviceSettingsId }/${ id }` }
                className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all"
              >
                <FaRegEdit size={ 20 } />
              </Link>
              <button
                onClick={ onDelete }
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all"
              >
                <FaRegTrashAlt size={ 20 } />
              </button>
            </div>
          </td>
        </tr>

      </tbody>
    </table>


  );
};