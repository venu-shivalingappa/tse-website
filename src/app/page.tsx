import type { Metadata } from "next";
import { capabilities } from "@/content/capabilities";
import { caseStudiesBySlugs, featuredCaseStudySlugs } from "@/content/case-studies";
import { businessFirst, businessImpact, entryPoints, finalCta, safeHands } from "@/content/home";
import { trustMetrics } from "@/content/metrics";
import { accountabilityBenefits, lifecycle, principles } from "@/content/principles";
import { site } from "@/content/site";
import { publishable, showPendingClaims } from "@/lib/governance";
import { pageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Split } from "@/components/ui/Split";
import { BusinessStateCard } from "@/components/sections/BusinessStateCard";
import { CapabilityCard } from "@/components/sections/CapabilityCard";
import { CardGrid } from "@/components/sections/CardGrid";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { LifecycleFlow } from "@/components/sections/LifecycleFlow";
import { MetricsBar } from "@/components/sections/MetricsBar";
import { PrincipleCard } from "@/components/sections/PrincipleCard";
import { StatementBlock } from "@/components/sections/StatementBlock";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  title: site.positioning,
  description:
    "Tech Solve Engine understands where your business is going, then designs, builds, secures and operates the technology foundation required to get there.",
  path: "/",
});

export default function HomePage() {
  const preview = showPendingClaims();
  const proof = caseStudiesBySlugs(featuredCaseStudySlugs, preview);
  const metrics = publishable(trustMetrics, preview);

  return (
    <>
      {/* 1. Hero */}
      <HomeHero nextId="entry-points" />

      {/* 2. Day 1 / Existing business */}
      <Section id="entry-points" tone="warm" labelledBy="entry-title">
        <SectionHeading id="entry-title" eyebrow="Two ways in" title={entryPoints.title} lead={<p>{entryPoints.lead}</p>} />
        <CardGrid columns={2}>
          {entryPoints.cards.map((card) => (
            <li key={card.label}>
              <BusinessStateCard {...card} />
            </li>
          ))}
        </CardGrid>
      </Section>

      {/* 3. Business first */}
      <Section labelledBy="business-first-title">
        <SectionHeading id="business-first-title" eyebrow="Our philosophy" title={businessFirst.title} />
        <StatementBlock first="Business first" second="Technology second" />
        <Split
          className={styles.businessFirst}
          aside={<p className={styles.largeCopy}>{businessFirst.body}</p>}
        >
          <CheckList items={businessFirst.considerations} columns={2} />
        </Split>
      </Section>

      {/* 4. End-to-end accountability */}
      <Section tone="dark" labelledBy="accountability-title">
        <SectionHeading
          id="accountability-title"
          eyebrow="End-to-end"
          title="One Technology Partner. End-to-End Accountability."
          lead={
            <p>
              TSE can remain involved throughout the technology lifecycle so that strategy, implementation and operations do
              not become disconnected responsibilities.
            </p>
          }
        />
        <LifecycleFlow steps={lifecycle} label="TSE technology lifecycle" className={styles.lifecycle} />
        <CheckList items={accountabilityBenefits} columns={3} />
      </Section>

      {/* 5. Capabilities */}
      <Section labelledBy="capabilities-title">
        <SectionHeading
          id="capabilities-title"
          eyebrow="What we build"
          title="Capabilities Behind the Backbone"
          lead={<p>Infrastructure, cloud, security and operations engineered as one system — around your business.</p>}
        />
        <CardGrid columns={4}>
          {capabilities.map((c, i) => (
            <li key={c.slug}>
              <CapabilityCard index={i + 1} title={c.title} outcome={c.outcome} href={`/what-we-build/${c.slug}`} />
            </li>
          ))}
        </CardGrid>
        <div className={styles.more}>
          <Button href="/what-we-build" variant="secondary" withArrow>
            See What We Build
          </Button>
        </div>
      </Section>

      {/* 6. Business impact */}
      <Section tone="warm" labelledBy="impact-title">
        <Split aside={<SectionHeading id="impact-title" eyebrow="Business impact" title={businessImpact.title} />}>
          <p className={styles.largeCopy}>{businessImpact.body}</p>
          <ul className={styles.costs} aria-label="Hidden technology costs">
            {businessImpact.costs.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className={styles.emphasis}>{businessImpact.close}</p>
        </Split>
      </Section>

      {/* 7. Proof */}
      {proof.length > 0 && (
        <Section labelledBy="proof-title">
          <SectionHeading
            id="proof-title"
            eyebrow="Proof"
            title="How We Think. What We Build. What Changed."
            lead={<p>Engineering judgement and business impact — not “we installed X” stories.</p>}
          />
          <CardGrid columns={2}>
            {proof.map((study) => (
              <li key={study.slug}>
                <CaseStudyCard study={study} />
              </li>
            ))}
          </CardGrid>
          <div className={styles.more}>
            <Button href="/case-studies" variant="secondary" withArrow>
              All case studies
            </Button>
          </div>
        </Section>
      )}

      {/* 8. Quality · Ownership · Ethics */}
      <Section id="principles" tone="dark" labelledBy="principles-title">
        <SectionHeading id="principles-title" eyebrow="Non-negotiables" title="Built on Quality. Ownership. Ethics." />
        <CardGrid columns={3} as="div">
          {principles.map((p, i) => (
            <PrincipleCard key={p.title} index={i + 1} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* 9. Safe hands — visually minimal, large type, no icon grid */}
      <Section labelledBy="safe-hands-title" container="narrow">
        <div className={styles.safeHands} data-reveal>
          <h2 id="safe-hands-title" className={styles.safeTitle}>
            {safeHands.title}
          </h2>
          <p className={styles.largeCopy}>{safeHands.body}</p>
          <p className={styles.safeClose}>{safeHands.close}</p>
        </div>
      </Section>

      {/* 10. Credibility metrics */}
      {metrics.length > 0 && (
        <Section tone="warm" spacing="tight" labelledBy="metrics-title">
          <h2 id="metrics-title" className="visually-hidden">
            Credibility
          </h2>
          <MetricsBar metrics={metrics} />
        </Section>
      )}

      {/* 11. Final CTA */}
      <CtaBand title={finalCta.title} body={finalCta.body} />
    </>
  );
}
