import { getSiteSettings } from '@/actions/auth/settigns/getSiteSettings';
import { auth } from '@/auth.config';
import { Wrapper } from '@/components';
import { FormSettings } from '@/components/ui/admin/settings/FormSettings';


export default async function SettingsPage() {

  const session = await auth();
  
  const siteSettings = await getSiteSettings(session?.user.siteId!);

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              siteSettings && session?.user ? ( <FormSettings site={ siteSettings } siteId={ session.user.siteId }/> ) : ( <FormSettings siteId={ session?.user.siteId! }/> )
            }

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;