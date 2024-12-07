import { getSiteSettings } from '@/actions/auth/settigns/getSiteSettings';
import { Wrapper } from '@/components';
import { FormSettings } from '@/components/ui/admin/settings/FormSettings';


export default async function SettingsPage() {

  const siteSettings = await getSiteSettings();

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              siteSettings ? ( <FormSettings site={ siteSettings } /> ) : ( <FormSettings /> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;