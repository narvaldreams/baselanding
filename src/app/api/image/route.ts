// app/api/verificar-imagen/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

interface VerificarImagenQuery {
  nombre_imagen: string;
}

export async function GET(request: Request) {
  try {

    const url = new URL(request.url);
    const nombre_imagen = url.searchParams.get("nombre_imagen");

    if (!nombre_imagen) {
      return NextResponse.json(
        { error: 'Falta el parámetro "nombre_imagen"' },
        { status: 400 }
      );
    }

    const rutaImagen = path.join(
      process.cwd(),
      "public",
      nombre_imagen
    );

    await fs.promises.access(rutaImagen, fs.constants.F_OK);

    return NextResponse.json({ existe: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ existe: false }, { status: 404 });
  }
}
