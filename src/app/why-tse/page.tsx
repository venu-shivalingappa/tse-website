import type { Metadata } from "next";
import { principles } from "@/content/principles";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Split } from "@/components/ui/Split";
import { CheckList } from "@/components/ui/CheckList";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PrincipleCard } from "@/components/sections/PrincipleCard";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Why TSE",
  description:
    "Every organisation can buy technology. TSE helps decide what should be built, why, and how it keeps supporting the business as it grows.",
  path: "/why-tse",
});

const beliefs = [
  { title: "Architecture should anticipate growth.", body: "Design for where the business is going, not only where it is today." },
  { title: "Security should be designed in.", body: "Protection is an outcome of engineering, not a product added later." },
  { title: "Technology investments should have a business outcome.", body: "Every recommendation should be traceable to a business reason." },
  { title: "Systems should remain manageable over time.", body: "What we build must still make sense years after go-live." },
  { title: "Technology teams should take ownership.", body: "Accountability does not end when a task is closed." },
  { title: "Customers deserve transparency.", body: "Clear reasoning, honest trade-offs and no hidden agendas." },
];

export default function WhyTsePage() {
  return (
    <>
      <PageHero
        eyebrow="Why TSE"
        title="We Build Technology Around the Business — Not the Other Way Around."
        crumbs={[{ name: "Why TSE", href: "/why-tse" }]}
        lead={
          <p>
            Every organisation can buy technology. The difficult part is deciding what should be built, why it should be
            built and how it will continue supporting the business as it grows. That is where TSE fits.
          </p>
        }
      />

      <Section labelledBy="why-fit-title">
        <Split aside={<SectionHeading id="why-fit-title" eyebrow="Where we fit" title="Engineering, with the business consequence in view." />}>
          <p className={shared.largeCopy}>
            TSE exists to provide businesses with a technology partner that understands both the engineering and the
            business consequence of engineering decisions.
          </p>
          <CheckList
            items={[
              "Not a hardware reseller",
              "Not a break-fix provider",
              "Not a generic managed service",
              "An accountable technology engineering partner",
            ]}
            columns={2}
          />
        </Split>
      </Section>

      <Section tone="dark" labelledBy="beliefs-title">
        <SectionHeading id="beliefs-title" eyebrow="What we believe" title="Six beliefs behind every engagement." />
        <CardGrid columns={3} as="div">
          {beliefs.map((b, i) => (
            <PrincipleCard key={b.title} index={i + 1} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="warm" labelledBy="why-principles-title">
        <SectionHeading id="why-principles-title" eyebrow="Non-negotiables" title="Quality. Ownership. Ethics." />
        <CheckList items={principles.map((p) => `${p.title} — ${p.body}`)} columns={3} />
      </Section>

      <Section labelledBy="why-close-title" container="narrow">
        <h2 id="why-close-title" className="visually-hidden">
          Our commitment
        </h2>
        <p className={shared.statement} data-reveal>
          We are not trying to be the loudest technology company. We are building a company customers can trust to make
          responsible technology decisions, own the outcome and stay with them as the business evolves.
        </p>
      </Section>

      <CtaBand
        title="See how an engagement with TSE begins."
        body="It starts with understanding your business — not a product catalogue."
        cta={{ label: "Understand How TSE Works", href: "/how-we-work" }}
      />
    </>
  );
}
