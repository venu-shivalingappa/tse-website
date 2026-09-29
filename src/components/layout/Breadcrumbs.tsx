import Link from "next/link";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "./Breadcrumbs.module.css";

interface BreadcrumbsProps {
  items: readonly Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={styles.nav}>
        <ol className={styles.list}>
          {trail.map((crumb, i) => {
            const current = i === trail.length - 1;
            return (
              <li key={crumb.href} className={styles.item}>
                {current ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className={styles.link}>
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
