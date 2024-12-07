import { getDataPage } from '@/actions/information/get-information';
import { About, Contact, Parallax, Footer, Service, TopMenu } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {

  const { siteSettings, hero, aboutUs, services, parallax, footer } = await getDataPage();


  return (
    <>
      {
        siteSettings && ( <TopMenu logoUrl={ siteSettings.siteLogoUrl } siteName={ siteSettings.siteName } /> )
      }
      <section className="py-36 md:py-64 w-full table relative bg-center bg-no-repeat bg-cover" style={ { backgroundImage: "url('/images/bg-video.png')" } }>
        <div className="absolute top-0 start-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/33955001?background=1&autoplay=1&loop=1&byline=0&title=0"
            className="absolute top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vw]"
            title="Vimeo Video"
          ></iframe>

        </div>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 text-center">
            <Image src="/images/logo-icon-64.png" width={ 72 } height={ 64 } className="mx-auto" alt="" />
            <h4 className="text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium my-6 position-relative">We Collaboration Easy & Fast</h4>

            <p className="text-white opacity-50 mb-0 max-w-xl text-lg mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>

            <div className="relative mt-8">
              <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">

        {/* Sobre nosotros */ }
        {
          aboutUs && ( <About about={ aboutUs } /> )
        }

        {/* Servicios */ }
        {
          services && <Service services={ services } />
        }

        {/* Parallax */ }
        {
          parallax && ( <Parallax parallax={ parallax } /> )
        }

        {/* Contact */ }
        <Contact />

      </section>
      {/* Footer */ }
      {
        footer && siteSettings && ( <Footer footer={ footer } logoUrl={ siteSettings.siteLogoUrl } description={ siteSettings.description } /> )
      }
    </>
  );
}
