import { cx } from "@/lib/cx";
import styles from "./NodeGraphic.module.css";

/**
 * Decorative architectural line graphic derived from the TSE mark's 3×3 node grid —
 * "engineering diagrams, architectural lines" (handoff §19). Purely presentational.
 */
export function NodeGraphic({ className }: { className?: string }) {
  const nodes = [0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => ({ cx: 60 + col * 120, cy: 60 + row * 120, key: `${row}-${col}` })));
  return (
    <svg className={cx(styles.graphic, className)} viewBox="0 0 360 360" fill="none" aria-hidden="true" focusable="false">
      <path d="M60 180 L180 60 M300 60 V300 M60 180 V300" className={styles.link} />
      {nodes.map((n) => (
        <circle key={n.key} cx={n.cx} cy={n.cy} r="44" className={styles.node} />
      ))}
    </svg>
  );
}
