import { getSiteAbout } from '@/actions/auth/about/get-about';
import { FormAbout, Wrapper } from '@/components';


export default async function AboutPage() {


  const about = await getSiteAbout();

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              about && ( <FormAbout about={ about } /> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;