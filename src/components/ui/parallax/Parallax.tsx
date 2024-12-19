
interface Props {
  siteColor: string | undefined | null;
  parallax: {
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null | undefined;
}
export default function Parallax( { parallax, siteColor }: Props ) {

  const { title = '', description = '', imageUrl } = parallax || {};

  return (
    <section
      className="py-20 w-full table relative bg-center bg-no-repeat bg-cover"
      style={ { backgroundImage: imageUrl ? `url(${ imageUrl })` : `url(/images/${ imageUrl })` } }
    >
      <div
        className="absolute inset-0 bg-slate-900/70"
      ></div>
      <div className="container relative">
        <div className="grid grid-cols-1 text-center">
          <h3 className="mb-4 md:text-3xl text-2xl text-white font-medium">
            { title ? title : 'Titulo del parallax' }
          </h3>
          <p className="text-white/80 max-w-xl mx-auto">
            { description ? description : 'Descripción del parallax' }
          </p>
        </div>
      </div>
    </section>

  );
}