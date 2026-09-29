import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Split.module.css";

interface SplitProps {
  aside: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Two-column split on the 12-col grid (5 / 7); stacks on mobile. */
export function Split({ aside, children, className }: SplitProps) {
  return (
    <div className={cx(styles.split, className)}>
      <div className={styles.aside}>{aside}</div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
