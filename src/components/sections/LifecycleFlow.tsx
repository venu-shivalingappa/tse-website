import { cx } from "@/lib/cx";
import styles from "./LifecycleFlow.module.css";

interface LifecycleFlowProps {
  steps: readonly string[];
  label: string;
  className?: string;
}

/**
 * Lifecycle Flow (§21): Understand → Strategise → … → Scale.
 * Horizontal on desktop, collapses into a stacked flow on mobile (§20).
 */
export function LifecycleFlow({ steps, label, className }: LifecycleFlowProps) {
  return (
    <ol className={cx(styles.flow, className)} aria-label={label}>
      {steps.map((step, i) => (
        <li key={step} className={styles.step} style={{ ["--i" as string]: i }}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.number} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={styles.name}>{step}</span>
        </li>
      ))}
    </ol>
  );
}
