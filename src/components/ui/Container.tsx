import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  size?: "default" | "narrow";
  className?: string;
}

export function Container({ children, size = "default", className }: ContainerProps) {
  return <div className={cx(styles.container, styles[size], className)}>{children}</div>;
}
