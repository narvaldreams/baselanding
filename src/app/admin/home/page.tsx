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
      <h5 className="text-xl font-bold">{ session?.user.name }</h5>
      <p>Role: { session?.user.role }</p>
      <p>SiteId: { session?.user.siteId }</p>
    </div>
  );
}
