import type { Metadata } from "next";
import { publishedCaseStudies } from "@/content/case-studies";
import { showPendingClaims } from "@/lib/governance";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardGrid } from "@/components/sections/CardGrid";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description: "How TSE thinks, what we build and what changed — case studies focused on engineering judgement and business impact.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const studies = publishedCaseStudies(showPendingClaims());
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="How We Think. What We Build. What Changed."
        crumbs={[{ name: "Case Studies", href: "/case-studies" }]}
        lead={<p>Case studies that demonstrate engineering judgement and business impact — anonymised where required.</p>}
      />
      <Section labelledBy="studies-title">
        <SectionHeading id="studies-title" eyebrow="Proof" title="Selected work." />
        {studies.length > 0 ? (
          <CardGrid columns={2}>
            {studies.map((s) => (
              <li key={s.slug}>
                <CaseStudyCard study={s} />
              </li>
            ))}
          </CardGrid>
        ) : (
          <p className={shared.empty}>Case studies are being prepared for publication. Please check back soon.</p>
        )}
      </Section>
      <CtaBand title="What would you like to change?" body="Tell us what is getting in the way. We will start there." />
    </>
  );
}
