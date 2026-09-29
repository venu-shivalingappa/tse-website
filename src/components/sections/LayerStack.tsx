import styles from "./LayerStack.module.css";

interface Layer {
  name: string;
  summary: string;
  items: readonly string[];
}

/**
 * The four What We Build layers presented as one integrated architecture
 * (handoff §11 [UX]) — stacked strata joined by a single spine, not four lists.
 */
export function LayerStack({ layers }: { layers: readonly Layer[] }) {
  return (
    <ol className={styles.stack} aria-label="Technology foundation layers">
      {layers.map((layer, i) => (
        <li key={layer.name} className={styles.layer} data-reveal>
          <div className={styles.head}>
            <span className={styles.index}>Layer {i + 1}</span>
            <h3 className={styles.name}>{layer.name}</h3>
            <p className={styles.summary}>{layer.summary}</p>
          </div>
          <ul className={styles.items}>
            {layer.items.map((item) => (
              <li key={item} className={styles.chip}>
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
