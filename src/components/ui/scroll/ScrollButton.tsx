// components/ScrollButton.tsx
"use client";

type ScrollButtonProps = {
  targetId: string;
  label: string;
  backgroundColor: string;
};

export default function ScrollButton( { targetId, label, backgroundColor }: ScrollButtonProps ) {
  const handleScroll = () => {
    const targetElement = document.getElementById( targetId );
    targetElement?.scrollIntoView( { behavior: 'smooth' } );
  };

  return (
    <button
      onClick={ handleScroll }
      className="py-2 px-5 font-semibold text-white rounded-md"
      style={ { backgroundColor } }
    >
      { label }
    </button>
  );
}
