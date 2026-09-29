import { cx } from "@/lib/cx";
import { Icon } from "./Icon";
import styles from "./CheckList.module.css";

interface CheckListProps {
  items: readonly string[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export function CheckList({ items, columns = 1, className }: CheckListProps) {
  return (
    <ul className={cx(styles.list, styles[`cols${columns}`], className)}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <Icon name="check" size={20} className={styles.icon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
