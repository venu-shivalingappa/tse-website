import Link from "next/link";
import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/Icon";
import card from "./Card.module.css";

export interface CapabilityCardProps {
  title: string;
  outcome: string;
  href: string;
  index?: number;
}

/** Capability Card (§21): business-oriented title, 1–2 line outcome, link. */
export function CapabilityCard({ title, outcome, href, index }: CapabilityCardProps) {
  return (
    <article className={cx(card.card, card.interactive)}>
      {index !== undefined && <span className={card.index}>{String(index).padStart(2, "0")}</span>}
      <h3 className={card.title}>{title}</h3>
      <p className={card.body}>{outcome}</p>
      <Link href={href} className={cx(card.more, card.stretched)}>
        Explore<span className="visually-hidden"> {title}</span>
        <Icon name="arrowRight" size={18} />
      </Link>
    </article>
  );
}
