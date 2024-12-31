import { getFormSiteId } from '@/actions/auth/form/get-form-siteId';
import { Wrapper } from '@/components';
import { Paginacion } from '../services/ui/Paginacion';
import { TableFormulario } from '@/components/ui/admin/form/ui/TableFormulario';
import siteId from '@/utils/getSiteId';

interface Props {
  searchParams: Promise<{ page?: string; }>;
}

export default async function FormPage( { searchParams }: Props ) {

  const { page: pageSearchParams } = await searchParams;

  const page = pageSearchParams ? parseInt( pageSearchParams ) : 1;

  const { forms, totalPages } = await getFormSiteId( { page, siteId: siteId } );

  return (
    <Wrapper>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="flex justify-between items-center">

            <div className="w-full px-10">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Formularios
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Aca puedes ver los formularios registrados.
              </p>

              {
                forms?.length === 0 ? <div className="mt-10 text-center"><p>No hay formularios registrados</p></div> : <TableFormulario forms={ forms } />
              }

              {
                forms.length > 0 && <Paginacion totalPages={ totalPages } />
              }

            </div>

          </div>
        </div>
      </div>
    </Wrapper>
  );
};;