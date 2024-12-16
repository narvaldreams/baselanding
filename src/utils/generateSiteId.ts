// utils/generateSiteId.js
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export const generateSiteId = () => {
  const siteId = uuidv4();

  const envPath = path.resolve(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `\nSITE_ID=${siteId}\n`);
  } else {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    if (!envContent.includes('SITE_ID=')) {
      fs.appendFileSync(envPath, `\nSITE_ID=${siteId}\n`);
    }
  }
  return siteId;
};
