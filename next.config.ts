import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Optimizaciones de rendimiento
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,

    // Optimización de imágenes
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 31536000,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Optimización de compilación
    compiler: {
        removeConsole:
            process.env.NODE_ENV === "production"
                ? {
                      exclude: ["error", "warn"],
                  }
                : false,
    },

    // Optimización experimental
    experimental: {
        optimizePackageImports: [
            "lucide-react",
            "react-icons",
            "@monaco-editor/react",
        ],
    },
    async headers() {
        return [
            {
                // Recursos estáticos con caché largo
                source: "/medalla.ico",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                // Assets estáticos
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                // Imágenes
                source: "/:all*.(png|jpg|jpeg|gif|webp|avif|svg|ico)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                // Aplicar headers a todas las rutas
                source: "/:path*",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://accounts.google.com https://cdn.jsdelivr.net; img-src 'self' data: https: blob:; font-src 'self' data: https://cdn.jsdelivr.net; connect-src 'self' https://res.cloudinary.com https://accounts.google.com https://github.com https://cdn.jsdelivr.net; frame-src https://accounts.google.com; worker-src 'self' blob:; child-src 'self' blob:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://accounts.google.com https://github.com; upgrade-insecure-requests",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            // Redirigir HTTP a HTTPS en producción
            ...(process.env.NODE_ENV === "production"
                ? [
                      {
                          source: "/:path*",
                          has: [
                              {
                                  type: "header",
                                  key: "x-forwarded-proto",
                                  value: "http",
                              },
                          ],
                          destination: "https://:path*",
                          permanent: true,
                      },
                  ]
                : []),
        ];
    },
};

export default nextConfig;
