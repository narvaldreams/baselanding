import React from 'react';

const DynamicContent = ( { htmlContent, colorText }: { htmlContent: string; colorText: string; } ) => {
  return (
    <div
      className="mt-6"
      style={ { color: colorText } }
      dangerouslySetInnerHTML={ { __html: htmlContent } }
    />
  );
};

interface Props {
  text: string;
  colorText: string;
}

export default function ContenidoDynamico( { text, colorText }: Props ) {
  return (
    <DynamicContent
      htmlContent={ text }
      colorText={ colorText }
    />
  );
}
