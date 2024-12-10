import { ServiceRow } from './ServiceRow';

interface Service {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  serviceUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  services: Service[];
}

export const Services = ( { services }: Props ) => {

  return (
    <div className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Servicios</h2>
      <p className="mt-1 text-sm/6 text-gray-600">Aca puedes configurar los servicios que ofrecemos.</p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className=" text-end">
          <a href="#" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all">
            Crear nuevo servicio
          </a>
        </div>
        {
          services.map( ( service ) => (
            <ServiceRow key={ service.id } service={ service } />
          ) )
        }
      </div>

    </div>
  );
};