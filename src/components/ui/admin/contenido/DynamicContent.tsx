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
          h1 {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          h2 {
            font-size: 1.25em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          h3 {
            font-size: 1.1em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          p {
            font-size: 1em;
            margin-bottom: 1em;
            line-height: 1.6;
          }
          strong {
            font-weight: bold;
          }
          em, i {
            font-style: italic;
          }
          del {
            text-decoration: line-through;
          }
          blockquote {
            font-size: 1em;
            font-style: italic;
            margin: 1em 0;
            padding-left: 1em;
            border-left: 4px solid ${colorText};
          }
          ul {
            margin: 1em 0;
            padding-left: 1.5em;
            list-style-type: disc;
          }
          ol {
            margin: 1em 0;
            padding-left: 1.5em;
            list-style-type: decimal;
          }
          li {
            font-size: 1em;
            margin-bottom: 0.5em;
          }
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
