import { Wrapper } from '@/components';
import { Services } from './ui/Services';
import { getServices } from '@/actions/auth/services/get-services';

export default async function ServicesPage() {

  const servies = await getServices();

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              servies && ( <Services services={ servies } /> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
}