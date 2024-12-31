import { getProfile } from '@/actions/auth/profile/get-profile';
import { Wrapper } from "@/components";
import { FormProfile } from '@/components/ui/admin/profile/FormProfile';
import siteId from '@/utils/getSiteId';

export default async function ProfilePage() {

  const profile = await getProfile(siteId);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">
            {
              profile && ( <FormProfile profile={ profile } siteId={ siteId }/> )
            }
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
