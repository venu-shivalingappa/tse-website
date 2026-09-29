import { VerifyBadge } from "@/components/ui/VerifyBadge";
import type { TrustMetric } from "@/content/types";
import styles from "./MetricCard.module.css";

/** Metric Card (§21): evidence-backed number and short explanation. */
export function MetricCard({ metric }: { metric: TrustMetric }) {
  return (
    <div className={styles.metric}>
      <dt className={styles.label}>{metric.label}</dt>
      <dd className={styles.value}>{metric.value}</dd>
      {metric.approval === "pending" && (
        <dd>
          <VerifyBadge note={`Evidence owner: ${metric.evidenceOwner}`} />
        </dd>
      )}
    </div>
  );
}
