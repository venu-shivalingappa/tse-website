import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Split } from "@/components/ui/Split";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Technology Partner for Global Companies Expanding in India",
  description:
    "TSE helps international organisations establish the technology environment their India operation needs to work effectively from Day 1.",
  path: "/global-expansion",
});

const areas = [
  "Office technology strategy",
  "Network and connectivity",
  "Cloud and collaboration",
  "Identity",
  "Endpoint and security",
  "Infrastructure",
  "Vendor coordination",
  "Operational support",
  "Ongoing technology ownership",
];

const cta = { label: "Discuss Your India Expansion", href: "/contact" };

export default function GlobalExpansionPage() {
  return (
    <>
      <PageHero
        eyebrow="Global expansion"
        title="Building the Technology Foundation for Your India Expansion"
        crumbs={[{ name: "Global Expansion", href: "/global-expansion" }]}
        lead={
          <p>
            Setting up or scaling an operation in India involves more than an office lease and connectivity. TSE helps
            international organisations establish the technology environment required for people, applications, security,
            compliance and operations to work effectively from Day 1.
          </p>
        }
      >
        <Button href={cta.href} variant="hero" size="lg" trackLabel="global-expansion-hero">
          {cta.label}
        </Button>
      </PageHero>

      <Section labelledBy="partner-title">
        <Split aside={<SectionHeading id="partner-title" eyebrow="Your local partner" title="Global standards, translated into a reliable India environment." />}>
          <p className={shared.largeCopy}>
            TSE acts as your local technology engineering and operating partner — accountable for making the standards your
            organisation already holds work reliably in India, and for keeping them working as the operation grows.
          </p>
        </Split>
      </Section>

      <Section tone="warm" labelledBy="expansion-areas-title">
        <SectionHeading id="expansion-areas-title" eyebrow="Capability areas" title="Everything the operation needs on Day 1." />
        <CheckList items={areas} columns={3} />
      </Section>

      <CtaBand title="Planning an India operation?" body="Tell us where you are going and what the operation must support." cta={cta} />
    </>
  );
}
