import { Wrapper } from "@/components";
import { CreatedUpdating } from "../ui/CreatedUpdating";
import { getServiceById } from '@/actions/auth/services/get-services-by-id';

interface Props {
  params: Promise<{ id: string; }>;
}

export default async function ServicePage( { params }: Props ) {

  const { id } = await params;

  console.log( id );

  const response = await getServiceById( id );

  console.log( { response } );


  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            <CreatedUpdating service={ response?.ok ? response!.service : null } />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
