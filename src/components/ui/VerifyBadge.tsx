import styles from "./VerifyBadge.module.css";

interface VerifyBadgeProps {
  note?: string;
}

/** Shown only in preview builds on content still awaiting claim approval (handoff §25). */
export function VerifyBadge({ note }: VerifyBadgeProps) {
  return (
    <span className={styles.badge} title={note}>
      Pending verification
      {note && <span className="visually-hidden">: {note}</span>}
    </span>
  );
}
