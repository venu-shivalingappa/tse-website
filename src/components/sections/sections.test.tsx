import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { caseStudies } from "@/content/case-studies";
import { homeHero } from "@/content/home";
import { insights } from "@/content/insights";
import { trustMetrics } from "@/content/metrics";
import { layers, methodology } from "@/content/principles";
import { BusinessStateCard } from "./BusinessStateCard";
import { CapabilityCard } from "./CapabilityCard";
import { CardGrid } from "./CardGrid";
import { CaseStudyCard } from "./CaseStudyCard";
import { ComplianceNotice } from "./ComplianceNotice";
import { CtaBand } from "./CtaBand";
import { HeroBackground } from "./HeroBackground";
import { HomeHero } from "./HomeHero";
import { InsightCard } from "./InsightCard";
import { LayerStack } from "./LayerStack";
import { LifecycleFlow } from "./LifecycleFlow";
import { MetricCard } from "./MetricCard";
import { MetricsBar } from "./MetricsBar";
import { NodeGraphic } from "./NodeGraphic";
import { PageHero } from "./PageHero";
import { PrincipleCard } from "./PrincipleCard";
import { ProcessSteps } from "./ProcessSteps";
import { StatementBlock } from "./StatementBlock";

describe("HomeHero (Figma 12:11)", () => {
  it("renders the headline, CTAs, pillars and continue button", () => {
    render(<HomeHero nextId="next" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Build Your Business");
    expect(h1).toHaveTextContent("We'll take ownership of the technology.");
    expect(screen.getByRole("link", { name: "Talk to TSE" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "See How We Work" })).toHaveAttribute("href", "/how-we-work");
    const pillars = screen.getByRole("list", { name: "Built on" });
    expect(within(pillars).getAllByRole("link").map((a) => a.textContent)).toEqual(["Quality", "Ownership", "Ethics"]);
    expect(screen.getByRole("link", { name: "Continue to next section" })).toHaveAttribute("href", "#next");
  });

  it("masks icons that have a Figma clip path", () => {
    const { container } = render(<HomeHero nextId="n" />);
    const glyphs = container.querySelectorAll<HTMLElement>(".pillarGlyph");
    expect(glyphs[0].style.maskImage).toContain("quality-mask.svg");
    expect(glyphs[1].style.maskImage).toBe("");
  });

  it("accepts custom content", () => {
    render(<HomeHero nextId="n" content={{ ...homeHero, title: "Custom" }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Custom");
  });
});

describe("HeroBackground", () => {
  const sources = homeHero.video.sources;
  const setReducedMotion = (matches: boolean) => {
    window.matchMedia = jest.fn().mockReturnValue({ matches }) as unknown as typeof window.matchMedia;
  };

  it("plays by default and can be paused and resumed", async () => {
    setReducedMotion(false);
    render(<HeroBackground poster="/p.jpg" sources={sources} />);
    const video = screen.getByTestId("hero-video") as HTMLVideoElement;
    expect(video).toHaveAttribute("poster", "/p.jpg");
    expect(video.querySelectorAll("source")).toHaveLength(3);

    await userEvent.click(screen.getByRole("button", { name: "Pause background video" }));
    expect(video.pause).toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Play background video" }));
    expect(video.play).toHaveBeenCalled();
  });

  it("starts paused for reduced-motion users", () => {
    setReducedMotion(true);
    render(<HeroBackground poster="/p.jpg" sources={sources} />);
    expect(screen.getByRole("button", { name: "Play background video" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("PageHero", () => {
  it("renders the minimal variant", () => {
    render(<PageHero title="Title" />);
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("renders eyebrow, crumbs, lead and actions", () => {
    render(
      <PageHero title="About" eyebrow="Eyebrow" crumbs={[{ name: "About", href: "/about" }]} lead={<p>Lead</p>}>
        <a href="/x">Action</a>
      </PageHero>,
    );
    expect(screen.getByText("Eyebrow")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("Lead")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Action" })).toBeInTheDocument();
  });
});

describe("cards", () => {
  it("BusinessStateCard", () => {
    render(<BusinessStateCard label="Starting" title="Build correctly" body="Body" href="/contact" cta="Start" />);
    expect(screen.getByRole("heading", { name: "Build correctly" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start" })).toHaveAttribute("data-track", "entry-Starting");
  });

  it("CapabilityCard with and without index", () => {
    const { rerender } = render(<CapabilityCard title="Cloud" outcome="Outcome" href="/c" index={3} />);
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore Cloud" })).toHaveAttribute("href", "/c");
    rerender(<CapabilityCard title="Cloud" outcome="Outcome" href="/c" />);
    expect(screen.queryByText("03")).toBeNull();
  });

  it("CaseStudyCard shows metric and pending badge", () => {
    const withMetric = caseStudies.find((c) => c.metric)!;
    const { rerender } = render(<CaseStudyCard study={withMetric} />);
    expect(screen.getByText(withMetric.metric!.value)).toBeInTheDocument();
    expect(screen.getByText("Pending verification")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", `/case-studies/${withMetric.slug}`);

    const approvedNoMetric = { ...caseStudies.find((c) => !c.metric)!, approval: "approved" as const };
    rerender(<CaseStudyCard study={approvedNoMetric} />);
    expect(screen.queryByText("Pending verification")).toBeNull();
  });

  it("PrincipleCard", () => {
    render(<PrincipleCard index={1} title="Quality" body="Body" />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quality" })).toBeInTheDocument();
  });

  it("InsightCard", () => {
    render(<InsightCard insight={insights[0]} />);
    expect(screen.getByRole("link", { name: insights[0].title })).toHaveAttribute("href", `/insights/${insights[0].slug}`);
    expect(screen.getByText(`${insights[0].readingMinutes} min read`)).toBeInTheDocument();
  });

  it("CardGrid as list or div", () => {
    const { container, rerender } = render(<CardGrid>{<li>a</li>}</CardGrid>);
    expect(container.querySelector("ul")).toHaveClass("cols3");
    rerender(
      <CardGrid as="div" columns={2} className="x">
        <div>a</div>
      </CardGrid>,
    );
    expect(container.firstChild).toHaveClass("cols2", "x");
  });
});

describe("metrics", () => {
  const [approved, , pending] = trustMetrics;

  it("MetricCard marks pending metrics", () => {
    const { rerender } = render(
      <dl>
        <MetricCard metric={approved} />
      </dl>,
    );
    expect(screen.getByText(approved.value)).toBeInTheDocument();
    expect(screen.queryByText("Pending verification")).toBeNull();
    rerender(
      <dl>
        <MetricCard metric={pending} />
      </dl>,
    );
    expect(screen.getByText("Pending verification")).toBeInTheDocument();
  });

  it("MetricsBar renders a labelled list or nothing", () => {
    const { container, rerender } = render(<MetricsBar metrics={[approved]} />);
    expect(container.querySelector("dl")).toHaveAttribute("aria-label", "TSE at a glance");
    rerender(<MetricsBar metrics={[approved]} label="Credibility" />);
    expect(container.querySelector("dl")).toHaveAttribute("aria-label", "Credibility");
    rerender(<MetricsBar metrics={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("flows and statements", () => {
  it("LifecycleFlow numbers each step", () => {
    render(<LifecycleFlow steps={["Understand", "Scale"]} label="Lifecycle" className="x" />);
    const list = screen.getByRole("list", { name: "Lifecycle" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("ProcessSteps renders the methodology", () => {
    render(<ProcessSteps steps={methodology} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(7);
  });

  it("LayerStack renders four integrated layers", () => {
    render(<LayerStack layers={layers} />);
    expect(screen.getByRole("list", { name: "Technology foundation layers" })).toBeInTheDocument();
    expect(screen.getByText("Layer 4")).toBeInTheDocument();
  });

  it("StatementBlock reads as a sentence", () => {
    render(<StatementBlock first="Business first" second="Technology second" />);
    expect(screen.getByText("Business first").parentElement).toHaveTextContent("Business first, then Technology second");
  });

  it("NodeGraphic is decorative", () => {
    const { container } = render(<NodeGraphic />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("circle")).toHaveLength(9);
  });
});

describe("CtaBand", () => {
  it("defaults to the business conversation CTA", () => {
    render(<CtaBand title="Where next?" />);
    expect(screen.getByRole("region", { name: "Where next?" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start a Business Conversation" })).toHaveAttribute("href", "/contact");
  });

  it("accepts body, custom CTA and id", () => {
    render(<CtaBand id="x" title="T" body="Body" cta={{ label: "Go", href: "/go" }} />);
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "T" })).toHaveAttribute("id", "x");
    expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("href", "/go");
  });
});

describe("ComplianceNotice", () => {
  it("renders controlled wording", () => {
    render(<ComplianceNotice title="Record" status="Track record" wording="Wording" />);
    expect(screen.getByRole("complementary", { name: "Record" })).toBeInTheDocument();
    expect(screen.queryByText("Pending verification")).toBeNull();
  });

  it("renders disclaimer and pending state", () => {
    render(<ComplianceNotice title="NABCB" status="Applied" wording="W" disclaimer="Disclaimer" pending />);
    expect(screen.getByText("Disclaimer")).toBeInTheDocument();
    expect(screen.getByText("Pending verification")).toBeInTheDocument();
  });
});
