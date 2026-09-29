import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { capabilities, getCapability } from "@/content/capabilities";
import { caseStudiesBySlugs } from "@/content/case-studies";
import { showPendingClaims } from "@/lib/governance";
import { pageMetadata } from "@/lib/metadata";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Split } from "@/components/ui/Split";
import { CardGrid } from "@/components/sections/CardGrid";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const capability = getCapability((await params).slug);
  if (!capability) return {};
  return pageMetadata({ ...capability.seo, path: `/what-we-build/${capability.slug}` });
}

/** Capability page template (handoff §12) — identical structure for every capability. */
export default async function CapabilityPage({ params }: Props) {
  const capability = getCapability((await params).slug);
  if (!capability) notFound();
  const studies = caseStudiesBySlugs(capability.caseStudies, showPendingClaims());

  return (
    <>
      {/* 1. Business relevance */}
      <PageHero
        eyebrow="What we build"
        title={capability.title}
        crumbs={[
          { name: "What We Build", href: "/what-we-build" },
          { name: capability.title, href: `/what-we-build/${capability.slug}` },
        ]}
        lead={<p>{capability.businessRelevance}</p>}
      />

      {/* 2. What TSE considers first */}
      <Section labelledBy="considerations-title">
        <Split
          aside={
            <SectionHeading
              id="considerations-title"
              eyebrow="Before we design"
              title="What TSE considers first."
              lead={<p>We understand the business before recommending any technology.</p>}
            />
          }
        >
          <CheckList items={capability.considerations} />
        </Split>
      </Section>

      {/* 3. Core engineering capabilities */}
      <Section tone="warm" labelledBy="core-title">
        <SectionHeading id="core-title" eyebrow="Core capabilities" title="What we engineer." />
        <CheckList items={capability.capabilities} columns={3} />
      </Section>

      {/* 4. Approach + 5. Outcomes */}
      <Section labelledBy="approach-title">
        <Split aside={<SectionHeading id="approach-title" eyebrow="How we approach it" title="Our approach." />}>
          <ol className={shared.orderedList}>
            {capability.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Split>
      </Section>

      <Section tone="dark" labelledBy="outcomes-title">
        <SectionHeading id="outcomes-title" eyebrow="Business outcomes" title="What changes for the business." />
        <CheckList items={capability.outcomes} columns={3} />
      </Section>

      {/* 6. Relevant case study */}
      {studies.length > 0 && (
        <Section labelledBy="related-proof-title">
          <SectionHeading id="related-proof-title" eyebrow="Proof" title="Relevant case study." />
          <CardGrid columns={2}>
            {studies.map((s) => (
              <li key={s.slug}>
                <CaseStudyCard study={s} />
              </li>
            ))}
          </CardGrid>
        </Section>
      )}

      {/* 7. CTA */}
      <CtaBand title="Where is your business going next?" body="Tell us about the business first. We will start there." />
    </>
  );
}
