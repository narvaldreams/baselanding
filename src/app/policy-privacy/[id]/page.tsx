import { getSettingById } from '@/actions/auth/settigns/get-setting-by-id';
import { TopMenu } from '@/components';
import { PolicyPrivacy } from '@/components/ui/policy-privacy/PolicyPrivacy';

interface Props {
  params: Promise<{ id: string; }>;
}

export default async function PolicyPrivacyPage( { params }: Props ) {

  const { id } = await params;

  const site = await getSettingById( id );

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
        </section>
      </div>
    </>
  );
}