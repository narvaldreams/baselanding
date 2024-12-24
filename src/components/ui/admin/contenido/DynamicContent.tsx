import React from 'react';

const DynamicContent = ({ htmlContent, colorText }: { htmlContent: string; colorText: string; }) => {
  return (
    <div
      className="mt-6"
      style={{ 
        color: colorText,
      }}
    >
      <style>
        {`
          h1 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
          h2 { font-size: 1.25em; font-weight: bold; margin-bottom: 0.5em; }
          h3 { font-size: 1.1em; font-weight: bold; margin-bottom: 0.5em; }
        `}
      </style>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

interface Props {
  text: string;
  colorText: string;
}

export default function ContenidoDynamico({ text, colorText }: Props) {
  return (
    <DynamicContent
      htmlContent={text}
      colorText={colorText}
    />
  );
}