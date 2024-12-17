'use client';

import { ServiceRow } from './ServiceRow';

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

export const Services = ( { services }: Props ) => {
  return (
    <>
      {
        services.length > 0
          ? services.map( ( service ) => (
            <ServiceRow key={ service.id } service={ service } />
          ) )
          : <div className="text-center">
            <p className="mt-1 text-xl text-indigo-500">No hay servicios disponibles</p>
          </div>
      }
    </>
  );
};