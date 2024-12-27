import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from './ui/LoginForm';

export default function Page() {
  return (
    <>
      <section className="md:h-screen py-36 flex items-center bg-no-repeat bg-center bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="container relative">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white rounded-md">
              <Link href="/"><Image src="/uploads/favicon.ico" height={ 64 } width={ 72 } className="mx-auto" alt="" /></Link>
              <h5 className="my-6 text-xl font-semibold">Login</h5>
              {/* Formulario de login */}
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
