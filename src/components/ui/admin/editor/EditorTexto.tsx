'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { useController, Control } from 'react-hook-form';
import { useState } from 'react';
import { CharacterCount } from '@tiptap/extension-character-count';

interface MenuBarProps {
  editor: Editor | null;
}

interface EditorTextoProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  maxCharacters?: number;
}

const MenuBar = ( { editor }: MenuBarProps ) => {
  if ( !editor ) return null;


  const handleClick = ( callback: () => boolean ) => ( e: React.MouseEvent ) => {
    e.preventDefault();
    callback();
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b mb-4">
      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleBold().run() ) }
          className={ `p-2 ${ editor.isActive( 'bold' ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Bold
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleItalic().run() ) }
          className={ `p-2 ${ editor.isActive( 'italic' ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Italic
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleStrike().run() ) }
          className={ `p-2 ${ editor.isActive( 'strike' ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Strike
        </button>
      </div>

      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={ handleClick( () => editor.chain().focus().setParagraph().run() ) }
          className={ `p-2 ${ editor.isActive( 'paragraph' ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          P
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleHeading( { level: 1 } ).run() ) }
          className={ `p-2 ${ editor.isActive( 'heading', { level: 1 } ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          H1
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleHeading( { level: 2 } ).run() ) }
          className={ `p-2 ${ editor.isActive( 'heading', { level: 2 } ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          H2
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleHeading( { level: 3 } ).run() ) }
          className={ `p-2 ${ editor.isActive( 'heading', { level: 3 } ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          H3
        </button>
      </div>

      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleBulletList().run() ) }
          className={ `p-2 ${ editor.isActive( 'bulletList' ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Bullet
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleOrderedList().run() ) }
          className={ `p-2 ${ editor.isActive( 'orderedList' ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Numbered
        </button>
      </div>

      <div className="flex gap-1 border-r pr-2">
        <button
          onClick={ handleClick( () => editor.chain().focus().setTextAlign( 'left' ).run() ) }
          className={ `p-2 ${ editor.isActive( { textAlign: 'left' } ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Left
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().setTextAlign( 'center' ).run() ) }
          className={ `p-2 ${ editor.isActive( { textAlign: 'center' } ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Center
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().setTextAlign( 'right' ).run() ) }
          className={ `p-2 ${ editor.isActive( { textAlign: 'right' } ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Right
        </button>
      </div>

      <div className="flex gap-1">
        <button
          onClick={ handleClick( () => editor.chain().focus().toggleBlockquote().run() ) }
          className={ `p-2 ${ editor.isActive( 'blockquote' ) ? 'bg-gray-200' : '' }` }
          type="button"
        >
          Quote
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().setHorizontalRule().run() ) }
          className="p-2"
          type="button"
        >
          Line
        </button>
      </div>

      <div className="flex gap-1 border-l pl-2">
        <button
          onClick={ handleClick( () => editor.chain().focus().undo().run() ) }
          disabled={ !editor.can().undo() }
          className="p-2 disabled:opacity-50"
          type="button"
        >
          Deshacer
        </button>
        <button
          onClick={ handleClick( () => editor.chain().focus().redo().run() ) }
          disabled={ !editor.can().redo() }
          className="p-2 disabled:opacity-50"
          type="button"
        >
          Rehacer
        </button>
      </div>
    </div>
  );
};

export const EditorTexto = ( {
  name,
  control,
  defaultValue = '<p></p>',
  maxCharacters = 200, // Límite de caracteres configurable
}: EditorTextoProps ) => {
  const [ isLoading, setIsLoading ] = useState( true );
  const { field } = useController( { name, control, defaultValue } );

  const editor = useEditor( {
    extensions: [
      StarterKit.configure( {
        heading: { levels: [ 1, 2, 3 ] }, // Activa niveles de encabezados específicos
      } ),
      TextAlign.configure( {
        types: [ 'heading', 'paragraph' ], // Configura correctamente para no interferir con Heading
      } ),
      CharacterCount.configure( {
        limit: maxCharacters,
      } ),
    ],
    content: field.value,
    onUpdate: ( { editor } ) => {
      field.onChange( editor.getHTML() ); // Actualiza el contenido
    },
    onCreate: () => {
      setIsLoading( false );
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose max-w-none focus:outline-none',
      },
    },
  } );
  
  // Verificación del conteo de caracteres en cada actualización
  const characterCount = editor?.storage.characterCount.characters();

  if ( isLoading ) {
    return (
      <div className="text-center">
        <p>Cargando contenido...</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg focus:outline-indigo-600 border-gray-300">
      <MenuBar editor={ editor } />
      <div className="p-4 border-gray-600">
        <EditorContent editor={ editor } />
        <div className="text-right mt-2 text-sm text-gray-500">
          { characterCount }/{ maxCharacters } caracteres
        </div>
      </div>
    </div>
  );
};

export default EditorTexto;