import Link from 'next/link';
import type { Service } from './Service';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import ContenidoDynamico from '../admin/contenido/DynamicContent';

interface Props {
  siteColor: string | undefined | null;
  service: Service;
}

export default function ServicesGrid( { service, siteColor }: Props ) {

  const { title, description, mediaUrl, serviceUrl } = service;

  return (
    <div
      className="p-6 transition duration-500 rounded-2xl mt-6 hover:shadow-2xl hover:transition-shadow hover:scale-105 hover:shadow-slate-900/50"
      style={ {
        boxShadow: `0 15px 30px rgba(${ parseInt( ( siteColor || '#000' ).slice( 1, 3 ), 16 ) }, ${ parseInt( ( siteColor || '#000' ).slice( 3, 5 ), 16 ) }, ${ parseInt( ( siteColor || '#000' ).slice( 5, 7 ), 16 ) }, 0.7)`,
      } }
    >
      <div className="w-40 h-40 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex justify-center items-center shadow-sm shadow-gray-800">
        { mediaUrl &&
          <Image
            src={ mediaUrl ? mediaUrl : '/uploads/no-image.jpg' }
            alt={ title }
            width={ 250 }
            height={ 250 }
            className="w-full h-full object-cover rounded-xl" // Añadido: para que la imagen se ajuste
          />
        }
      </div>

      <div className="content mt-7">
        <Link href="/page-services" className="title h5 text-lg font-medium hover:text-indigo-600">{ title }</Link>
        <div className="mt-3">
          <ContenidoDynamico text={ service?.description ? service?.description : 'Contenido del servicio' } colorText={ '#94a3b8' } />
        </div>
      </div>
    </div>
  );
}