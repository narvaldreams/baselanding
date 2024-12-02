
interface Props {
  parallax: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function Parallax({ parallax }: Props) {

  const { title, description, imageUrl } = parallax;

  return (
    <section
      className="py-20 w-full table relative bg-center bg-no-repeat bg-cover"
      style={ { backgroundImage: "url('/images/" + imageUrl + "')" } }
    >
      <div className="absolute inset-0 bg-slate-900/70"></div>
      <div className="container relative">
        <div className="grid grid-cols-1 text-center">
          <h3 className="mb-4 md:text-3xl text-2xl text-white font-medium">
            { title }
          </h3>
          <p className="text-white/80 max-w-xl mx-auto">
            { description }
          </p>
        </div>
      </div>
    </section>
  );
}