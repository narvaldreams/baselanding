
// [1,2,3,4,5,...,50]
export const generePaginationNumbers = ( currentPage: number, totalPages: number ) => {

  // Si el numero total de paginas es 7 o menos
  // Vamos a mostarr todas las paginas sin puntos suspensivos
  if( totalPages <= 7 ){
    return Array.from({ length: totalPages}, (_ , i) => i + 1);
  }

  // Si la pagina actual esta entre las primeras tres paginas
  // mostarr las primeras 3, puntos suspensivos, y las ultimas dos paginas
  if( currentPage <= 3 ){
    return [1,2,3, '...', totalPages - 1, totalPages];
  }

  // Si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras dos paginas, puntos suspensivos, y las ultimas tres paginas
  if( currentPage >= totalPages - 2 ){
    return [1,2,'...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la pagina actual esta en otro lugar medio
  // mostrar la primer pagina, puntos suspensivos, la pagina actual, puntos suspensivos y vecinos
  return [1,'...', currentPage -1, '...', currentPage , currentPage + 1, '...', totalPages];

}