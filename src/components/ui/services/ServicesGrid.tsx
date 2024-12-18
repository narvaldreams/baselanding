import Link from 'next/link';
import type { Service } from './Service';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

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
      <div className="w-40 h-40 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800">
        { mediaUrl && <Image src={ mediaUrl ? mediaUrl : '/uploads/no-image.jpg' } width={ 250 } height={ 250 } alt={ title } /> }
      </div>

      <div className="content mt-7">
        <Link href="/page-services" className="title h5 text-lg font-medium hover:text-indigo-600">{ title }</Link>
        <p className="text-slate-400 mt-3">{ description }</p>

        <div className="mt-5">
          <Link href="/page-services" className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500">
            Read More <FaArrowRight className="ms-2 text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}