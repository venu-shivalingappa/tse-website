import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Container } from "./Container";
import styles from "./Section.module.css";

export type SectionTone = "light" | "warm" | "dark";

interface SectionProps {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  tone?: SectionTone;
  spacing?: "default" | "tight";
  container?: "default" | "narrow";
  className?: string;
}

export function Section({
  children,
  id,
  labelledBy,
  tone = "light",
  spacing = "default",
  container = "default",
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(styles.section, styles[tone], styles[spacing], className)}
      data-tone={tone}
    >
      <Container size={container}>{children}</Container>
    </section>
  );
}
