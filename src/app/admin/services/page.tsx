import { Wrapper } from '@/components';
import { getServices } from '@/actions/auth/services/get-services';
import Link from 'next/link';
import { Paginacion } from './ui/Paginacion';
import { Services } from './ui/Services';
import { FormServiceSettings } from './ui/settings/FormServiceSettings';
import { getServiceSettings } from '@/actions/auth/services/Settings/get-service-settings';



interface Props {
  searchParams: Promise<{ page?: string; }>;
}

export default async function ServicesPage( { searchParams }: Props ) {

  const { page: pageSearchParams } = await searchParams;

  const page = pageSearchParams ? parseInt( pageSearchParams ) : 1;

  /* Obtener la configuración del sitio */
  const serviceSettings = await getServiceSettings();

  const { services, totalPages } = await getServices( { page, serviceSettignsId: serviceSettings!.id } ); // revisar


  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            {
              serviceSettings ? <FormServiceSettings services={ serviceSettings } /> : <FormServiceSettings />
            }

          </div>

          <div className="w-full px-10">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {
                serviceSettings && ( <div className=" text-end">
                  <Link href={ `/admin/services/${serviceSettings.id}/crear` }
                    className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all"
                  >
                    Crear un Servicio
                  </Link>
                </div> )
              }

              {/* Servicios */ }

              {
                serviceSettings && <Services services={ services } serviceSettingsId={ serviceSettings.id } />
              }

              {/* Paginacion */ }
              {
                services.length > 0 && <Paginacion totalPages={ totalPages } />
              }
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}