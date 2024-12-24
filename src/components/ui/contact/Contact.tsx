import Image from 'next/image';
import { Formulario } from './ui/Formulario';

interface Props {
  siteColor: string | undefined | null;
  siteColorText: string | undefined | null;
}


export default function Contact( { siteColor, siteColorText }: Props ) {
  return ( <div className="container relative mt-10">
    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
      <div className="lg:col-span-7 md:col-span-6">
        <Image src={ `/uploads/contact.svg` } width={ 450 } height={ 450 } className="mx-auto" alt='Formualio de contacto' />
      </div>

      <div className="lg:col-span-5 md:col-span-6">
        <div className="lg:ms-5">
          <div className="bg-white rounded-md shadow  p-6">
            <h3 className="mb-6 text-2xl leading-normal font-medium">
              Ponte en contacto
            </h3>
            <Formulario siteColor={ siteColor } siteColorText={ siteColorText } />
          </div>
        </div>
      </div>
    </div>
  </div> );
}