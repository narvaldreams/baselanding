import Link from 'next/link';
import type { Service } from './Service';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

interface Props {
  service: Service;
}

export default function ServicesGrid( { service }: Props ) {

  const { title, description, mediaUrl, serviceUrl } = service;

  return (
    <div className="p-6 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 transition duration-500 rounded-2xl mt-6">
      <div className="w-20 h-20 bg-indigo-600/5 text-indigo-600 rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800">
        {
          mediaUrl
            ? <Image src={ `/images/client/${ mediaUrl }` } width={ 50 } height={ 50 } alt={ title } />
            : <Image src="/images/client/01.jpg" width={ 50 } height={ 50 } alt={ title } />
        }

      </div>

      <div className="content mt-7">
        <Link href="/page-services" className="title h5 text-lg font-medium hover:text-indigo-600">{ title }</Link>
        <p className="text-slate-400 mt-3">{ description }</p>

        <div className="mt-5">
          <Link href="/page-services" className="relative inline-flex items-center font-semibold tracking-wide align-middle text-base text-center border-none after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:duration-500 text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500">Read More <FaArrowRight className="ms-2 text-[10px]" /></Link>
        </div>
      </div>
    </div>
  );
}