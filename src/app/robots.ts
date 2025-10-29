import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://inter-code-view.vercel.app";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/profile"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
