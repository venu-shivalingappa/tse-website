import { pageMetadata } from "./metadata";

describe("pageMetadata", () => {
  it("builds title, canonical and Open Graph data", () => {
    const meta = pageMetadata({ title: "About", description: "Desc", path: "/about" });
    expect(meta.title).toBe("About");
    expect(meta.alternates?.canonical).toMatch(/\/about$/);
    expect(meta.openGraph).toMatchObject({ type: "website", title: "About | Tech Solve Engine" });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("supports article pages", () => {
    const meta = pageMetadata({ title: "Post", description: "D", path: "/insights/x", type: "article" });
    expect(meta.openGraph).toMatchObject({ type: "article" });
  });
});
