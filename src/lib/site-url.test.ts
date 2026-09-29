import { DEFAULT_SITE_URL, siteUrl } from "./site-url";

describe("siteUrl", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = original;
  });

  it("falls back to the default domain", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(siteUrl()).toBe(DEFAULT_SITE_URL);
  });

  it("joins paths and trims trailing slashes", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    expect(siteUrl("/")).toBe("https://example.com");
    expect(siteUrl("/about")).toBe("https://example.com/about");
    expect(siteUrl("about")).toBe("https://example.com/about");
  });
});
