import { getProfile } from '@/actions/auth/profile/get-profile';
import { Wrapper } from "@/components";
import { FormProfile } from '@/components/ui/admin/profile/FormProfile';

export default async function ProfilePage() {

  const profile = await getProfile();

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            {
              profile && ( <FormProfile profile={ profile } /> )
            }
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
