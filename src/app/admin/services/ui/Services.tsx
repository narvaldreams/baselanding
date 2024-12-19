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
  siteId: string;
  serviceModuleId: string;
}

interface Props {
  services: Service[];
  serviceSettingsId: string;
}

export const Services = ( { services, serviceSettingsId }: Props ) => {
  return (
    <>
      {
        services.length > 0
          ? services.map( ( service ) => (
            <ServiceRow key={ service.id } service={ service } serviceSettingsId={ serviceSettingsId } />
          ) )
          : <div className="text-center">
            <p className="mt-1 text-xl text-indigo-500">No hay servicios disponibles</p>
          </div>
      }
    </>
  );
};