import { getFooter } from '@/actions/auth/footer/get-footer';
import { getSettingById } from '@/actions/auth/settigns/get-setting-by-id';
import { Footer, TopMenu } from '@/components';
import { PolicyPrivacy } from '@/components/ui/policy-privacy/PolicyPrivacy';
import siteId from '@/utils/getSiteId';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

interface Props {
  params: Promise<{ id: string; }>;
}

export default async function PolicyPrivacyPage( { params }: Props ) {

  const { id } = await params;

  const site = await getSettingById( id );
  
  const footer = await getFooter(siteId);

  return (
    <>
      <TopMenu
        logoUrl={ site?.siteLogoUrl }
        siteName={ site?.siteName }
        facebookUrl={ site?.youtubeUrl }
        twitterUrl={ site?.twitterUrl }
        instagramUrl={ site?.instagramUrl }
        linkedinUrl={ site?.linkedinUrl }
        youtubeUrl={ site?.youtubeUrl }
        siteColor={ site?.siteColor }
        siteColorText={ site?.siteColorText }
      />
      <div className="container-fluid relative px-40 mt-10">
        <section className="relative md:py-24 py-16">
          <PolicyPrivacy policyPrivacyText={ site?.policyPrivacyText ?? '' } />
          <div className="flex justify-center items-center mt-5">
          <Link href="/" className=" text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all flex justify-center items-center" style={ { backgroundColor: site?.siteColor || '#000' } }>
            <IoIosArrowBack size={ 24 } />
            <span className="ml-1">Regresar</span>
          </Link>
          </div>
        </section>
      </div>
      <Footer
        id={ site?.id }
        siteName={ site?.siteName }
        footer={ footer }
        logoUrl={ site?.siteLogoUrl }
        description={ site?.description }
        facebookUrl={ site?.facebookUrl }
        twitterUrl={ site?.twitterUrl }
        instagramUrl={ site?.instagramUrl }
        linkedinUrl={ site?.linkedinUrl }
        youtubeUrl={ site?.youtubeUrl }
        siteColor={ site?.siteColor }
        siteColorText={ site?.siteColorText }
        policyPrivacyText={ site?.policyPrivacyText }
      />
    </>
  );
}