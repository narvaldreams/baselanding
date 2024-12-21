import type { Metadata, ResolvingMetadata } from "next";
import "../app/assets/scss/tailwind.scss";
import './assets/css/material.css';
import { alex, eb_garamond, kaushan, nunito, work_sans } from '@/config/font';
import { getSiteSettings } from '@/actions/auth/settigns/getSiteSettings';

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {


  // fetch site settings
  const siteSettings = await getSiteSettings();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ejemplo.com';

  return {
    title: ( siteSettings?.siteName ?? 'Nombre del sitio' ) || 'Baselanding',
    description: siteSettings?.description ?? 'Descripción del sitio',
    icons: {
      icon: siteSettings?.siteLogoUrl ?? '/uploads/favicon.ico',
      shortcut: siteSettings?.siteLogoUrl ?? '/uploads/favicon.ico',
    },
    openGraph: {
      type: 'website',
      title: siteSettings?.siteName || 'Nombre del sitio',
      description: siteSettings?.description || 'Descripción del sitio',
      url: siteUrl,
      images: [
        {
          url: siteSettings?.siteLogoUrl || '/uploads/no-image.jpg',
          width: 400,
          height: 400,
          alt: siteSettings?.siteName || 'Texto alternativo predeterminado',
        },
      ],
    },
  };
}

export default function RootLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en" dir="LTR">
      <body
        className={ `${ nunito.variable } ${ work_sans.variable } ${ eb_garamond.variable } ${ kaushan.variable } ${ alex.variable } font-nunito text-base` }
      >
        { children }
      </body>
    </html>
  );
}
