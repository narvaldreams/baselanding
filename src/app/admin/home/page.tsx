'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function HomePage() {

  const { data: session } = useSession();
  const [ loaded, setLoaded ] = useState<boolean>( false );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded && !session?.user ) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2 className="text-slate-400 font-semibold text-3xl">Bienvenid@!</h2>
      <h5 className="text-x">Usuario: <strong>{ session?.user.name }</strong></h5>
      <p>Role: <strong>{ session?.user.role ? 'Administrador' : 'Usuario' }</strong></p>
      <p>SiteId: <strong>{ session?.user.siteId }</strong></p>
    </div>
  );
}
