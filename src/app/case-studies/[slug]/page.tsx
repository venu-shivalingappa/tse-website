import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCapability } from "@/content/capabilities";
import { getCaseStudy, publishedCaseStudies } from "@/content/case-studies";
import { showPendingClaims } from "@/lib/governance";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";
import styles from "./case-study.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies(showPendingClaims()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug, showPendingClaims());
  if (!study) return {};
  return pageMetadata({ title: study.title, description: study.summary, path: `/case-studies/${study.slug}` });
}

/** Mandatory case study structure (handoff §16). */
export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug, showPendingClaims());
  if (!study) notFound();

  const chapters = [
    { title: "Business context", body: study.context },
    { title: "Challenge", body: study.challenge },
    { title: "What we questioned", body: study.questioned },
    { title: "TSE approach", body: study.approach },
    { title: "Architecture / solution", body: study.architecture },
    { title: "Implementation", body: study.implementation },
    { title: "Business outcome", body: study.outcome },
    { title: "What it enabled", body: study.enabled },
  ];
  const related = study.relatedCapabilities.map(getCapability).filter((c) => c !== undefined);

  return (
    <>
      <PageHero
        eyebrow={study.sector}
        title={study.title}
        crumbs={[
          { name: "Case Studies", href: "/case-studies" },
          { name: study.title, href: `/case-studies/${study.slug}` },
        ]}
        lead={<p>{study.summary}</p>}
      >
        {study.approval === "pending" && <VerifyBadge note={study.verificationNote} />}
      </PageHero>

      <Section labelledBy="story-title">
        <h2 id="story-title" className="visually-hidden">
          The story
        </h2>
        <div className={styles.layout}>
          <ol className={styles.chapters}>
            {chapters.map((c, i) => (
              <li key={c.title} className={styles.chapter}>
                <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.chapterTitle}>{c.title}</h3>
                <p className={shared.largeCopy}>{c.body}</p>
              </li>
            ))}
          </ol>
          <aside className={styles.aside} aria-label="Case study summary">
            {study.metric && (
              <p className={styles.metric}>
                <span className={styles.metricValue}>{study.metric.value}</span>
                <span>{study.metric.label}</span>
              </p>
            )}
            <SectionHeading title="Related capabilities" as="h2" className={styles.relatedHeading} />
            <ul className={shared.links}>
              {related.map((c) => (
                <li key={c.slug}>
                  <Link href={`/what-we-build/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <CtaBand title="Facing a similar challenge?" body="Tell us about the business first. We will start there." />
    </>
  );
}
