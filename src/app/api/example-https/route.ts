// Ejemplo de uso del helper enforceHTTPS en una API route

import { NextRequest, NextResponse } from "next/server";
import { enforceHTTPS } from "@/lib/https";

export async function GET(request: NextRequest) {
    // Verificar HTTPS al inicio de la función
    const httpsCheck = enforceHTTPS(request);
    if (httpsCheck) {
        return httpsCheck; // Retorna la redirección si no es HTTPS
    }

    // Tu lógica de API aquí...
    return NextResponse.json({ message: "API funcionando con HTTPS" });
}

export async function POST(request: NextRequest) {
    // También puedes usarlo en POST, PUT, DELETE, etc.
    const httpsCheck = enforceHTTPS(request);
    if (httpsCheck) {
        return httpsCheck;
    }

    const body = await request.json();

    // Tu lógica aquí...
    return NextResponse.json({ success: true, data: body });
}
