import type { Metadata } from "next";
import { lifecycle, methodology } from "@/content/principles";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Split } from "@/components/ui/Split";
import { CtaBand } from "@/components/sections/CtaBand";
import { LifecycleFlow } from "@/components/sections/LifecycleFlow";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "How We Work",
  description:
    "Understand first. Engineer second. How TSE begins every engagement with the business before designing the technology.",
  path: "/how-we-work",
});

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Understand First. Engineer Second."
        crumbs={[{ name: "How We Work", href: "/how-we-work" }]}
        lead={
          <p>
            TSE does not begin an engagement by presenting a product catalogue. We begin by understanding what the business
            is, where it wants to go and what technology must enable.
          </p>
        }
      />

      <Section labelledBy="principle-title">
        <Split aside={<SectionHeading id="principle-title" eyebrow="Design principle" title="Designed for the next 3–5 years." />}>
          <p className={shared.largeCopy}>
            Architecture should be designed around the expected 3–5 year business direction wherever that horizon is
            practical, while allowing infrastructure, subscriptions and components to evolve without forcing unnecessary
            business disruption.
          </p>
        </Split>
      </Section>

      <Section tone="warm" labelledBy="steps-title">
        <SectionHeading id="steps-title" eyebrow="The method" title="Seven steps. One accountable partner." />
        <ProcessSteps steps={methodology} />
      </Section>

      <Section tone="dark" labelledBy="lifecycle-title">
        <SectionHeading
          id="lifecycle-title"
          eyebrow="The lifecycle"
          title="Involved from strategy through operations."
          lead={<p>So strategy, implementation and operations never become disconnected responsibilities.</p>}
        />
        <LifecycleFlow steps={lifecycle} label="TSE technology lifecycle" />
      </Section>

      <CtaBand title="Start with the business." body="Tell us what you are building and where you want to go. We will start there." />
    </>
  );
}
