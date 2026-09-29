import type { MetadataRoute } from "next";
import { capabilities } from "@/content/capabilities";
import { publishedCaseStudies } from "@/content/case-studies";
import { insights } from "@/content/insights";
import { showPendingClaims } from "@/lib/governance";
import { siteUrl } from "@/lib/site-url";

const STATIC_PATHS = [
  "/",
  "/why-tse",
  "/what-we-build",
  "/how-we-work",
  "/security-compliance",
  "/case-studies",
  "/global-expansion",
  "/insights",
  "/about",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...capabilities.map((c) => `/what-we-build/${c.slug}`),
    ...publishedCaseStudies(showPendingClaims()).map((c) => `/case-studies/${c.slug}`),
    ...insights.map((i) => `/insights/${i.slug}`),
  ];
  return paths.map((path) => ({
    url: siteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
