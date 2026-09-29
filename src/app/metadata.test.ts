import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";
import { metadata as home } from "./page";
import { metadata as about } from "./about/page";
import { metadata as careers } from "./careers/page";
import { metadata as caseStudies } from "./case-studies/page";
import { metadata as contact } from "./contact/page";
import { metadata as globalExpansion } from "./global-expansion/page";
import { metadata as howWeWork } from "./how-we-work/page";
import { metadata as insights } from "./insights/page";
import { metadata as privacy } from "./privacy/page";
import { metadata as security } from "./security-compliance/page";
import { metadata as terms } from "./terms/page";
import { metadata as whatWeBuild } from "./what-we-build/page";
import { metadata as whyTse } from "./why-tse/page";

const pages: Record<string, Metadata> = {
  "/": home,
  "/about": about,
  "/careers": careers,
  "/case-studies": caseStudies,
  "/contact": contact,
  "/global-expansion": globalExpansion,
  "/how-we-work": howWeWork,
  "/insights": insights,
  "/privacy": privacy,
  "/security-compliance": security,
  "/terms": terms,
  "/what-we-build": whatWeBuild,
  "/why-tse": whyTse,
};

describe("page metadata (handoff §23)", () => {
  const entries = Object.entries(pages);

  it("gives every page a unique title and description", () => {
    const titles = entries.map(([, m]) => m.title);
    const descriptions = entries.map(([, m]) => m.description);
    expect(new Set(titles).size).toBe(entries.length);
    expect(new Set(descriptions).size).toBe(entries.length);
  });

  it.each(entries)("%s has a canonical URL matching its route", (path, meta) => {
    expect(meta.alternates?.canonical).toBe(siteUrl(path));
    expect(meta.openGraph).toBeDefined();
  });
});
