import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast";
import { AuthProvider } from "@/contexts/AuthContext";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

// Optimización de fuentes
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    variable: "--font-inter",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://inter-code-view.vercel.app"),
    title: {
        default:
            "InterCodeView - Plataforma de Entrevistas Técnicas de Programación",
        template: "%s | InterCodeView",
    },
    description:
        "Plataforma interactiva para preparar entrevistas técnicas de programación. Practica con ejercicios de código en múltiples lenguajes: Python, JavaScript, Java, C++, TypeScript y más. Mejora tus habilidades de coding.",
    keywords: [
        "entrevistas técnicas",
        "programación",
        "coding",
        "ejercicios de programación",
        "práctica de código",
        "preparación entrevistas",
        "leetcode",
        "hackerrank",
        "Python",
        "JavaScript",
        "Java",
        "TypeScript",
        "C++",
        "desarrollo de software",
    ],
    authors: [{ name: "InterCodeView" }],
    creator: "InterCodeView",
    publisher: "InterCodeView",
    icons: {
        icon: [
            { url: "/medalla.ico", sizes: "any" },
            { url: "/medalla.ico", sizes: "16x16", type: "image/x-icon" },
            { url: "/medalla.ico", sizes: "32x32", type: "image/x-icon" },
        ],
        shortcut: "/medalla.ico",
        apple: "/medalla.ico",
    },
    openGraph: {
        type: "website",
        locale: "es_ES",
        url: "https://inter-code-view.vercel.app",
        title: "InterCodeView - Plataforma de Entrevistas Técnicas de Programación",
        description:
            "Practica y mejora tus habilidades de programación con ejercicios interactivos para entrevistas técnicas en múltiples lenguajes.",
        siteName: "InterCodeView",
    },
    twitter: {
        card: "summary_large_image",
        title: "InterCodeView - Entrevistas Técnicas de Programación",
        description:
            "Plataforma interactiva para preparar entrevistas técnicas con ejercicios de código.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: "https://inter-code-view.vercel.app",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={inter.variable}>
            <body className={inter.className}>
                <SessionProviderWrapper>
                    <AuthProvider>
                        {children}
                        <ToastContainer />
                    </AuthProvider>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
