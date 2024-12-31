import { getSiteSettings } from '@/actions/auth/settigns/getSiteSettings';
import { auth } from '@/auth.config';
import { Wrapper } from '@/components';
import { FormSettings } from '@/components/ui/admin/settings/FormSettings';
import siteId from '@/utils/getSiteId';


export default async function SettingsPage() {
  
  const siteSettings = await getSiteSettings(siteId);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              siteSettings && siteId ? ( <FormSettings site={ siteSettings } siteId={ siteId }/> ) : ( <FormSettings siteId={ siteId }/> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;