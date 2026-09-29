import { capabilities, getCapability } from "./capabilities";
import { caseStudies, caseStudiesBySlugs, featuredCaseStudySlugs, getCaseStudy, publishedCaseStudies } from "./case-studies";
import { formatDate, getInsight, insights } from "./insights";
import { trustMetrics } from "./metrics";
import { capabilityNav, primaryNav } from "./site";
import { withPreview } from "@/test-utils/env";

describe("capabilities", () => {
  it("has one page per What We Build nav item", () => {
    expect(capabilities.map((c) => `/what-we-build/${c.slug}`)).toEqual(capabilityNav.map((n) => n.href));
  });

  it("looks up by slug", () => {
    expect(getCapability("cybersecurity")?.title).toBe("Cybersecurity");
    expect(getCapability("software-development")).toBeUndefined();
  });

  it("only references case studies that exist", () => {
    const slugs = new Set(caseStudies.map((c) => c.slug));
    capabilities.forEach((c) => c.caseStudies.forEach((s) => expect(slugs.has(s)).toBe(true)));
  });
});

describe("case studies governance", () => {
  it("hides pending case studies outside preview", () => {
    expect(publishedCaseStudies(false)).toEqual(caseStudies.filter((c) => c.approval === "approved"));
    expect(publishedCaseStudies(true)).toHaveLength(caseStudies.length);
  });

  it("resolves slugs in order and skips unknown ones", () => {
    const found = caseStudiesBySlugs([...featuredCaseStudySlugs, "missing"], true);
    expect(found.map((c) => c.slug)).toEqual(featuredCaseStudySlugs);
    expect(getCaseStudy(featuredCaseStudySlugs[0], true)?.slug).toBe(featuredCaseStudySlugs[0]);
    expect(getCaseStudy(featuredCaseStudySlugs[0], false)).toBeUndefined();
  });

  it("uses the environment flag by default", () => {
    const restore = withPreview(true);
    expect(publishedCaseStudies()).toHaveLength(caseStudies.length);
    restore();
  });
});

describe("insights", () => {
  it("looks up by slug and formats dates", () => {
    expect(getInsight(insights[0].slug)).toBe(insights[0]);
    expect(getInsight("nope")).toBeUndefined();
    expect(formatDate("2026-08-18")).toBe("18 August 2026");
  });
});

it("keeps approved baseline metrics approved (handoff §4)", () => {
  expect(trustMetrics.filter((m) => m.approval === "approved").map((m) => m.value)).toEqual(["20+ Years", "35+"]);
});

it("lists the ten primary navigation items (handoff §5)", () => {
  expect(primaryNav).toHaveLength(10);
});
