import Link from "next/link";
import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/Icon";
import card from "./Card.module.css";
import styles from "./BusinessStateCard.module.css";

export interface BusinessStateCardProps {
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}

/** Business State Card (§21): entry point by business stage. */
export function BusinessStateCard({ label, title, body, href, cta }: BusinessStateCardProps) {
  return (
    <article className={cx(card.card, card.interactive, styles.card)}>
      <p className={card.label}>{label}</p>
      <h3 className={cx(card.title, styles.title)}>{title}</h3>
      <p className={card.body}>{body}</p>
      <Link href={href} className={cx(card.more, card.stretched)} data-track={`entry-${label}`}>
        {cta}
        <Icon name="arrowRight" size={18} />
      </Link>
    </article>
  );
}
