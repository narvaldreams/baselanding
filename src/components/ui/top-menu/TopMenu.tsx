'use client';
import { CustomImage } from '@/components/image/CustomImage';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiTwitter, CiInstagram, CiLinkedin, CiYoutube } from 'react-icons/ci';

interface Props {
  logoUrl: string | undefined | null;
  siteName?: string;
  facebookUrl: string | undefined | null;
  twitterUrl: string | undefined | null;
  instagramUrl: string | undefined | null;
  linkedinUrl: string | undefined | null;
  youtubeUrl: string | undefined | null;
  siteColor: string | undefined | null;
}

export default function TopMenu( { logoUrl, siteName, facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl, siteColor }: Props ) {


  return (
    <nav id="topnav" className="defaultscroll bg-slate-900 nav-sticky" style={ { backgroundColor: siteColor || '#000' } }>
      <div className="container flex items-center justify-between py-4 flex-col sm:flex-row">
        {/* Logo y Nombre del sitio */ }

        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <Link className="logo" href="/">
            <CustomImage
              src={ logoUrl! }
              width={ 50 }
              height={ 50 }
              className="hidden dark:inline-block py-3"
              alt={ siteName ? siteName : 'Logo' }
            />
          </Link>
          <h1 className="text-white text-2xl font-semibold">{ siteName ? siteName : 'Nombre del sitio' }</h1>
        </div>

        {/* Iconos de redes sociales */ }
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Facebook */ }
          <Link href={ facebookUrl || "#" }>
            <CiFacebook size={ 25 } className="text-gray-300 hover:text-white" />
          </Link>
          {/* Twitter */ }
          <Link href={ twitterUrl || "#" }>
            <CiTwitter size={ 25 } className="text-gray-300 hover:text-white" />
          </Link>
          {/* Instagram */ }
          <Link href={ instagramUrl || "#" }>
            <CiInstagram size={ 25 } className="text-gray-300 hover:text-white" />
          </Link>
          {/* LinkedIn */ }
          <Link href={ linkedinUrl || "#" }>
            <CiLinkedin size={ 25 } className="text-gray-300 hover:text-white" />
          </Link>
          {/* YouTube */ }
          <Link href={ youtubeUrl || "#" }>
            <CiYoutube size={ 25 } className="text-gray-300 hover:text-white" />
          </Link>
        </div>
        
      </div>
    </nav>

  );
};