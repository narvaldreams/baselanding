import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { PiBrowsersBold } from 'react-icons/pi';
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
            <li className={ `sidebar-dropdown ${ [ "", "/", "/index-crypto", "/index-ecommerce" ].includes( manu ) ? "active" : "" }` }>
              <Link href="#" onClick={ ( e ) => { setSubManu( subManu === "dashboard-item" ? "" : "dashboard-item" ); } }><AiOutlineLineChart className="me-3 icon " />Dashboard</Link>
              <div className={ `sidebar-submenu ${ [ "/", "/index-crypto", "/dashboard-item", "/index-ecommerce", "" ].includes( subManu ) ? "block" : "" }` }>
                <ul>
                  <li className={ manu === "/" || "" ? "active" : "" }><Link href="/index">Analytics</Link></li>
                  <li className={ manu === "/index-crypto" ? "active" : "" }><Link href="/index-crypto">Cryptocurrency </Link></li>
                  <li className={ manu === "/index-ecommerce" ? "active" : "" }><Link href="/index-ecommerce">eCommerce <span className="bg-yellow-500 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">New</span></Link></li>
                </ul>
              </div>
            </li>

            <li className={ `sidebar-dropdown ${ [ "/index-dark", "/index-rtl", "/index-dark-rtl", "/index-sidebar-light", "/index-sidebar-colored" ].includes( manu ) ? "active" : "" }` }>
              <Link href="#" onClick={ ( e ) => { setSubManu( subManu === "/index-item" ? "" : "/index-item" ); } }><PiBrowsersBold className=" me-3 icon " />Layouts</Link>
              <div className={ `sidebar-submenu ${ [ "/index-dark", "/index-rtl", "/index-dark-rtl", "/index-sidebar-light", "/index-sidebar-colored", "/index-item" ].includes( subManu ) ? "block" : "" }` }>
                <ul>
                  <li className={ manu === "/index-dark" ? "active" : "" }><Link href="/index-dark">Dark Dashboard</Link></li>
                  <li className={ manu === "/index-rtl" ? "active" : "" }><Link href="/index-rtl">RTL Dashboard</Link></li>
                  <li className={ manu === "/index-dark-rtl" ? "active" : "" }><Link href="/index-dark-rtl">Dark RTL Dashboard</Link></li>
                  <li className={ manu === "/index-sidebar-light" ? "active" : "" }><Link href="/index-sidebar-light">Light Sidebar</Link></li>
                  <li className={ manu === "/index-sidebar-colored" ? "active" : "" }><Link href="/index-sidebar-colored">Colored Sidebar</Link></li>
                </ul>
              </div>
            </li></ul>
        </SimpleBarReact>
      </div>
    </nav >
  );
};