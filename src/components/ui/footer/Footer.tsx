import { truncateDescription } from '@/utils/truncateDescripcion';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiInstagram, CiLinkedin, CiTwitter, CiYoutube } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';
import ContenidoDynamico from '../admin/contenido/DynamicContent';

interface Props {
  siteName: string | undefined | null;
  logoUrl: string | undefined | null;
  description: string | undefined | null;
  facebookUrl: string | undefined | null;
  twitterUrl: string | undefined | null;
  instagramUrl: string | undefined | null;
  linkedinUrl: string | undefined | null;
  youtubeUrl: string | undefined | null;
  siteColor: string | undefined | null;
  siteColorText: string | undefined | null;
  policyPrivacyUrl: string | undefined | null;
  footer: {
    id: string;
    address: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

export default function Footer( { siteName, logoUrl, footer, description, facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl, siteColor, siteColorText, policyPrivacyUrl }: Props ) {

  const { address = '', email = '', phoneNumber = '' } = footer || {};
  const colorText = siteColorText || '#FFFFFF';

  return (
    <div>
      <footer className="footer relative text-gray-200 shadow-footer-strong" style={ { backgroundColor: siteColor || '#000' } }>
        <div className="container relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="py-[30px] px-0">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                  <div className="lg:col-span-4 md:col-span-12">

                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <Link href="/#" className="text-[22px] focus:outline-none">
                        <Image src={ logoUrl ? logoUrl : '/uploads/favicon.ico' } width={ 50 } height={ 50 } alt={ description ? description : 'Logo de la web' } />
                      </Link>
                      <h1 className="text-3xl font-bold tracking-wide" style={ { color: colorText } }>{ siteName ? siteName : 'Nombre del sitio' }</h1>
                    </div>

                    {/*  <p className="mt-6" style={ { color: colorText } }>{ description ? truncateDescription( description ) : 'Descripción de la web' }</p> */ }
                    <ContenidoDynamico text={ description ? description : 'Descripción de la web' } colorText={ colorText } />
                  </div>

                  <div className="lg:col-span-4 md:col-span-12 grid items-center">
                    <div className="text-center">
                      <h5 className="tracking-[1px] font-semibold" style={ { color: colorText } }>Dirección: { address ? address : 'No se ha cargado ninguna dirección' }</h5>
                      {/* <p className="mt-6" style={ { color: colorText } }>Email: { email ? email : 'No se ha cargado ningun email' }</p> */ }
                    </div>
                  </div>

                  <div className="lg:col-span-4 md:col-span-12 grid items-center">
                    <div className="text-center">
                      <h5 className=" font-semibold" style={ { color: colorText } }>Telefono: { phoneNumber ? phoneNumber : 'No se ha cargado ninguna numero de telefono' }</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center py-[10px] gap-4">
            {/* Facebook */ }
            {
              facebookUrl && ( <Link href={ facebookUrl ? facebookUrl : '#' } target="_blank">
                <CiFacebook size={ 30 } className="hover:text-white" style={ { color: colorText } } />
              </Link> )
            }
            {/* Twitter */ }
            {
              twitterUrl && ( <Link href={ twitterUrl ? twitterUrl : '#' } target="_blank">
                <FaXTwitter size={ 26 } className="hover:text-white" style={ { color: colorText } } />
              </Link> )
            }
            {/* Instagram */ }
            {
              instagramUrl && ( <Link href={ instagramUrl ? instagramUrl : '#' } target="_blank">
                <CiInstagram size={ 30 } className="hover:text-white" style={ { color: colorText } } />
              </Link> )
            }
            {/* LinkedIn */ }
            {
              linkedinUrl && ( <Link href={ linkedinUrl ? linkedinUrl : '#' } target="_blank">
                <CiLinkedin size={ 30 } className="hover:text-white" style={ { color: colorText } } />
              </Link> )
            }
            {/* Youtube */ }
            {
              youtubeUrl && ( <Link href={ youtubeUrl ? youtubeUrl : '#' } target="_blank">
                <CiYoutube size={ 30 } className="hover:text-white" style={ { color: colorText } } />
              </Link> )
            }
          </div>
          <div className="flex items-center  justify-center py-[10px] gap-4">
            <Link href={ policyPrivacyUrl ? policyPrivacyUrl : '#' } className="text-[16px] focus:outline-none" style={ { color: colorText } } target="_blank">
              Política de privacidad
            </Link>
          </div>
        </div>
        <div className="py-[30px] px-0 border-t" style={ { borderColor: colorText } }>
          <div className="container relative text-center">
            <div className="grid items-center">
              <Link href="https://narvaldreams.com" className="text-center" target="_blank">
                <p className="mb-0" style={ { color: colorText } }>© { new Date().getFullYear() } Agencia de desarrollo web NarvalDreams <i className="mdi mdi-heart text-red-600"></i></p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}