import { truncateDescription } from '@/utils/truncateDescripcion';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiInstagram, CiLinkedin, CiTwitter, CiYoutube } from 'react-icons/ci';

interface Props {
  logoUrl: string | undefined | null;
  description: string | undefined | null;
  facebookUrl: string | undefined | null;
  twitterUrl: string | undefined | null;
  instagramUrl: string | undefined | null;
  linkedinUrl: string | undefined | null;
  youtubeUrl: string | undefined | null;
  footer: {
    id: string;
    address: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

export default function Footer( { logoUrl, footer, description, facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl }: Props ) {

  const { address = '', email = '', phoneNumber = '' } = footer || {};

  return (
    <div>
      <footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200">
        <div className="container relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="py-[30px] px-0">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                  <div className="lg:col-span-4 md:col-span-12">

                    <Link href="/#" className="text-[22px] focus:outline-none">
                      <Image src={ logoUrl ? logoUrl : '/uploads/favicon.ico' } width={ 50 } height={ 50 } alt={ description ? description : 'Logo de la web' } />
                    </Link>


                    <p className="mt-6 text-gray-300">{ description ? truncateDescription( description ) : 'Descripción de la web' }</p>
                  </div>

                  <div className="lg:col-span-4 md:col-span-12 grid items-center">
                    <div className="text-center">
                      <h5 className="tracking-[1px] text-gray-100 font-semibold">Dirección: { address ? address : 'No se ha cargado ninguna dirección' }</h5>
                      <p className="mt-6 text-gray-300">Email: { email ? email : 'No se ha cargado ningun email' }</p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 md:col-span-12 grid items-center">
                    <div className="text-center">
                      <h5 className="text-gray-100 font-semibold">Telefono: { phoneNumber ? phoneNumber : 'No se ha cargado ninguna numero de telefono' }</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center py-[10px] gap-4">
            {/* Facebook */ }
            <Link href={ facebookUrl ? facebookUrl : '#' }>
              <CiFacebook size={ 30 } className="text-gray-300 hover:text-white" />
            </Link>
            {/* Twitter */ }
            <Link href={ twitterUrl ? twitterUrl : '#' }>
              <CiTwitter size={ 30 } className="text-gray-300 hover:text-white" />
            </Link>
            {/* Instagram */ }
            <Link href={ instagramUrl ? instagramUrl : '#' }>
              <CiInstagram size={ 30 } className="text-gray-300 hover:text-white" />
            </Link>
            {/* LinkedIn */ }
            <Link href={ linkedinUrl ? linkedinUrl : '#' }>
              <CiLinkedin size={ 30 } className="text-gray-300 hover:text-white" />
            </Link>
            {/* Youtube */ }
            <Link href={ youtubeUrl ? youtubeUrl : '#' }>
              <CiYoutube size={ 30 } className="text-gray-300 hover:text-white" />
            </Link>
          </div>
        </div>
        <div className="py-[30px] px-0 border-t border-slate-800">
          <div className="container relative text-center">
            <div className="grid items-center">
              <div className="text-center">
                <p className="mb-0">© { new Date().getFullYear() } Techwind. Design & Develop with <i className="mdi mdi-heart text-red-600"></i></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}