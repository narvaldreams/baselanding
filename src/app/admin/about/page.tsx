import { getSiteAbout } from '@/actions/auth/about/get-about';
import { FormAbout, Wrapper } from '@/components';
import siteId from '@/utils/getSiteId';


export default async function AboutPage() {


  const about = await getSiteAbout(siteId);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              about ? ( <FormAbout about={ about } siteId={ siteId } /> ) : ( <FormAbout siteId={ siteId } /> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;