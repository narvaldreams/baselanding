import { FormAbout, FormFooter, Wrapper } from '@/components';


export default async function FooterPage() {

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {/* {
              about ? ( <FormAbout about={ about } /> ) : ( <FormAbout /> )
            } */}

            <FormFooter />

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;