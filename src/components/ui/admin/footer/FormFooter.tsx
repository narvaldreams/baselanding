export const FormFooter = () => {
  return (
    <form className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Configuración pie de página</h2>
      <p className="mt-1 text-sm/6 text-gray-600">Aca puedes configurar los detalles de la pie de página.</p>



      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        <div className="sm:col-span-3">
          <label htmlFor="siteName" className="block text-sm/6 font-medium text-gray-900">Dirección</label>
          <div className="mt-2">
            <input
              type="text"
              id="siteName"
              placeholder="Ingresa la dirección"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Email</label>
          <div className="mt-2">
            <input
              type="text"
              id="siteName"
              placeholder="Ingresa el email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Telefono</label>
          <div className="mt-2">
            <input
              type="text"
              id="siteName"
              placeholder="Ingresa el numero de telefono"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3 text-end">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};