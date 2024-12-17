import { Wrapper } from '@/components';
import { getServices } from '@/actions/auth/services/get-services';
import Link from 'next/link';
import { ServiceRow } from './ui/ServiceRow';
import { Paginacion } from './ui/Paginacion';
import { Services } from './ui/Services';



interface Props {
  searchParams: Promise<{ page?: string; }>;
}

export default async function ServicesPage( { searchParams }: Props ) {

  const { page: pageSearchParams } = await searchParams;

  const page = pageSearchParams ? parseInt( pageSearchParams ) : 1;

  const { services, totalPages } = await getServices( { page } );

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            <div className="w-full px-10">
              <h2 className="text-base/7 font-semibold text-gray-900">Servicios</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Aca puedes configurar los servicios que ofrecemos.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className=" text-end">
                  <Link href="/admin/services/crear"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all"
                  >
                    Crear nuevo servicio
                  </Link>
                </div>
                {
                  services.length < 0 && <p className="mt-1 text-sm/6 text-indigo-500">No hay servicios disponibles</p>
                }

                {/* Servicios */ }
                <Services services={ services } />
                {/* Paginacion */}
                {
                  services.length > 0 && <Paginacion totalPages={ totalPages } />
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    </Wrapper>
  );
}