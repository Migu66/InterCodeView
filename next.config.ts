import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    async headers() {
        return [
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
