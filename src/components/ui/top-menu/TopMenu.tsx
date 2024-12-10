'use client';
import { CustomImage } from '@/components/image/CustomImage';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  logoUrl: string | null;
  siteName: string;
}

export default function TopMenu( { logoUrl, siteName }: Props ) {

  return (
    <nav id="topnav" className="defaultscroll bg-slate-900 nav-sticky">
      <div className="container flex items-center justify-start space-x-4 relative">
        {/* Logo */ }

        <Link className="logo" href="/">
          <CustomImage src={ logoUrl! } width={ 50 } height={ 50 } className="hidden dark:inline-block py-3" alt={ siteName } />
        </Link>

        {/* Nombre del sitio */ }
        <h1 className="text-white text-2xl font-semibold">{ siteName }</h1>
      </div>
    </nav>

  );
};