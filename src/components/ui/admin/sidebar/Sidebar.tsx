import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiSolidBookAlt } from 'react-icons/bi';
import { FaImage, FaWpforms } from 'react-icons/fa';
import { IoHomeOutline, IoImageSharp, IoInformationCircleOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import SimpleBarReact from "simplebar-react";



export const Sidebar = () => {
  const [ manu, setManu ] = useState( '' );
  const [ subManu, setSubManu ] = useState( '' );
  const pathname = usePathname();

  useEffect( () => {
    setManu( pathname );
    setSubManu( pathname );
    window.scrollTo( 0, 0 );
  }, [ setManu, setSubManu ] );

  return (
    <nav className="sidebar-wrapper sidebar-dark">

      <div className=" sidebar-content">

        <div className="sidebar-brand">
          <button onClick={ () => window.location.href = '/' } className="sidebar-brand-icon">
            <Image src={ `/uploads/favicon.ico` } width={ 50 } height="24" alt="Logo de la web" />
          </button>
        </div>

        <SimpleBarReact style={ { height: "calc(100% - 70px)" } }>
          <ul className="sidebar-menu border-t border-white/10">
            <li>
              <Link href="/admin" onClick={ ( e ) => { setSubManu( subManu === "/admin" ? "" : "/admin" ); } }><IoHomeOutline className=" me-3 icon " />Inicio</Link>
            </li>
            <li>
              <Link href="/admin/settings" onClick={ ( e ) => { setSubManu( subManu === "/admin/settings" ? "" : "/admin/settings" ); } }><IoSettingsOutline className="me-3 icon" />Configuración</Link>
            </li>
            <li>
              <Link href="/admin/hero" onClick={ ( e ) => { setSubManu( subManu === "/admin/hero" ? "" : "/admin/hero" ); } }><IoImageSharp className="me-3 icon" />Hero / Banner</Link>
            </li>
            <li>
              <Link href="/admin/about" onClick={ ( e ) => { setSubManu( subManu === "/admin/about" ? "" : "/admin/about" ); } }><IoInformationCircleOutline className="me-3 icon" />Sobre Nosotros</Link>
            </li>
            <li>
              <Link href="/admin/services" onClick={ ( e ) => { setSubManu( subManu === "/admin/services" ? "" : "/admin/services" ); } }><MdOutlineMiscellaneousServices className="me-3 icon" />Servicios</Link>
            </li>
            <li>
              <Link href="/admin/parallax" onClick={ ( e ) => { setSubManu( subManu === "/admin/parallax" ? "" : "/admin/parallax" ); } }><FaImage className="me-3 icon" />Parallax</Link>
            </li>
            <li>
              <Link href="/admin/footer" onClick={ ( e ) => { setSubManu( subManu === "/admin/footer" ? "" : "/admin/footer" ); } }><BiSolidBookAlt className="me-3 icon" />Pie de página</Link>
            </li>
            <li>
              <Link href="/admin/form" onClick={ ( e ) => { setSubManu( subManu === "/admin/form" ? "" : "/admin/form" ); } }><FaWpforms className="me-3 icon" />Solicitudes de Contacto</Link>
            </li>
          </ul>
        </SimpleBarReact>
      </div>
    </nav >
  );
};