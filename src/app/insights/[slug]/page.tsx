import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCapability } from "@/content/capabilities";
import { formatDate, getInsight, insights } from "@/content/insights";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const insight = getInsight((await params).slug);
  if (!insight) return {};
  return pageMetadata({ title: insight.title, description: insight.summary, path: `/insights/${insight.slug}`, type: "article" });
}

export default async function InsightPage({ params }: Props) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();
  const related = insight.relatedCapabilities.map(getCapability).filter((c) => c !== undefined);

  return (
    <>
      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        crumbs={[
          { name: "Insights", href: "/insights" },
          { name: insight.title, href: `/insights/${insight.slug}` },
        ]}
        lead={
          <p>
            <time dateTime={insight.date}>{formatDate(insight.date)}</time> · {insight.readingMinutes} min read
          </p>
        }
      />
      <Section container="narrow" labelledBy="page-title">
        <article>
          <Prose>
            <p className={shared.statement}>{insight.summary}</p>
            {insight.body.map((block) =>
              block.type === "h2" ? <h2 key={block.text}>{block.text}</h2> : <p key={block.text}>{block.text}</p>,
            )}
          </Prose>
          <div className={shared.more}>
            <ul className={shared.links} aria-label="Related capabilities">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link href={`/what-we-build/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Section>
      <JsonLd data={articleSchema(insight)} />
      <CtaBand title="Where is your business going next?" body="Tell us what you are building. We will start there." />
    </>
  );
}
