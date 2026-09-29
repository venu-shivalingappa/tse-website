import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./CardGrid.module.css";

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  as?: "ul" | "div";
  className?: string;
}

/** Responsive card grid: single column on phones, 2-up on tablets, `columns` on desktop. */
export function CardGrid({ children, columns = 3, as: Tag = "ul", className }: CardGridProps) {
  return <Tag className={cx(styles.grid, styles[`cols${columns}`], className)}>{children}</Tag>;
}
