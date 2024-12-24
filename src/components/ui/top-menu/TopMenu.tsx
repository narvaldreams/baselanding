'use client';
import { CustomImage } from '@/components/image/CustomImage';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiTwitter, CiInstagram, CiLinkedin, CiYoutube } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';

interface Props {
  logoUrl: string | undefined | null;
  siteName?: string;
  facebookUrl: string | undefined | null;
  twitterUrl: string | undefined | null;
  instagramUrl: string | undefined | null;
  linkedinUrl: string | undefined | null;
  youtubeUrl: string | undefined | null;
  siteColor: string | undefined | null;
  siteColorText: string | undefined | null;
}

export default function TopMenu( { logoUrl, siteName, facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl, siteColor, siteColorText }: Props ) {

  const colorText = siteColorText || '#FFFFFF';


  return (
    <nav id="topnav" className="defaultscroll bg-slate-900 nav-sticky" style={ { backgroundColor: siteColor || '#000' } }>
      <div className="container flex items-center justify-between py-4 flex-col sm:flex-row">
        {/* Logo y Nombre del sitio */ }

        <div className="flex items-end space-x-4 mb-4 sm:mb-0">
          <Link className="logo" href="/">
            <CustomImage
              src={ logoUrl! }
              width={ 50 }
              height={ 50 }
              className="hidden dark:inline-block"
              alt={ siteName ? siteName : "Logo" }
            />
          </Link>
          <h1
            className="text-3xl font-bold tracking-wide"
            style={ { color: colorText } }
          >
            { siteName ? siteName : "Nombre del sitio" }
          </h1>
        </div>


        {/* Iconos de redes sociales */ }
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Facebook */ }
          {
            facebookUrl && ( <Link href={ facebookUrl || "#" } target="_blank">
              <CiFacebook size={ 25 } className="hover:text-white" style={ { color: colorText } } />
            </Link> )
          }

          {/* Twitter */ }
          {
            twitterUrl && ( <Link href={ twitterUrl || "#" } target="_blank">
              <FaXTwitter size={ 22 } className="hover:text-white" style={ { color: colorText } } />
            </Link> )
          }
          {/* Instagram */ }
          {
            instagramUrl && ( <Link href={ instagramUrl || "#" } target="_blank">
              <CiInstagram size={ 25 } className=" hover:text-white" style={ { color: colorText } } />
            </Link> )
          }
          {/* LinkedIn */ }
          {
            linkedinUrl && ( <Link href={ linkedinUrl || "#" } target="_blank">
              <CiLinkedin size={ 25 } className="hover:text-white" style={ { color: colorText } } />
            </Link> )
          }
          {/* YouTube */ }
          {
            youtubeUrl && ( <Link href={ youtubeUrl || "#" } target="_blank">
              <CiYoutube size={ 25 } className=" hover:text-white" style={ { color: colorText } } />
            </Link> )
          }
        </div>

      </div>
    </nav>

  );
};