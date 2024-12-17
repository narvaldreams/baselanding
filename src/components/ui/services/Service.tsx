import ServicesGrid from './ServicesGrid';

export interface Service {
  id: string;
  title: string;
  description: string;
  mediaUrl: string | null;
  serviceUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  services: Service[];
}

export default function Service( { services }: Props ) {
  return (
    <div className="container relative md:mt-24 mt-16 md:mb-24 mb-10">
      <div className="grid grid-cols-1 pb-8 text-center">
        <h6 className="text-indigo-600 text-xl font-bold uppercase mb-2">Servicios</h6>
        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">¿Que ofrecemos?</h3>
        <p className="text-slate-400 max-w-xl mx-auto">Salen de nosotros y caen en una gran falta.</p>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl place-items-center">
          { services.map( ( service ) => (
            <ServicesGrid key={ service.id } service={ service } />
          ) ) }
        </div>
      </div>
    </div>
  );
}