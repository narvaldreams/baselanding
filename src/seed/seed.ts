import bcryptjs from "bcryptjs";

interface SeedUser {
  email: string;
  name: string;
  password: string;
  role: "admin" | "user";
}

interface SeedSiteSettings {
  siteName: string;
  siteLogoUrl: string;
  description: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
}

interface SeedHero {
  title: string;
  content: string;
  mediaUrl: string;
  mediaType: string;
}

interface SeedAboutUs {
  title: string;
  description: string;
  imageUrl: string;
}

interface SeedService {
  title: string;
  description: string;
  mediaUrl: string;
  serviceUrl: string;
}

interface SeedParallax {
  title: string;
  description: string;
  imageUrl: string;
}

interface SeedFooter {
  address: string;
  email: string;
  phoneNumber: string;
}

interface InitialData {
  users: SeedUser[];
  siteSettings: SeedSiteSettings;
  hero: SeedHero;
  aboutUs: SeedAboutUs;
  services: SeedService[];
  parallax: SeedParallax;
  footer: SeedFooter;
}

export const initialData: InitialData = {
  users: [
    {
      email: "gustavovasquez15@gmail.com",
      name: "Andres Vasquez",
      password: bcryptjs.hashSync("Control.21"),
      role: "admin",
    },
    {
      email: "user@base.com",
      name: "Andres Vasquez",
      password: bcryptjs.hashSync("123456789"),
      role: "user",
    },
  ],
  siteSettings: {
    siteName: "Base Landing",
    siteLogoUrl: "logo-light.png",
    description:
      "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
    googleAnalyticsId: "G-XXXXXXXXXX",
    googleTagManagerId: "GTM-XXXXXXX",
  },
  hero: {
    title: "Welcome to Base Landing",
    content:
      "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
    mediaUrl: "https://www.base.com/hero.png",
    mediaType: "image/png",
  },
  aboutUs: {
    title: "About Us",
    description:
      "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
    imageUrl: "about02.jpg",
  },
  services: [
    {
      title: "Web Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "google-logo.png",
      serviceUrl: "https://www.base.com/web-development",
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
    },
    {
      title: "UI/UX Design",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "",
      serviceUrl: "https://www.base.com/ui-ux-design",
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
    },
    {
      title: "Mobile Development",
      description:
        "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
      mediaUrl: "android.png",
      serviceUrl: "https://www.base.com/mobile-development",
    },
  ],
  parallax: {
    title: "Parallax",
    description:
      "Base Landing is a free and open-source landing page template built with Tailwind CSS and Next.js.",
    imageUrl: "team.jpg",
  },
  footer: {
    address: "123 Main St, Anytown, USA",
    email: "info@base.com",
    phoneNumber: "(555) 555-5555",
  },
};
