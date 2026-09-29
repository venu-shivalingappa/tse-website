import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NodeGraphic } from "./NodeGraphic";
import styles from "./CtaBand.module.css";

interface CtaBandProps {
  title: string;
  body?: string;
  cta?: { label: string; href: string };
  id?: string;
}

/** CTA Band (§21): business-first question and a conversational CTA — never "Request Quote". */
export function CtaBand({ title, body, cta = site.conversationCta, id = "cta-band-title" }: CtaBandProps) {
  return (
    <section className={styles.band} aria-labelledby={id} data-tone="dark">
      <NodeGraphic className={styles.graphic} />
      <Container>
        <div className={styles.content} data-reveal>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
          {body && <p className={styles.body}>{body}</p>}
          <Button href={cta.href} variant="hero" size="lg" withArrow trackLabel={`cta-band-${cta.label}`}>
            {cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
