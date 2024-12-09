import Image from 'next/image';
import Link from 'next/link';

interface Props {
  logoUrl: string;
  description: string;
  footer: {
    id: string;
    address: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function Footer( { logoUrl, footer, description }: Props ) {

  const { address, email, phoneNumber } = footer;

  return (
    <div>
      <footer className="footer bg-dark-footer relative text-gray-200 dark:text-gray-200">
        <div className="container relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="py-[30px] px-0">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                  <div className="lg:col-span-4 md:col-span-12">
                    {
                      logoUrl && (
                        <Link href="/#" className="text-[22px] focus:outline-none">
                          <Image src={ `/uploads/${ logoUrl }` } width={ 50 } height={ 50 } alt="Logo" />
                        </Link>
                      )
                    }

                    <p className="mt-6 text-gray-300">{ description }</p>
                  </div>

                  <div className="lg:col-span-4 md:col-span-12 grid items-center">
                    <div className="text-center">
                      <h5 className="tracking-[1px] text-gray-100 font-semibold">Dirección: { address }</h5>
                      <p className="mt-6 text-gray-300">Email: { email }</p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 md:col-span-12 grid items-center">
                    <div className="text-center">
                      <h5 className="text-gray-100 font-semibold">Telefono: { phoneNumber }</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-[30px] px-0 border-t border-slate-800">
          <div className="container relative text-center">
            <div className="grid items-center">
              <div className="text-center">
                <p className="mb-0">© { new Date().getFullYear() } Techwind. Design & Develop with <i className="mdi mdi-heart text-red-600"></i></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}