import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: ReactNode;
  id?: string;
  eyebrow?: string;
  lead?: ReactNode;
  as?: "h1" | "h2";
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({ title, id, eyebrow, lead, as: Tag = "h2", align = "start", className }: SectionHeadingProps) {
  return (
    <header className={cx(styles.heading, styles[align], className)} data-reveal>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {lead && <div className={styles.lead}>{lead}</div>}
    </header>
  );
}
