import { site } from "@/content/site";
import { siteUrl } from "./site-url";

export interface Crumb {
  name: string;
  href: string;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl("/"),
    logo: siteUrl("/brand/tse-logo.png"),
    slogan: site.positioning,
    description: site.promise,
    email: site.contact.email,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
  };
}

export function breadcrumbSchema(crumbs: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: siteUrl(c.href),
    })),
  };
}

interface ArticleInput {
  title: string;
  summary: string;
  slug: string;
  date: string;
  author: string;
}

export function articleSchema(a: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.summary,
    datePublished: a.date,
    author: { "@type": "Organization", name: a.author },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: siteUrl("/brand/tse-logo.png") } },
    mainEntityOfPage: siteUrl(`/insights/${a.slug}`),
  };
}
