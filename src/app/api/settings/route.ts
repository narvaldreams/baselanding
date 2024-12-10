// app/api/settings/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `image-${Date.now()}${path.extname(file.name)}`;
  const uploadPath = path.join(process.cwd(), "public", filename);

  // Asegúrate de que el directorio exista
  const uploadDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Guardar el archivo
  fs.writeFileSync(uploadPath, buffer);

  return NextResponse.json({ fileName: filename });
}
