import { getHero } from '@/actions/auth/hero/get-hero';
import { auth } from '@/auth.config';
import { FormAbout, Wrapper } from '@/components';
import { FormHero } from '@/components/ui/admin/hero/FormHero';
import siteId from '@/utils/getSiteId';


export default async function HeroPage() {

  const session = await auth();

  const hero = await getHero(session?.user.siteId!);


  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              hero && session?.user ? ( <FormHero hero={ hero } siteId={ siteId } /> ) : ( <FormHero siteId={ siteId }/> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;