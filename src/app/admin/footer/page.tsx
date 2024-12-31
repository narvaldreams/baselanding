import { getFooter } from '@/actions/auth/footer/get-footer';
import { FormFooter, Wrapper } from '@/components';
import siteId from '@/utils/getSiteId';


export default async function FooterPage() {

  const footer = await getFooter(siteId);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              footer ? ( <FormFooter footer={ footer } siteId={ siteId } /> ) : ( <FormFooter siteId={ siteId } /> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;