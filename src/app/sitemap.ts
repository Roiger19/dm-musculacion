import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.dominio) return [];
  return [
    { url: site.dominio, changeFrequency: "monthly", priority: 1 },
    { url: `${site.dominio}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
