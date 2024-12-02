import Image from 'next/image';
import Link from 'next/link';

interface Props {
  about: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function About( { about }: Props ) {
  const { id, title, description, imageUrl } = about;

  return (
    <div className="container relative">
      <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
        <div className="md:col-span-5">
          <div className="relative">
            {
              !imageUrl 
              ? (<Image src="/images/business/about02.jpg" width={ 0 } height={ 0 } sizes='100vw' style={ { width: "100%", height: "auto" } } className="rounded-md" alt="" />)
              : (<Image src={ `/images/business/${ imageUrl }` } width={ 0 } height={ 0 } sizes='100vw' style={ { width: "100%", height: "auto" } } className="rounded-md" alt="" />)
            }
            
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="lg:ms-4">
            <h4 className="mb-6 md:text-3xl text-2xl lg:leading-normal leading-normal font-medium">{ title }</h4>
            <p className="text-slate-400 max-w-xl">{ description }</p>
            {/* <Link href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-3">Buy Now <i className="mdi mdi-chevron-right align-middle"></i></Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};