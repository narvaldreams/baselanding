import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
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
          <Link href="/"><Image src='/images/logo-light.png' placeholder="blur" blurDataURL="/images/logo-light.png" width={ 138 } height="24" alt="" /></Link>
        </div>

        <SimpleBarReact style={ { height: "calc(100% - 70px)" } }>
          <ul className="sidebar-menu border-t border-white/10">
            <li>
              <Link href="/admin" onClick={ ( e ) => { setSubManu( subManu === "/admin" ? "" : "/admin" ); } }><IoHomeOutline className=" me-3 icon " />Inicio</Link>
            </li>
            <li>
              <Link href="/admin/settings" onClick={ ( e ) => { setSubManu( subManu === "/admin/settings" ? "" : "/admin/settings" ); } }><IoSettingsOutline className=" me-3 icon " />Configuración</Link>
            </li>
          </ul>
        </SimpleBarReact>
      </div>
    </nav >
  );
};