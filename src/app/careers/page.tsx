import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Split } from "@/components/ui/Split";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description: "Build the engineer you want to become. TSE builds engineers who think beyond tasks.",
  path: "/careers",
});

const values = [
  "Curiosity",
  "Ownership",
  "Disciplined troubleshooting",
  "Documentation",
  "Continuous learning",
  "Customer impact",
  "Engineering quality",
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the Engineer You Want to Become."
        crumbs={[{ name: "Careers", href: "/careers" }]}
        lead={<p>TSE is building engineers who can think beyond tasks.</p>}
      />
      <Section labelledBy="values-title">
        <Split aside={<SectionHeading id="values-title" eyebrow="What we value" title="Capability building, not only job openings." />}>
          <p className={shared.largeCopy}>
            We invest in how engineers think: understanding the business consequence of a decision, owning an outcome
            end-to-end and learning continuously as technology changes.
          </p>
          <CheckList items={values} columns={2} />
        </Split>
      </Section>
      <CtaBand
        title="Think beyond tasks? Introduce yourself."
        body="Tell us what you have built, what you want to learn and the engineer you want to become."
        cta={{ label: "Introduce Yourself", href: `mailto:${site.contact.email}?subject=Careers%20at%20TSE` }}
      />
    </>
  );
}
