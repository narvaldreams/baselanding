'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  logoUrl: string;
}

export default function TopMenu({ logoUrl }: Props) {


  return (
    <nav id="topnav" className="defaultscroll bg-slate-900 nav-sticky">
      <div className="container relative justify-center">

        <Link className="logo" href="/index">
          <Image src={`/uploads/${logoUrl}`} width={ 50 } height={ 50 } className="hidden dark:inline-block" alt="" />
        </Link>

        {/* <ul className="navigation-menu nav-light">
          <li className={ manu === "/" || "" ? "active" : "" }><Link href="/" className="sub-menu-item">Home</Link></li>

          <li className={ `${ [ "/index-saas", "/index-classic-saas", "/index-modern-saas", "/index-apps", "/index-classic-app", "/index-ai", "/index-smartwatch", "/index-marketing", "/index-seo", "/index-software", "/index-payment", "/index-charity", "/index-it-solution", "/index-it-solution-two", "/index-digital-agency", "/index-restaurent", "/index-hosting", "/index-nft", "/index-hotel", "/index-travel", "/index-cafe", "/index-gym", "/index-yoga", "/index-spa", "/index-job", "/index-startup", "/index-business", "/index-corporate", "/index-corporate-two", "/index-real-estate", "/index-consulting", "/index-insurance", "/index-construction", "/index-law", "/index-video", "/index-personal", "/index-portfolio", "/index-photography", "/index-studio", "/index-coworking", "/index-course", "/index-event", "/index-podcast", "/index-hospital", "/index-phone-number", "/index-forums", "/index-shop", "/index-crypto", "/index-landing-one", "/index-landing-two", "/index-landing-three", "/index-landing-four", "/index-service", "/index-food-blog", "/index-blog", "/index-furniture", "/index-landing-five", "/index-life-coach", "/index-landing-six", "/index-web-programming", "/index-cleaner" ].includes( manu ) ? "active" : "" } has-submenu parent-parent-menu-item` } >
            <Link href="#" >Landings</Link>
          </li>

          <li className={ `${ [ "/page-aboutus", "/page-services", "/page-team", "/page-pricing", "/page-testimonial", "/user-profile", "/user-billing", "/user-payment", "/user-invoice", "/user-notification", "/user-setting", "/property-listing", "/property-detail", "/course-listing", "/course-detail", "/nft-explore", "/nft-auction", "/nft-collection", "/nft-creators", "/nft-creator-profile", "/nft-creator-profile-edit", "/nft-wallet", "/nft-create-item", "/nft-detail", "/food-recipe", "/shop-grid", "/shop-grid", "/shop-grid-two", "/shop-item-detail", "/shop-cart", "/shop-checkout", "/food-recipe", "/shop-grid", "/shop-grid-two", "/shop-item-detail", "/shop-cart", "/shop-checkout", "/shop-account", "/food-recipe", "/shop-grid", "/shop-grid-two", "/shop-item-detail", "/shop-cart", "/shop-checkout", "/shop-account", "/photography-about", "/photography-portfolio", "/page-job-grid", "/page-job-detail", "/page-job-apply", "/page-job-post", "/page-job-career", "/page-job-candidates", "/page-job-candidate-detail", "/page-job-companies", "/page-Job-company-detail", "/forums-topic", "/forums-comments", "/helpcenter-overview", "/helpcenter-faqs", "/helpcenter-guides", "/helpcenter-support", "/blog", "/blog-sidebar", "/blog-detail", "/blog-standard-post", "/blog-slider-post", "/blog-gallery-post", "/blog-youtube-post", "/blog-vimeo-post", "/blog-audio-post", "/blog-blockquote-post", "/blog-left-sidebar-post", "/email-confirmation", "/email-password-reset", "/email-alert", "/email-invoice", "/auth-login", "/auth-signup", "/auth-re-password", "/auth-lock-screen", "/page-terms", "/page-privacy", "/page-comingsoon", "/page-maintenance", "/page-error", "/page-thankyou", "/contact-detail", "/contact-one", "/contact-two", "/page-services", "/page-service-detail" ].includes( manu ) ? "active" : "" } has-submenu parent-parent-menu-item` }>
            <Link href="#!">Pages</Link>
          </li>

        </ul> */}
      </div >
    </nav >
  );
};