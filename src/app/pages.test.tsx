import { render, screen, within } from "@testing-library/react";
import { caseStudies } from "@/content/case-studies";
import { complianceRecord, nabcbStatus, trustMetrics } from "@/content/metrics";
import { withPreview } from "@/test-utils/env";
import HomePage from "./page";
import AboutPage from "./about/page";
import CareersPage from "./careers/page";
import CaseStudiesPage from "./case-studies/page";
import ContactPage from "./contact/page";
import GlobalExpansionPage from "./global-expansion/page";
import HowWeWorkPage from "./how-we-work/page";
import InsightsPage from "./insights/page";
import PrivacyPage from "./privacy/page";
import SecurityCompliancePage from "./security-compliance/page";
import TermsPage from "./terms/page";
import WhatWeBuildPage from "./what-we-build/page";
import WhyTsePage from "./why-tse/page";

function h1() {
  return screen.getAllByRole("heading", { level: 1 });
}

describe("static pages render exactly one H1 and a conversational CTA", () => {
  const cases: [string, () => React.JSX.Element, RegExp][] = [
    ["Why TSE", WhyTsePage, /We Build Technology Around the Business/],
    ["What We Build", WhatWeBuildPage, /The Technology Foundation Your Business Grows On/],
    ["How We Work", HowWeWorkPage, /Understand First\. Engineer Second\./],
    ["Global Expansion", GlobalExpansionPage, /India Expansion/],
    ["Insights", InsightsPage, /Thinking on Business/],
    ["About", AboutPage, /More Than Two Decades of Engineering/],
    ["Careers", CareersPage, /Build the Engineer You Want to Become/],
    ["Contact", ContactPage, /Tell Us About the Business First/],
    ["Privacy", PrivacyPage, /Privacy Policy/],
    ["Terms", TermsPage, /Terms of Use/],
  ];

  it.each(cases)("%s", (_name, Page, title) => {
    render(<Page />);
    expect(h1()).toHaveLength(1);
    expect(h1()[0]).toHaveTextContent(title);
  });

  it("never uses transactional CTAs (handoff §9.4)", () => {
    cases.forEach(([, Page]) => {
      const { unmount } = render(<Page />);
      expect(screen.queryByText(/Request Quote|Buy Now|Get Pricing/i)).toBeNull();
      unmount();
    });
  });

  it("Careers CTA opens an email to TSE", () => {
    render(<CareersPage />);
    expect(screen.getByRole("link", { name: "Introduce Yourself" }).getAttribute("href")).toMatch(/^mailto:/);
  });

  it("Contact page hosts the enquiry form", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("Business stage")).toBeInTheDocument();
  });
});

describe("HomePage", () => {
  it("follows the handoff section order in preview builds", () => {
    const restore = withPreview(true);
    render(<HomePage />);
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(h2s).toEqual([
      "The Right Time to Build Your Technology Foundation? Day 1.",
      "We Don't Start With Technology. We Start With Your Business.",
      "One Technology Partner. End-to-End Accountability.",
      "Capabilities Behind the Backbone",
      "Technology Problems Become Business Problems.",
      "How We Think. What We Build. What Changed.",
      "Built on Quality. Ownership. Ethics.",
      "Your Technology Should Be One Less Thing to Worry About.",
      "Credibility",
      "Where Is Your Business Going Next?",
    ]);
    expect(screen.getAllByText("Pending verification").length).toBeGreaterThan(0);
    restore();
  });

  it("hides unapproved proof and metrics in production", () => {
    const restore = withPreview(false);
    render(<HomePage />);
    expect(screen.queryByRole("heading", { name: /How We Think/ })).toBeNull();
    const metrics = screen.getByLabelText("TSE at a glance");
    expect(within(metrics).getByText("20+ Years")).toBeInTheDocument();
    expect(within(metrics).queryByText("10+ Years")).toBeNull();
    expect(screen.queryByText("Pending verification")).toBeNull();
    restore();
  });

  it("omits the credibility bar when no metric is approved", () => {
    const restore = withPreview(false);
    const saved = trustMetrics.map((m) => m.approval);
    trustMetrics.forEach((m) => (m.approval = "pending"));
    render(<HomePage />);
    expect(screen.queryByRole("heading", { name: "Credibility" })).toBeNull();
    trustMetrics.forEach((m, i) => (m.approval = saved[i]));
    restore();
  });
});

describe("CaseStudiesPage", () => {
  it("lists case studies in preview", () => {
    const restore = withPreview(true);
    render(<CaseStudiesPage />);
    expect(screen.getAllByRole("article")).toHaveLength(caseStudies.length);
    restore();
  });

  it("shows an empty state when nothing is approved", () => {
    const restore = withPreview(false);
    render(<CaseStudiesPage />);
    expect(screen.getByText(/being prepared for publication/)).toBeInTheDocument();
    restore();
  });
});

describe("SecurityCompliancePage", () => {
  it("separates certification-body activity from consulting in preview", () => {
    const restore = withPreview(true);
    render(<SecurityCompliancePage />);
    expect(screen.getByRole("heading", { name: /Certification-body activities are separate/ })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: /NABCB/ })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Compliance record" })).toBeInTheDocument();
    restore();
  });

  it("hides unapproved compliance claims in production", () => {
    const restore = withPreview(false);
    render(<SecurityCompliancePage />);
    expect(screen.queryByRole("complementary")).toBeNull();
    restore();
  });

  it("drops the pending badge once wording is approved", () => {
    const restore = withPreview(false);
    complianceRecord.approval = "approved" as "pending";
    nabcbStatus.approval = "approved";
    render(<SecurityCompliancePage />);
    expect(screen.getAllByRole("complementary")).toHaveLength(2);
    expect(screen.queryByText("Pending verification")).toBeNull();
    complianceRecord.approval = "pending";
    nabcbStatus.approval = "pending";
    restore();
  });
});
