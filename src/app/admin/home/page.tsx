'use client';

import { logout } from '@/actions/auth/logout';
import { Profile } from '@/components/ui/profile/Profile';
import { useEffect, useState } from 'react';

export default function HomePage() {


  const [ loaded, setLoaded ] = useState<boolean>( false );

  const onLogout = async () => {
    await logout();
    window.location.replace( '/auth/login' );
  };

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded ) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Admin Home</h1>
      <p>Welcome to the admin home page.</p>
      <Profile />
      <button className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full" onClick={ () => onLogout() }>Salir</button>
    </div>
  );
}
