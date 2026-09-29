import type { TrustMetric } from "@/content/types";
import { MetricCard } from "./MetricCard";
import styles from "./MetricsBar.module.css";

/** Credibility bar (handoff §9.3). Receives already-governed metrics. */
export function MetricsBar({ metrics, label = "TSE at a glance" }: { metrics: readonly TrustMetric[]; label?: string }) {
  if (metrics.length === 0) return null;
  return (
    <dl className={styles.bar} aria-label={label}>
      {metrics.map((m) => (
        <MetricCard key={m.label} metric={m} />
      ))}
    </dl>
  );
}
