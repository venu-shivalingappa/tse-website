import styles from "./StatementBlock.module.css";

interface StatementBlockProps {
  first: string;
  second: string;
}

/** Memorable visual statement — BUSINESS FIRST → TECHNOLOGY SECOND (handoff §7.3). */
export function StatementBlock({ first, second }: StatementBlockProps) {
  return (
    <p className={styles.statement} data-reveal>
      <span className={styles.first}>{first}</span>
      <span className={styles.arrow} aria-hidden="true" />
      <span className="visually-hidden">, then </span>
      <span className={styles.second}>{second}</span>
    </p>
  );
}
