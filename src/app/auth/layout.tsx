import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function RootLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {

  const session = await auth();

  if ( session ) {
    return redirect( '/admin' );
  }


  return (
    <main>
      { children }
    </main>
  );
}
