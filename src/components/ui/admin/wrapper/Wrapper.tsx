"use client";
import React, { useState } from "react";
import { Sidebar } from '../sidebar/Sidebar';
import { Topnav } from '@/components';

interface Props {
  children: React.ReactNode;
}

export default function Wrapper( { children }: Props ) {
  const [ toggle, setToggle ] = useState( true );
  
  return (
    <div className={ `page-wrapper ${ toggle ? "toggled" : "" }` }>
      <Sidebar />
      <main className="page-content">
        <Topnav toggle={ toggle } setToggle={ setToggle } />
        { children }
      </main>
    </div>
  );
}