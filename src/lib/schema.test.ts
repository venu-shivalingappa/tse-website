import { articleSchema, breadcrumbSchema, organizationSchema } from "./schema";

describe("schema", () => {
  it("describes the organisation", () => {
    expect(organizationSchema()).toMatchObject({ "@type": "Organization", name: "Tech Solve Engine" });
  });

  it("numbers breadcrumb positions", () => {
    const s = breadcrumbSchema([
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
    ]);
    expect(s.itemListElement[1]).toMatchObject({ position: 2, name: "About" });
  });

  it("describes an article", () => {
    const s = articleSchema({ title: "T", summary: "S", slug: "t", date: "2026-01-01", author: "TSE" });
    expect(s).toMatchObject({ "@type": "Article", headline: "T", datePublished: "2026-01-01" });
    expect(s.mainEntityOfPage).toMatch(/\/insights\/t$/);
  });
});
