'use client';

import { useSession } from 'next-auth/react';

export const Profile = () => {

  const { data: session } = useSession();

  return (
    <>
      <h1>Perfil</h1>
      <pre>
        {
          JSON.stringify( session, null, 2 )
        }
      </pre>
      <h3>{ session?.user.role } </h3>
    </>
  );
};