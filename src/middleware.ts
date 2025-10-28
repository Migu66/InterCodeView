import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Forzar HTTPS en producción
    if (
        process.env.NODE_ENV === "production" &&
        req.headers.get("x-forwarded-proto") !== "https"
    ) {
        const url = req.nextUrl.clone();
        url.protocol = "https:";
        return NextResponse.redirect(url, 301);
    }

    // Añadir headers de rendimiento
    const response = NextResponse.next();

    // Early hints para recursos críticos
    if (process.env.NODE_ENV === "production") {
        response.headers.set("X-DNS-Prefetch-Control", "on");
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
