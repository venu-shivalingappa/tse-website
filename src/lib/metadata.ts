import type { Metadata } from "next";
import { site } from "@/content/site";
import { siteUrl } from "./site-url";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

/** Unique title, description, canonical and Open Graph per page (handoff §23). */
export function pageMetadata({ title, description, path, type = "website" }: PageMetaInput): Metadata {
  const url = siteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_IN",
      images: [{ url: siteUrl("/media/hero-poster.jpg"), width: 1920, height: 1080, alt: site.positioning }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}
