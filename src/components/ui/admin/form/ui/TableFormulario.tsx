import { RegistrationForm } from '@prisma/client';


export const TableFormulario = ( { forms }: { forms?: RegistrationForm[]; } ) => {
  return (
    <div className="mt-10 table-responsive">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {
            forms?.map( ( form ) => (
              <tr key={ form.id } className="border-b last:border-b-0 border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    { form.fullName }
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    { form.email }
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    { form.phoneNumber }
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    { form.description }
                  </div>
                </td>
                <td className="px-6 py-4">
                  {/* <div className="text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </a>
                  </div> */}
                </td>
              </tr>
            ) ) }
        </tbody>
      </table>
    </div>
  );
};