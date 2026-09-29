import type { Metadata } from "next";
import { insightCategories, insights } from "@/content/insights";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { InsightCard } from "@/components/sections/InsightCard";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "TSE Insights on business and technology, architecture, infrastructure, cloud, cybersecurity, compliance and scaling technology.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="TSE Insights"
        title="Thinking on Business, Engineering and Technology Leadership."
        crumbs={[{ name: "Insights", href: "/insights" }]}
        lead={<p>Perspectives for the people responsible for building, growing, protecting and investing in a business.</p>}
      />
      <Section labelledBy="insights-title">
        <SectionHeading id="insights-title" eyebrow="Latest" title="Recent insights." />
        <ul className={shared.chips} aria-label="Topics">
          {insightCategories.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className={shared.more}>
          <CardGrid columns={3}>
            {insights.map((i) => (
              <li key={i.slug}>
                <InsightCard insight={i} />
              </li>
            ))}
          </CardGrid>
        </div>
      </Section>
      <CtaBand title="Have a question behind the article?" body="Tell us about the business first. We will start there." />
    </>
  );
}
