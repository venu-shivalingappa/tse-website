import styles from "./ProcessSteps.module.css";

interface ProcessStepsProps {
  steps: readonly { title: string; body: string }[];
}

/** How We Work methodology — numbered steps with meaning (handoff §13). */
export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className={styles.steps}>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.step} data-reveal>
          <span className={styles.number} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.body}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
