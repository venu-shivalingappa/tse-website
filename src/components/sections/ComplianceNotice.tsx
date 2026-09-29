import { VerifyBadge } from "@/components/ui/VerifyBadge";
import styles from "./ComplianceNotice.module.css";

interface ComplianceNoticeProps {
  title: string;
  status: string;
  wording: string;
  disclaimer?: string;
  pending?: boolean;
}

/** Compliance Notice (§21): controlled wording, status label, legal disclaimer. */
export function ComplianceNotice({ title, status, wording, disclaimer, pending = false }: ComplianceNoticeProps) {
  return (
    <aside className={styles.notice} aria-label={title}>
      <div className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.status}>{status}</span>
        {pending && <VerifyBadge note="Legal review required before publication" />}
      </div>
      <p className={styles.wording}>{wording}</p>
      {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
    </aside>
  );
}
