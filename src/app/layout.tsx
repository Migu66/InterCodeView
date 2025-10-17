import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "InterCodeView",
    description: "Plataforma de entrevistas técnicas",
    icons: {
        icon: [
            {
                url: "/InterCodeViewLogo_resized.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/InterCodeViewLogo_resized.png",
                sizes: "16x16",
                type: "image/png",
            },
        ],
        apple: "/InterCodeViewLogo_resized.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
