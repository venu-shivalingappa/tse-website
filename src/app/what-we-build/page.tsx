import type { Metadata } from "next";
import { capabilities } from "@/content/capabilities";
import { layers } from "@/content/principles";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CapabilityCard } from "@/components/sections/CapabilityCard";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { LayerStack } from "@/components/sections/LayerStack";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "What We Build",
  description:
    "Infrastructure, cloud, networking, cybersecurity, identity, operations and governance engineered as one technology foundation.",
  path: "/what-we-build",
});

export default function WhatWeBuildPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build"
        title="The Technology Foundation Your Business Grows On"
        crumbs={[{ name: "What We Build", href: "/what-we-build" }]}
        lead={
          <p>
            Technology is not a collection of independent products. Infrastructure, cloud, networking, cybersecurity,
            identity, operations and governance must work as one system. TSE engineers that system.
          </p>
        }
      />

      <Section tone="warm" labelledBy="layers-title">
        <SectionHeading
          id="layers-title"
          eyebrow="One integrated architecture"
          title="Strategy. Build. Protect. Operate."
          lead={<p>Four layers, engineered together — each one designed with the others in mind.</p>}
        />
        <LayerStack layers={layers} />
      </Section>

      <Section labelledBy="capability-list-title">
        <SectionHeading id="capability-list-title" eyebrow="Capabilities" title="Where TSE takes accountability." />
        <CardGrid columns={4}>
          {capabilities.map((c, i) => (
            <li key={c.slug}>
              <CapabilityCard index={i + 1} title={c.title} outcome={c.outcome} href={`/what-we-build/${c.slug}`} />
            </li>
          ))}
        </CardGrid>
      </Section>

      <CtaBand title="Not sure which capability you need?" body="You do not need to know. Tell us about the business first — we will start there." />
    </>
  );
}
