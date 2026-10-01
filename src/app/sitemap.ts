import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/seo";

// Work and About are sections of the homepage (/#work, /#about), not pages, so they aren't listed
const routes = ["", "/services", "/insights", "/contact", ...services.map((s) => `/services/${s.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/services" ? 0.9 : 0.8,
  }));
}
