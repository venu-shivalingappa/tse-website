import type { ReactNode } from "react";
import type { Crumb } from "@/lib/schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { NodeGraphic } from "./NodeGraphic";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  lead?: ReactNode;
  crumbs?: readonly Crumb[];
  children?: ReactNode;
}

/** Inner-page hero (component library §21 "Hero"): eyebrow, H1, supporting copy, CTAs. */
export function PageHero({ title, eyebrow, lead, crumbs, children }: PageHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="page-title" data-tone="dark">
      <NodeGraphic className={styles.graphic} />
      <Container>
        <div className={styles.content}>
          {crumbs && <Breadcrumbs items={crumbs} />}
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 id="page-title" className={styles.title}>
            {title}
          </h1>
          {lead && <div className={styles.lead}>{lead}</div>}
          {children && <div className={styles.actions}>{children}</div>}
        </div>
      </Container>
    </section>
  );
}
