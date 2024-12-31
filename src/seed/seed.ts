import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import { generateSiteId } from "../utils/generateSiteId";

dotenv.config();

interface SeedUser {
  email: string;
  name: string;
  password: string;
  password_change_required: boolean;
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
  users: SeedUser[]
}

if (process.env.SITE_ID === "" || !process.env.SITE_ID) {
  const siteId = generateSiteId();
  process.env.SITE_ID = siteId;
}

const siteId = process.env.SITE_ID;

console.log(siteId);

export const initialData: InitialData = {
  users: [
    {
      email: "admin@admin.com",
      name: "Administrador",
      password: bcryptjs.hashSync("administrador"),
      role: "admin",
      password_change_required: true,
      siteId: siteId,
    }
  ]
};
