import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>[ 'className' ];
  style?: React.StyleHTMLAttributes<HTMLImageElement>[ 'style' ];
  width: number;
  height: number;
}

export const CustomImage = ( {
  src,
  alt,
  className,
  style,
  width,
  height
}: Props ) => {

  const localSrc = ( src )
    ? src.startsWith( 'http' )
      ? src
      : "/uploads/no-image.jpg"
    : "/uploads/favicon.ico"

  return (
    <Image
      src={ localSrc }
      width={ width }
      height={ height }
      alt={ alt }
      className={ className }
      style={ style }
    />
  );
};