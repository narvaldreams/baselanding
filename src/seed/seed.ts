import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import { generateSiteId } from "../utils/generateSiteId";

dotenv.config();

interface SeedUser {
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
  siteId: string;
}

interface SeedSiteSettings {
  siteName: string;
  siteLogoUrl: string;
  description: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  siteId: string;
}

interface SeedHero {
  title: string;
  content: string;
  mediaUrl: string;
  mediaType: string;
  siteId: string;
}

interface SeedAboutUs {
  title: string;
  description: string;
  imageUrl: string;
  siteId: string;
}

interface SeedService {
  title: string;
  description: string;
  mediaUrl: string;
  serviceUrl: string;
  siteId: string;
}

interface SeedParallax {
  title: string;
  description: string;
  imageUrl: string;
  siteId: string;
}

interface SeedFooter {
  address: string;
  email: string;
  phoneNumber: string;
  siteId: string;
}

interface InitialData {
  users: SeedUser[];
  services: SeedService[];
  /* siteSettings: SeedSiteSettings;
  hero: SeedHero;
  parallax: SeedParallax;
  aboutUs: SeedAboutUs;
  footer: SeedFooter; */
}

if (process.env.SITE_ID === "" || !process.env.SITE_ID) {
  const siteId = generateSiteId();
  process.env.SITE_ID = siteId;
}

const siteId = process.env.SITE_ID;

export const initialData: InitialData = {
  users: [
    {
      email: "gustavovasquez15@gmail.com",
      name: "Andres Vasquez",
      password: bcryptjs.hashSync("Control.21"),
      role: "admin",
      siteId: siteId!,
    },
    {
      email: "user@base.com",
      name: "Andres Vasquez",
      password: bcryptjs.hashSync("123456789"),
      role: "user",
      siteId: siteId!,
    },
  ],
  services: [
    {
      title: "Web Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "google-logo.png",
      serviceUrl: "https://www.base.com/web-development",
      siteId: siteId!,
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
      siteId: siteId!,
    },
    {
      title: "UI/UX Design",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "",
      serviceUrl: "https://www.base.com/ui-ux-design",
      siteId: siteId!,
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
      siteId: siteId!,
    },
  ],
  /* siteSettings: {
    siteName: "Base Landing",
    siteLogoUrl: "logo-light.png",
    description:
      "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
    googleAnalyticsId: "G-XXXXXXXXXX",
    googleTagManagerId: "GTM-XXXXXXX",
    siteId: siteId!,
  },
  hero: {
    title: "Welcome to Base Landing",
    content:
      "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
    mediaUrl: "https://www.base.com/hero.png",
    mediaType: "image/png",
    siteId: siteId!,
  },
  aboutUs: {
    title: "About Us",
    description:
      "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
    imageUrl: "about02.jpg",
    siteId: siteId!,
  },
  services: [
    {
      title: "Web Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "google-logo.png",
      serviceUrl: "https://www.base.com/web-development",
      siteId: siteId!,
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
      siteId: siteId!,
    },
    {
      title: "UI/UX Design",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "",
      serviceUrl: "https://www.base.com/ui-ux-design",
      siteId: siteId!,
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
      siteId: siteId!,
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
      siteId: siteId!,
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
      siteId: siteId!,
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
      siteId: siteId!,
    },
  ],
  parallax: {
    title: "Parallax",
    description:
      "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
    imageUrl: "team.jpg",
    siteId: siteId!,
  },
  footer: {
    address: "123 Main St, Anytown, USA",
    email: "info@base.com",
    phoneNumber: "(555) 555-5555",
    siteId: siteId!,
  }, */
};
