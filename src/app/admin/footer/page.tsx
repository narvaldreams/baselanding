import { getFooter } from '@/actions/auth/footer/get-footer';
import { FormFooter, Wrapper } from '@/components';


export default async function FooterPage() {

  const footer = await getFooter();

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              footer ? ( <FormFooter footer={ footer } /> ) : ( <FormFooter /> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;