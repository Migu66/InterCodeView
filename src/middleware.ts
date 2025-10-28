import { auth } from "@/lib/auth-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface AuthRequest extends NextRequest {
    auth?: unknown;
}

export default auth((req: AuthRequest) => {
    // Forzar HTTPS en producción
    if (
        process.env.NODE_ENV === "production" &&
        req.headers.get("x-forwarded-proto") !== "https"
    ) {
        const url = req.nextUrl.clone();
        url.protocol = "https:";
        return NextResponse.redirect(url, 301);
    }

    // Continuar con la solicitud normal
    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth (NextAuth routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
};
