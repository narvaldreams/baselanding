'use client';
import { CustomImage } from '@/components/image/CustomImage';
import ContenidoDynamico from '../admin/contenido/DynamicContent';
interface Props {
  about: {
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null | undefined;
}

export default function About( { about }: Props ) {

  const { title = '', description = '', imageUrl } = about || {};

  return (
    <div className="container relative">
      <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
        <div className="md:col-span-5">
          <div className="relative">

            <CustomImage src={ imageUrl ? imageUrl : '/uploads/no-image.jpg' } width={ 600 } height={ 600 } className="mx-auto" alt={ title ? title : 'Imagen sobre nosotros' } />

          </div>
        </div>

        <div className="md:col-span-7">
          <div className="lg:ms-4">
            <h4 className="mb-6 text-4xl lg:leading-normal leading-normal font-medium">{ title ? title : 'Titulo sobre nosotros' }</h4>
            <div className="max-w-xl text-lg">
              <ContenidoDynamico text={ description ? description : 'Contenido sobre nosotros' } colorText="#94a3b8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};