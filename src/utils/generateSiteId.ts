import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export const generateSiteId = () => {
  const siteId = uuidv4();
  const envPath = path.resolve(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, `SITE_ID=${siteId}\n`);
  } else {
    let envContent = fs.readFileSync(envPath, 'utf-8');
    
    const regex = /^SITE_ID=(.*)$/m;
    const match = envContent.match(regex);

    if (!match || !match[1]?.trim()) {
      // Si no existe la clave SITE_ID o está vacía, agrega o actualiza la variable.
      if (match) {
        // Reemplaza el SITE_ID existente pero vacío
        envContent = envContent.replace(regex, `SITE_ID=${siteId}`);
      } else {
        // Añade SITE_ID al final si no existe
        envContent += `\nSITE_ID=${siteId}`;
      }
      fs.writeFileSync(envPath, envContent);
    }
  }
  return siteId;
};
