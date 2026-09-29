import { render, screen } from "@testing-library/react";
import { capabilities } from "@/content/capabilities";
import { caseStudies } from "@/content/case-studies";
import { insights } from "@/content/insights";
import { withPreview } from "@/test-utils/env";
import CapabilityPage, * as capabilityRoute from "./what-we-build/[slug]/page";
import CaseStudyPage, * as caseStudyRoute from "./case-studies/[slug]/page";
import InsightPage, * as insightRoute from "./insights/[slug]/page";

jest.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe("capability pages (handoff §12 template)", () => {
  it("pre-renders every capability and 404s anything else", async () => {
    expect(capabilityRoute.dynamicParams).toBe(false);
    expect(capabilityRoute.generateStaticParams()).toHaveLength(capabilities.length);
    await expect(capabilityRoute.generateMetadata(params("nope"))).resolves.toEqual({});
    await expect(CapabilityPage(params("nope"))).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("renders the standard structure with a relevant case study", async () => {
    const restore = withPreview(true);
    const meta = await capabilityRoute.generateMetadata(params("cybersecurity"));
    expect(meta.title).toBe("Cybersecurity & Information Security");
    render(await CapabilityPage(params("cybersecurity")));
    expect(screen.getByRole("heading", { level: 1, name: "Cybersecurity" })).toBeInTheDocument();
    ["What TSE considers first.", "What we engineer.", "Our approach.", "What changes for the business.", "Relevant case study."].forEach(
      (name) => expect(screen.getByRole("heading", { name })).toBeInTheDocument(),
    );
    restore();
  });

  it("omits the case study block when none is published", async () => {
    const restore = withPreview(true);
    render(await CapabilityPage(params("devops-automation")));
    expect(screen.queryByRole("heading", { name: "Relevant case study." })).toBeNull();
    restore();
  });
});

describe("case study pages (handoff §16 structure)", () => {
  it("only pre-renders publishable case studies", async () => {
    const restore = withPreview(false);
    expect(caseStudyRoute.dynamicParams).toBe(false);
    expect(caseStudyRoute.generateStaticParams()).toEqual([]);
    await expect(caseStudyRoute.generateMetadata(params(caseStudies[0].slug))).resolves.toEqual({});
    await expect(CaseStudyPage(params(caseStudies[0].slug))).rejects.toThrow("NEXT_NOT_FOUND");
    restore();
  });

  it("renders all eight chapters, metric and related capabilities in preview", async () => {
    const restore = withPreview(true);
    const study = caseStudies.find((c) => c.metric)!;
    expect(caseStudyRoute.generateStaticParams()).toHaveLength(caseStudies.length);
    expect((await caseStudyRoute.generateMetadata(params(study.slug))).title).toBe(study.title);
    render(await CaseStudyPage(params(study.slug)));
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(8);
    expect(screen.getByText(study.metric!.value)).toBeInTheDocument();
    expect(screen.getByText("Pending verification")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Technology Strategy & Advisory" })).toBeInTheDocument();
    restore();
  });

  it("renders approved studies without a metric or badge", async () => {
    const restore = withPreview(false);
    const study = caseStudies.find((c) => !c.metric)!;
    study.approval = "approved";
    render(await CaseStudyPage(params(study.slug)));
    expect(screen.queryByText("Pending verification")).toBeNull();
    study.approval = "pending";
    restore();
  });
});

describe("insight pages", () => {
  it("pre-renders every insight and 404s anything else", async () => {
    expect(insightRoute.dynamicParams).toBe(false);
    expect(insightRoute.generateStaticParams()).toHaveLength(insights.length);
    await expect(insightRoute.generateMetadata(params("nope"))).resolves.toEqual({});
    await expect(InsightPage(params("nope"))).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("renders the article with Article schema", async () => {
    const insight = insights[0];
    const meta = await insightRoute.generateMetadata(params(insight.slug));
    expect(meta.openGraph).toMatchObject({ type: "article" });
    const { container } = render(await InsightPage(params(insight.slug)));
    expect(screen.getByRole("heading", { level: 1, name: insight.title })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(1);
    expect(container.innerHTML).toContain('"@type":"Article"');
  });
});
