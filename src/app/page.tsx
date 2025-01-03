//export const revalidate = 30;
import { getDataPage } from '@/actions/information/get-information';
import { About, Contact, Parallax, Footer, Service, TopMenu } from '@/components';
import ContenidoDynamico from '@/components/ui/admin/contenido/DynamicContent';
import ScrollButton from '@/components/ui/scroll/ScrollButton';
import Image from 'next/image';

export default async function Page() {

  const { siteSettings, hero, aboutUs, serviceSettings, services, parallax, footer } = await getDataPage();

  return (
    <>
      <TopMenu
        logoUrl={ siteSettings?.siteLogoUrl }
        siteName={ siteSettings?.siteName }
        facebookUrl={ siteSettings?.facebookUrl }
        twitterUrl={ siteSettings?.twitterUrl }
        instagramUrl={ siteSettings?.instagramUrl }
        linkedinUrl={ siteSettings?.linkedinUrl }
        youtubeUrl={ siteSettings?.youtubeUrl }
        siteColor={ siteSettings?.siteColor }
        siteColorText={ siteSettings?.siteColorText }
      />

      <section className="py-36 md:py-64 w-full table relative bg-center bg-no-repeat bg-cover" style={ { backgroundImage: hero?.imageUrl ? `url(${ hero?.imageUrl })` : 'url("/uploads/bg-video.png")' } }>
        {/* <div className="absolute top-0 start-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/33955001?background=1&autoplay=1&loop=1&byline=0&title=0"
            className="absolute top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vw]"
            title="Vimeo Video"
          ></iframe>

        </div> */}
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 text-center">
            <Image src={ siteSettings?.siteLogoUrl ? siteSettings?.siteLogoUrl : '/uploads/favicon.ico' } width={ 72 } height={ 64 } className="mx-auto" alt="" />
            <h4 className="text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium my-6 position-relative">{ hero?.title ? hero?.title : 'Titulo del Hero / Banner' }</h4>

            <div className="opacity-50 mb-0 max-w-xl text-lg mx-auto">
              <ContenidoDynamico text={ hero?.content ? hero?.content : 'Contenido del Hero / Banner' } colorText={ "#FFFFFF" } />
            </div>

            <div className="relative mt-8">
              <ScrollButton targetId="services" label={ hero?.textButton ? hero?.textButton : 'Servicios' } backgroundColor={ siteSettings?.siteColor ? siteSettings?.siteColor : '#000' } />
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">

        {/* Sobre nosotros */ }
        <About about={ aboutUs } />

        {/* Servicios */ }

        {
          services && <Service
            services={ services }
            siteColor={ siteSettings?.siteColor }
            title={ serviceSettings?.generalTitle }
            description={ serviceSettings?.generalDescription }
            mediaUrl={ serviceSettings?.generalImageUrl }
          />
        }

        {/* Parallax */ }
        <Parallax parallax={ parallax } siteColor={ siteSettings?.siteColor } />

        {/* Contact */ }
        <Contact
          siteColor={ siteSettings?.siteColor }
          siteColorText={ siteSettings?.siteColorText }
        />

      </section>
      {/* Footer */ }

      <Footer
        id={ siteSettings?.id }
        siteName={ siteSettings?.siteName }
        footer={ footer }
        logoUrl={ siteSettings?.siteLogoUrl }
        description={ siteSettings?.description }
        facebookUrl={ siteSettings?.facebookUrl }
        twitterUrl={ siteSettings?.twitterUrl }
        instagramUrl={ siteSettings?.instagramUrl }
        linkedinUrl={ siteSettings?.linkedinUrl }
        youtubeUrl={ siteSettings?.youtubeUrl }
        siteColor={ siteSettings?.siteColor }
        siteColorText={ siteSettings?.siteColorText }
        policyPrivacyText={ siteSettings?.policyPrivacyText }
      />

    </>
  );
}
