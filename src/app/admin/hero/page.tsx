import { getHero } from '@/actions/auth/hero/get-hero';
import { FormAbout, Wrapper } from '@/components';
import { FormHero } from '@/components/ui/admin/hero/FormHero';


export default async function HeroPage() {


  const hero = await getHero();


  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              hero ? ( <FormHero hero={ hero } /> ) : ( <FormHero /> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;