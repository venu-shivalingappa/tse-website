import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import RootLayout, { metadata, viewport } from "./layout";
import ErrorPage from "./error";
import NotFound from "./not-found";
import robots from "./robots";
import sitemap from "./sitemap";
import { withPreview } from "@/test-utils/env";

describe("RootLayout", () => {
  it("wraps pages with skip link, header, main landmark, footer and schema", () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <p>Page body</p>
      </RootLayout>,
    );
    expect(html).toContain('lang="en-IN"');
    expect(html).toContain("Skip to main content");
    expect(html).toContain('<main id="main" tabindex="-1"><p>Page body</p></main>');
    expect(html).toContain("<footer");
    expect(html).toContain('"@type":"Organization"');
  });

  it("exports site-wide metadata", () => {
    expect(metadata.title).toMatchObject({ template: "%s | Tech Solve Engine" });
    expect(viewport.themeColor).toBe("#0d1526");
  });
});

it("NotFound offers a way back", () => {
  render(<NotFound />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/moved or no longer exists/);
  expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
});

it("ErrorPage can retry", async () => {
  const reset = jest.fn();
  render(<ErrorPage error={new Error("x")} reset={reset} />);
  await userEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(reset).toHaveBeenCalled();
});

describe("sitemap", () => {
  it("lists every public page and only publishable case studies", () => {
    const restore = withPreview(false);
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/what-we-build/cybersecurity"))).toBe(true);
    expect(urls.some((u) => u.includes("/case-studies/"))).toBe(false);
    expect(sitemap()[0].priority).toBe(1);
    expect(sitemap()[1].priority).toBe(0.7);
    restore();

    const restore2 = withPreview(true);
    expect(sitemap().some((e) => e.url.includes("/case-studies/"))).toBe(true);
    restore2();
  });
});

it("robots allows crawling, blocks the API and points at the sitemap", () => {
  const r = robots();
  expect(r.rules).toMatchObject({ allow: "/", disallow: "/api/" });
  expect(r.sitemap).toMatch(/\/sitemap\.xml$/);
});
