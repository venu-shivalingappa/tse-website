import Link from "next/link";
import { cx } from "@/lib/cx";
import { formatDate } from "@/content/insights";
import type { Insight } from "@/content/types";
import card from "./Card.module.css";
import styles from "./InsightCard.module.css";

/** Insight Card (§21): category, title, date / reading time. */
export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className={cx(card.card, card.interactive)}>
      <p className={card.label}>{insight.category}</p>
      <h3 className={card.title}>
        <Link href={`/insights/${insight.slug}`} className={card.stretched}>
          {insight.title}
        </Link>
      </h3>
      <p className={card.body}>{insight.summary}</p>
      <p className={styles.meta}>
        <time dateTime={insight.date}>{formatDate(insight.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{insight.readingMinutes} min read</span>
      </p>
    </article>
  );
}
