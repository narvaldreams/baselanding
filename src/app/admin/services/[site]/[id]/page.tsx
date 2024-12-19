import { Wrapper } from "@/components";
import { CreatedUpdating } from "../../ui/CreatedUpdating";
import { getServiceById } from '@/actions/auth/services/get-services-by-id';

interface Props {
  params: Promise<{ id: string; site: string; }>;
}

export default async function ServicePage( { params }: Props ) {

  const { id, site } = await params;

  const response = await getServiceById( id, site );

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            <CreatedUpdating service={ response?.ok ? response!.service : null } serviceSettingsId={ site } />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
