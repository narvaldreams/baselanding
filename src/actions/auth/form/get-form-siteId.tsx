'use server';

import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
  siteId: string;
}


export const getFormSiteId = async ( { page = 1, take = 3, siteId }: PaginationOptions ) => {

  try {
    const forms = await prisma.registrationForm.findMany( {
      where: {
        siteId: siteId,
      }
    } );

    const totalCount = await prisma.registrationForm.count( {
      where: {
        siteId: siteId,
      },
    } );

    // Calcular el número total de páginas
    const totalPages = Math.ceil( totalCount / take );
    return {
      forms: forms,
      totalPages: totalPages,
    };
  } catch ( error ) {
    throw new Error( 'No se pudieron obtener los formularios' );
  }

};