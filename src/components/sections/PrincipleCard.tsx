import styles from "./PrincipleCard.module.css";

export interface PrincipleCardProps {
  index: number;
  title: string;
  body: string;
}

/** Principle Card (§21): Quality / Ownership / Ethics. */
export function PrincipleCard({ index, title, body }: PrincipleCardProps) {
  return (
    <article className={styles.card} data-reveal>
      <span className={styles.index}>{String(index).padStart(2, "0")}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </article>
  );
}
