import type { Metadata } from "next";
import { principles } from "@/content/principles";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Split } from "@/components/ui/Split";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PrincipleCard } from "@/components/sections/PrincipleCard";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "More than two decades of engineering. Tech Solve Engine is built on deep technical capability, continuous learning and accountability.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About TSE"
        title="More Than Two Decades of Engineering. Still Learning."
        crumbs={[{ name: "About", href: "/about" }]}
        lead={
          <p>
            Tech Solve Engine has been built around a simple idea: technology should enable businesses to grow without
            becoming an unnecessary source of risk, cost or distraction.
          </p>
        }
      />

      <Section labelledBy="culture-title">
        <Split aside={<SectionHeading id="culture-title" eyebrow="Our culture" title="Capability that keeps evolving." />}>
          <p className={shared.largeCopy}>
            Our culture values deep technical capability, continuous learning and accountability. As technology changes, our
            skills must evolve with it — because customers should never receive yesterday&apos;s thinking for
            tomorrow&apos;s business.
          </p>
          <p className={shared.largeCopy}>
            TSE strengthens capability by transferring knowledge across the team, raising engineering standards and building
            people who can think beyond assigned tasks.
          </p>
        </Split>
      </Section>

      <Section tone="warm" labelledBy="culture-statement">
        <h2 id="culture-statement" className={shared.display} data-reveal>
          Engineer. Learn. <span className={shared.accent}>Own.</span> Improve.
        </h2>
      </Section>

      <Section tone="dark" labelledBy="about-principles-title">
        <SectionHeading id="about-principles-title" eyebrow="Non-negotiables" title="Quality. Ownership. Ethics." />
        <CardGrid columns={3} as="div">
          {principles.map((p, i) => (
            <PrincipleCard key={p.title} index={i + 1} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      <Section labelledBy="about-close" container="narrow">
        <h2 id="about-close" className={shared.statement} data-reveal>
          We are building a company people trust. The rest follows.
        </h2>
      </Section>

      <CtaBand title="Where is your business going next?" body="Tell us what you are building and what is getting in the way. We will start there." />
    </>
  );
}
