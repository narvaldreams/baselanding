'use client';
import { CustomImage } from '@/components/image/CustomImage';
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
            <p className="text-slate-400 max-w-xl text-lg">{ description ? description : 'Laboris aliquip duis pariatur proident. Exercitation aliqua duis labore proident quis tempor irure qui deserunt. Culpa magna adipisicing ullamco labore. Nostrud magna do sit esse non minim. Exercitation culpa sunt culpa proident in nostrud nulla esse excepteur ex deserunt sint tempor adipisicing.' }</p>
            {/* <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-3">Buy Now <i className="mdi mdi-chevron-right align-middle"></i></Link> */ }
          </div>
        </div>
      </div>
    </div>
  );
};