import Link from "next/link";
import { cx } from "@/lib/cx";
import type { CaseStudy } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { VerifyBadge } from "@/components/ui/VerifyBadge";
import card from "./Card.module.css";
import styles from "./CaseStudyCard.module.css";

interface CaseStudyCardProps {
  study: CaseStudy;
}

/** Case Study Card (§21): context, outcome headline, one metric if verified. */
export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const pending = study.approval === "pending";
  return (
    <article className={cx(card.card, card.interactive, styles.card)}>
      <div className={styles.meta}>
        <p className={card.label}>{study.sector}</p>
        {pending && <VerifyBadge note={study.verificationNote} />}
      </div>
      <h3 className={card.title}>{study.title}</h3>
      <p className={card.body}>{study.summary}</p>
      {study.metric && (
        <p className={styles.metric}>
          <span className={styles.metricValue}>{study.metric.value}</span>
          <span className={styles.metricLabel}>{study.metric.label}</span>
        </p>
      )}
      <Link href={`/case-studies/${study.slug}`} className={cx(card.more, card.stretched)} data-track={`case-study-${study.slug}`}>
        Read the case study<span className="visually-hidden">: {study.title}</span>
        <Icon name="arrowRight" size={18} />
      </Link>
    </article>
  );
}
